'use static';

import Vue from 'vue';
import Vuex from 'vuex';

import {STATUS, fetchJobs} from './utils.js'

Vue.use(Vuex).use(Vuex);

function updateStatisticsForJob(state, {name, jobs}) {
  state.statistics[name] = {};
  for (let key of state.status) {
    state.statistics[name][key] = {
      total: 0,
      percent: 0,
    };
  }
  for (let job of jobs.slice(0, state.limit)) {
    let key = job.result || 'RUNNING';
    state.statistics[name][key].total++;
    state.statistics[name][key].percent =
      state.statistics[name][key].total / jobs.length;
  }
};

export default new Vuex.Store({
  state: {
    jobs: {},
    statistics: {},
    status: STATUS,
    limit: 100,
  },
  mutations: {
    updateJobs: function(state, { jobs, matrix }) {
      state.jobs = {
        'node-test-commit': jobs,
      };
      state.statistics = {};
      updateStatisticsForJob(state, {name: 'node-test-commit', jobs});
      for (let jobName in matrix) {
        state.jobs[jobName] = matrix[jobName];
        updateStatisticsForJob(state, {name: jobName, jobs: matrix[jobName]});
      }
    },
  },
  actions: {
    updateJobs: async function({ commit }) {
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

      commit('updateJobs', { jobs, matrix });
    }
  }
});
