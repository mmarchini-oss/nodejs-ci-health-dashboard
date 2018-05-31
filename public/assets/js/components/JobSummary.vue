<template>
  <div>
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="title is-3">
          Statistics for the last last {{ this.limit }} Jobs
        </h2>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <div class="statistics has-text-center">
          <table class="is-inline-block">
            <thead>
              <tr class="subtitle title is-4">
                <th class="has-text-right">
                  Pipeline
                </th>
                <th v-for="key in status" v-bind:class="key | statusTextColor">
                  {{ key }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(jobStatus, jobName) in statistics">
                <td class="subtitle title is-5 has-text-right">
                  {{ jobName }}
                </td>
                <td v-for="(stats, key) in jobStatus" class="subtitle title is-5"
                    v-bind:class="key | statusTextColor">
                  <b> {{ stats.total }} </b>({{ stats.percent | toPercent }}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { STATUS } from '../utils.js';
  import store from '../store.js';

  export default {
    data: () => {
      return {
        status: STATUS
      };
    },
    computed: {
      statistics() {
        return store.state.statistics;
      },
      limit() {
        return store.state.limit;
      },
    }
  }
</script>
