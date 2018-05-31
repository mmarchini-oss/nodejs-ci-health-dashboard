'use strict';

import Vue from 'vue';

import { STATUS, API_URL, STATUS_COLORS } from './utils.js';

Vue.filter('toPercent', function toPercent(value) {
  if (!value) return 0;

  return Math.ceil(value * 100);
});

Vue.filter('statusBackgroundColor', function statusBackgroundColor(status) {
  return 'has-background-' + STATUS_COLORS[status || 'RUNNING'];
});

Vue.filter('statusTextColor', function statusTextColor(status) {
  return 'has-text-' + STATUS_COLORS[status || 'RUNNING'];
});

Vue.filter('jobSummary', function jobSummary(job) {
  const date = new Date(job.timestamp);
  return `#${job.number} - ${date.toLocaleString()} - ${job.result}`;
});
