# Homework Gelato

0. You need to have at least `node 15.11`. 
1. Clone repository `git@github.com:dz1dz1on/gelator-homework.git`
2. After clonning repository you need to run inside a project: `npm install` to install all needed dependencies.
3. To run test on local machine you need to be in the project directory and use:
   `npm run test`

Due to only one avalaiable user tests are running one after another - parallel testing is off.

# Descriptive task

- `task-user-1-script.ts` is a script for for the generating users for the descriptive task.
- To run this script type: `ts-node task-user-1-script.ts` in the console in the project.


# API tests

- Requests are sent via Axios and as a test runner is used Playwright thats why we can use them in the same catalogu with the E2E tests and the setup functions are the same.
- [site](https://clockify.me/developers-api) used for API integration tests

# E2E tests

1. E2E tests are working on open for testing [site](https://opensource-demo.orangehrmlive.com/) and it may happen a situation where logging can be blocked because someone did too many requests.
Situation happened once and I did mentioned it on their [github](https://github.com/orangehrm/orangehrm/issues/441).
2. One of the tests E2E tests is failing **intentionally** - future date of the birth can be passed to the user profile and saved.<br/> This is allowed on this site somehow.

# CI/CD

- Right now we have two workflows for the tests. I wanted to check how big is time difference between dockerfile and plain run on github actions.

# Things that should be improved:

- create proper workflow for CI/CD with published image on some docker hub and pulling it via docker actions on github + adding tests to the docker file instead of baking them directly in image. 
- artifacts from the dockerfile should be attached after run - probably best way would be to send them to the S3 and then add the link to the logs for downloading them.
- test should be faster - probably we should switch for running them in the cloud provider like aws or gcr.
- all tokens, credentails should be stored as a env instead of visible values in the code. Need to use dotenv + github enviroments secrets.
- add chcecks (jobs in github actions) for code syntax and static analyze for every commit: eslint, hadolint(for docker) etc.
- additionally we may implement some visual regreesion for checking the changes in E2E



