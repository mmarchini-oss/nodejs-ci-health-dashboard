'use strict';

const fetch = require('node-fetch');
const constants = require('./constants');

class Jenkins {
  constructor() {
    this.commitJobs = [];
    this.machinesMatrix = {};
    this.periodicallyFetchJobs(2 * constants.MINUTE);
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
      if (build.subBuilds.length == 0) continue;

      // Jenkins reports `null` result for job that have not yet resolved ;)
      if (build.result === null) build.result = 'RUNNING';

      const { timestamp } = build;
      const subJobs = [];
      for (let machine of build.subBuilds) {
        // Jenkins reports `null` result for job that have not yet resolved ;)
        if (machine.result === null) machine.result = 'RUNNING';

        const machineJobs = machinesMatrix[machine.jobName] || [];
        const { buildNumber, result, url } = machine;
        const machineJob = {
          timestamp,
          number: buildNumber,
          result,
          jobName: machine.jobName,
          url: `https://ci.nodejs.org/${url}`,
        };
        machineJobs.push(machineJob);
        subJobs.push(machineJob);
        machinesMatrix[machine.jobName] = machineJobs;
      }
      {
        const { number, result, url, jobName } = build;

        jobs.push({
          timestamp,
          number,
          result,
          url,
          subJobs,
          jobName,
        });
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
