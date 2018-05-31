<template>
  <div>
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="title is-3">
          Last {{ this.limit }} Jobs
        </h2>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <div v-for="(jobList, jobName) in jobs"
            class="jobs-progress-container">

          <div class="job-progress-header">
            <h3 class="subtitle is-3">{{ jobName }}</h3>
          </div>

          <div class="jobs-progress-bar">
            <div class="dropdown is-hoverable" v-for="job of jobList.slice(0, 100)">
              <div class="dropdown-toggle">
                <a class="job-progress-bar" aria-haspopup="true"
                  v-bind:class="job.result |statusBackgroundColor"
                  v-bind:href="job.url" target="_blank"
                  aria-controls="dropdown-menu">
                </a>
              </div>
              <div class="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <strong>#{{job.number}}</strong>
                    <b v-bind:class="job.result | statusTextColor">{{ job.result }}</b>
                    <small>{{ job.timestamp | dateToLocaleString}}</small>
                  </div>
                  <div v-if="jobName === 'node-test-commit'" class="dropdown-divider">
                  </div>
                  <div class="dropdown-item" v-for="subJob of job.subJobs"
                       v-if="jobName === 'node-test-commit' && subJob.result == 'FAILURE'">
                    <a v-bind:href="subJob.url" target="blank_">{{subJob.jobName}}</a>
                    <b class="is-block" v-bind:class="subJob.result | statusTextColor">{{ subJob.result }}</b>
                  </div>
                  <div v-if="jobName === 'node-test-commit' && job.result == 'RUNNING'" class="dropdown-item">
                    <span class="icon is-large" v-bind:class="'RUNNING' | statusTextColor">
                      <i class="fas fa-sync fa-spin fa-2x"></i>
                    </span>
                  </div>
                </div>
              </div>
          </div>
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
  import store from '../store.js';

  export default {
    computed: {
      jobs() {
        return store.state.jobs;
      },
      limit() {
        return store.state.limit;
      },
    }
  }
</script>
