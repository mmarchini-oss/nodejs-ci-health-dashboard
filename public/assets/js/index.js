'use strict';
// https://github.com/vuejs/vue/pull/7110
// import {Vue} from 'https://cdn.jsdelivr.net/npm/vue';

const API_URL="/api/jobs";

const STATUS_COLORS = {
  SUCCESS: 'success',
  UNSTABLE: 'warning',
  FAILURE: 'danger',
  ABORTED: 'grey-light',
  RUNNING: 'info'
}

Vue.filter('toPercent', function (value) {
  if (!value) return 0;

  return Math.ceil(value * 100)
})

const vueApp = new Vue({
  el: '#vueApp',
  data: {
    jobs: [],
    statistics: {
      RUNNING: {
        total: 0,
        percent: 0,
      },
      SUCCESS: {
        total: 0,
        percent: 0,
      },
      UNSTABLE: {
        total: 0,
        percent: 0,
      },
      FAILURE: {
        total: 0,
        percent: 0,
      },
      ABORTED: {
        total: 0,
        percent: 0,
      },
    }
  },
  methods: {
    updateJobs: function(jobs) {
      this.jobs = jobs;
      for (let key in this.statistics) {
        this.statistics[key].total = 0;
        this.statistics[key].percent = 0;
      }
      for (let job of jobs) {
        let key = job.result || "RUNNING";
        this.statistics[key].total++;
        this.statistics[key].percent = this.statistics[key].total / this.jobs.length;
      }
    },
    statusBackgroundColor(status) {
      return "has-background-" + STATUS_COLORS[status || "RUNNING"];
    },
    statusTextColor(status) {
      return "has-text-" + STATUS_COLORS[status || "RUNNING"];
    },
    jobSummary(job) {
      const date = new Date(job.timestamp);
      return `#${job.id} - ${date.toLocaleString()} - ${job.result}`;
    }
  }
});

async function fetchJobs() {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  if (!jsonResponse) {
    return [];
  }
  return jsonResponse['jobs'];
}

async function updateVue() {
  let jobs = [];
  try {
    jobs = await fetchJobs();
  } catch (e) {
    console.error("Error while fetching jobs:");
    console.error(e);
    return;
  }

  if (!jobs) {
    console.error("Couldn't update Vue values");
    return;
  }

  vueApp.updateJobs(jobs);
}

updateVue();
