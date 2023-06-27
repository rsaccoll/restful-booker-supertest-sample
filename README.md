# Restful-booker-supertest-sample

Integration Tests using mocha, chai and supertest for test httpbin site [https://restful-booker.herokuapp.com/apidoc/index.html]

## Set up

You'll need:

- Node (15 or higher);

Install Dependencies:

```bash
npm install
```

There is an `.env.sample` file that must be renamed to `.env` and inform the url that will be used for the test. In the case of [https://restful-booker.herokuapp.com]

## Run Test

```bash
npm test
```


## Report
I'm using the report mochawesome, so after running, analyze the `mochawesome-report` folder to verify the report