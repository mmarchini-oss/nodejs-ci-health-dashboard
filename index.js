'use strict';

const express = require('express');
const { Jenkins } = require('./src/jenkins');

const env = process.env.NODE_ENV || 'development';
const app = express();

const jenkins = new Jenkins();

if (env == 'development') app.use('/', express.static('public'));

function handleApi(req, res) {
  res.send({ jobs: jenkins.commitJobs, matrix: jenkins.machinesMatrix });
}

app.get('/api/jobs', handleApi);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
