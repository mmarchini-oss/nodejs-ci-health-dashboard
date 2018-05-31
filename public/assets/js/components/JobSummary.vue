<template>
  <section class="section">
    <div class="container has-text-centered">
      <div class="statistics has-text-center">
        <table class="is-inline-block">
          <thead>
            <tr class="subtitle title is-4">
              <th class="has-text-right">
                Pipeline
              </th>
              <th v-for="key in status" v-bind:class="key | statusTextColor" :key="key">
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(jobStatus, jobName) in statistics" :key="jobName">
              <td class="subtitle title is-5 has-text-right">
                {{ jobName }}
              </td>
              <td v-for="(stats, key) in jobStatus" :key="key"
                 class="subtitle title is-5" v-bind:class="key | statusTextColor">
                <b> {{ stats.total }} </b>({{ stats.percent | toPercent }}%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  import { STATUS } from '../utils.js';

  export default {
    props: ['statistics'],
    data: () => {
      return {
        status: STATUS
      };
    }
  }
</script>
