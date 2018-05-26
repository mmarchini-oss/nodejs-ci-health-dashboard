'use strict';
// https://github.com/vuejs/vue/pull/7110
// import {Vue} from 'https://cdn.jsdelivr.net/npm/vue';

const API_URL = '/api/jobs';

const STATUS_COLORS = {
  SUCCESS: 'success',
  UNSTABLE: 'warning',
  FAILURE: 'danger',
  ABORTED: 'grey-light',
  RUNNING: 'info',
};

Vue.filter('toPercent', function(value) {
  if (!value) return 0;

  return Math.ceil(value * 100);
});

const STATUS = ['RUNNING', 'SUCCESS', 'UNSTABLE', 'ABORTED', 'FAILURE'];

const vueApp = new Vue({
  el: '#vueApp',
  data: {
    jobs: {},
    statistics: {},
    status: STATUS,
    limit: 100,
  },
  methods: {
    updateStatisticsForJob(jobName, jobList) {
      this.statistics[jobName] = {};
      for (let key of this.status) {
        this.statistics[jobName][key] = {
          total: 0,
          percent: 0,
        };
      }
      for (let job of jobList.slice(0, this.limit)) {
        let key = job.result || 'RUNNING';
        this.statistics[jobName][key].total++;
        this.statistics[jobName][key].percent =
          this.statistics[jobName][key].total / jobList.length;
      }
    },
    updateJobs: function(jobs, matrix) {
      this.jobs = {
        'node-test-commit': jobs,
      };
      this.statistics = {};
      this.updateStatisticsForJob('node-test-commit', jobs);
      for (let jobName in matrix) {
        this.jobs[jobName] = matrix[jobName];
        this.updateStatisticsForJob(jobName, matrix[jobName]);
      }
    },
    statusBackgroundColor(status) {
      return 'has-background-' + STATUS_COLORS[status || 'RUNNING'];
    },
    statusTextColor(status) {
      return 'has-text-' + STATUS_COLORS[status || 'RUNNING'];
    },
    jobSummary(job) {
      const date = new Date(job.timestamp);
      return `#${job.number} - ${date.toLocaleString()} - ${job.result}`;
    },
  },
});

async function fetchJobs() {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  if (!jsonResponse) {
    return [];
  }
  return jsonResponse;
}

async function updateVue() {
  let result = {};
  try {
    result = await fetchJobs();
  } catch (e) {
    console.error('Error while fetching jobs:');
    console.error(e);
    return;
  }
  const { jobs, matrix } = result;

  if (!jobs) {
    console.error("Couldn't update Vue values");
    return;
  }

  vueApp.updateJobs(jobs, matrix);
}

updateVue();
