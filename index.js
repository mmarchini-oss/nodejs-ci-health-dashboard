'use strict';

const express = require('express');
const fetch = require('node-fetch');
const env = process.env.NODE_ENV || 'development';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

const CI_DOMAIN="ci.nodejs.org";
const JOB_PATH="job/node-test-pull-request";
const TREE="allBuilds[timestamp,id,result,url]{0,100}";

const API_URL=`https://${CI_DOMAIN}/${JOB_PATH}/api/json?tree=${TREE}`;

const app = express();

if (env == 'development')
  app.use('/', express.static('public'));

let globalJobs = [];

async function fetchJobs() {
  console.info("Fetching jobs from Jenkins");
  let response = {};
  response = await fetch(API_URL);


  let allBuilds = (await response.json())['allBuilds'];

  if (!allBuilds) {
    throw(new Error("No builds found"));
  }

  const jobs = [];
  for (let build of allBuilds) {
    const { timestamp, id, result, url } = build;

    jobs.push({
      timestamp, id, result, url
    });
  }
  console.info(`${jobs.length} jobs fetched from Jenkins`);
  globalJobs = jobs;
}

async function periodicallyFetchJobs(interval) {
  try {
    await fetchJobs();
  } catch (e) {
    console.error("Error while trying to fetch jobs from Jenkins:");
    console.error(e);
  }
    setTimeout(() => periodicallyFetchJobs(interval), interval);
}

periodicallyFetchJobs(5 * MINUTE);

function handleApi(req, res) {
  res.send({"jobs": globalJobs});
}

app.get('/api/jobs', handleApi);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
