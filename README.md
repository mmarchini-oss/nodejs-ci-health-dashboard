# Node.js CI Health Dashboard

A dashboard showing statistics on the last 100 jobs ran on 
[Node.js CI](https://ci.nodejs.org/).

## Dependencies

You must have Docker installed.

## Usage

To use this project, run:

```bash
git clone https://github.com/mmarchini/nodejs-ci-health-dashboard
cd nodejs-ci-health-dashboard/
docker build --tag nodejs-ci-health-dashboard .
docker run --env JENKINS_USER=<user> --env JENKINS_TOKEN=<token> -p 3000:3000 \
    nodejs-ci-health-dashboard:latest
```

Where:

  - `<user>` will likely be your GitHub user name.
  - `<token>` is a Jenkins token generated from Jenkins interface

### Jenkins Credentials

To generate a token for your user on Jenkins, follow these steps:

  1. Go to https://ci.nodejs.org/
  1. Click in your name on the top right corner
  1. Access the menu Configure
  1. Click the `Add New Token` button
  1. Type a name for the token
  1. Click `Generate`
  1. Copy the token. **it will not be displayed again once you leave this
     page**

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

* (a) The contribution was created in whole or in part by me and I
  have the right to submit it under the open source license
  indicated in the file; or

* (b) The contribution is based upon previous work that, to the best
  of my knowledge, is covered under an appropriate open source
  license and I have the right under that license to submit that
  work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am
  permitted to submit under a different license), as indicated
  in the file; or

* (c) The contribution was provided directly to me by some other
  person who certified (a), (b) or (c) and I have not modified
  it.

* (d) I understand and agree that this project and the contribution
  are public and that a record of the contribution (including all
  personal information I submit with it, including my sign-off) is
  maintained indefinitely and may be redistributed consistent with
  this project or the open source license(s) involved.
