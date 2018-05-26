'use strict';

const SECOND = 1000;

const COMMON_BUILD_FIELDS = 'jobName,result,url';
const BUILD_FIELDS = `number,timestamp,${COMMON_BUILD_FIELDS}`;
const SUB_BUILD_FIELDS = `buildNumber,${COMMON_BUILD_FIELDS}`;
const ACTION_TREE = 'actions[parameters[name,value]]';
const CHANGE_FIELDS =
  'commitId,author[absoluteUrl,fullName],authorEmail,' + 'msg,date';
const CHANGE_TREE = `changeSet[items[${CHANGE_FIELDS}]]`;

const CI_DOMAIN = 'ci.nodejs.org';
const PR_JOB_PATH = 'job/node-test-pull-request';
const COMMIT_JOB_PATH = 'job/node-test-commit';

const COMMIT_TREE = `allBuilds[${BUILD_FIELDS},${ACTION_TREE},${CHANGE_TREE},subBuilds[${SUB_BUILD_FIELDS}]]`;
console.log(
  `https://${CI_DOMAIN}/${COMMIT_JOB_PATH}/api/json?tree=${COMMIT_TREE}{0,100}`,
);
module.exports = {
  SECOND: 1000,
  MINUTE: 60 * SECOND,

  API_URL: `https://${CI_DOMAIN}/${COMMIT_JOB_PATH}/api/json?tree=${COMMIT_TREE}{0,100}`,
};
