<template>
  <div>
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="title is-3">Last {{ this.limit }} Jobs</h2>
      </div>
    </section>

    <job-summary v-if="statistics" :statistics="statistics"></job-summary>

    <section class="section">
      <div class="container has-text-centered">
        <div v-for="(jobList, jobName) in jobs" :key=jobName class="jobs-progress-container">

          <div class="job-progress-header">
            <h3 class="subtitle is-3">{{ jobName }}</h3>
          </div>

          <div class="jobs-progress-bar">
            <a v-for="job of jobList.slice(0, 100)"
              :key="job.number"
              v-bind:class="job.result | statusBackgroundColor" v-bind:href="job.url"
              v-bind:data-tooltip="job | jobSummary" class="job-progress-bar tooltip"
              target="blank_">
            </a>
          </div>

          <div class="job-progress-footer">
            <span class="is-pulled-left">Newest</span>
            <span class="is-pulled-right">Oldest</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { STATUS, API_URL, STATUS_COLORS } from '../utils.js';
  import JobSummary from './JobSummary.vue';

  const data = {
    jobs: {},
    statistics: {},
    status: STATUS,
    limit: 100,
  };

  async function fetchJobs() {
    const response = await fetch(API_URL);
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      return [];
    }
    return jsonResponse;
  }

  export default {
    data: data,
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
    },
    created: async function() {
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

      this.updateJobs(jobs, matrix);
    },
    components: {
      JobSummary
    }
  };
</script>
