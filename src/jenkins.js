'use strict';

const fetch = require('node-fetch');
const constants = require('./constants');

class Jenkins {
  constructor() {
    this.commitJobs = [];
    this.machinesMatrix = {};
    this.periodicallyFetchJobs(5 * constants.MINUTE);
  }

  async fetchJobs() {
    console.info('Fetching jobs from Jenkins');
    let response = {};
    response = await fetch(constants.API_URL);

    let allBuilds = (await response.json())['allBuilds'];

    if (!allBuilds) {
      throw new Error('No builds found');
    }

    const jobs = [];
    const machinesMatrix = {};
    for (let build of allBuilds) {
      const { timestamp } = build;
      {
        // Jenkins reports `null` result for job that have not yet resolved ;)
        if (build.result === null) build.result = 'RUNNING';
        
        const { number, result, url } = build;

        jobs.push({
          timestamp,
          number,
          result,
          url,
        });
      }
      for (let machine of build.subBuilds) {
        const machineJobs = machinesMatrix[machine.jobName] || [];
        const { buildNumber, result, url } = machine;
        machineJobs.push({
          timestamp,
          number: buildNumber,
          result,
          url: `https://ci.nodejs.org/${url}`,
        });
        machinesMatrix[machine.jobName] = machineJobs;
      }
    }
    console.info(`${jobs.length} jobs fetched from Jenkins`);
    this.machinesMatrix = machinesMatrix;
    this.commitJobs = jobs;
  }

  async periodicallyFetchJobs(interval) {
    try {
      await this.fetchJobs();
    } catch (e) {
      console.error('Error while trying to fetch jobs from Jenkins:');
      console.error(e);
    }
    setTimeout(() => this.periodicallyFetchJobs(interval), interval);
  }
}

module.exports = {
  Jenkins: Jenkins,
};
