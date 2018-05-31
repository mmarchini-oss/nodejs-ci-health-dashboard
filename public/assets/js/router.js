import Vue from 'vue';
import Router from 'vue-router';

import JobSummary from './components/JobSummary.vue';
import DetailedJobs from './components/DetailedJobs.vue';

Vue.use(Router);

const routes = [
  { name: 'job-summary', path: '/job-summary', component: JobSummary },
  { name: 'detailed-jobs', path: '/detailed-jobs', component: DetailedJobs },
  { path: '*', redirect: '/job-summary' },
];

export default new Router({
  routes: routes
});
