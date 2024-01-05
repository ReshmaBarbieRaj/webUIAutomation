# Web UI Automation using Playwright with Typescript

<img height="24" width="24" src="https://playwright.dev/img/playwright-logo.svg" />   Frameworks: Playwright

<img height="24" width="24" src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png" />   Language: TypeScript  


# About the Project

- This project aims to automate test scenarios for the [nopCommerce demo store](https://demo.nopcommerce.com/) Demo website
website using TypeScript along with Playwright test automation framework.

- The automation tests follows the Page Object Model (POM) and Data-Driven Test
(DDT) for the better code readability and maintainability.

- The project is integrated with Jenkins for continuous integration.
  
- This automation suite incorporates the  page object model and data-driven testing.


## Getting Started

### Prerequisites

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
  
### Installation

1. Clone the repo using below URL

```sh
https://github.com/ReshmaBarbieRaj/webUIAutomation.git
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```
3. For first time installation run below command to download required browsers

```sh
npx playwright install
```

# Running the tests

Test Cases are present in "test-suites" folder

1. For execution end-to-end tests:

```JS
npx playwright test
```

2. For execution of tests in specific browser:

```JS
npx playwright test --project = chromium
```

3. For execution of specific test file:

```JS
npx playwright test test folder/example.spec.ts
```

4. For execution of test in headed mode:

```JS
npx playwright test --headed
```

## Reports

To open last report:

```JS
npx playwright show-report
```

If there would be any test failures, test run artifacts (videos and screenshots) can be found in the test-results catalog. Also, after running the test, an HTML test report is generated which will look like this:


![image](https://github.com/ReshmaBarbieRaj/webUIAutomation/assets/85567781/b8be8b0c-a48e-442c-8906-88787471e9a8)


## Continous Integration

The automation suite is triggered on each push or pull request to the repository, please find the screenshot of build log below :

![image](https://github.com/ReshmaBarbieRaj/webUIAutomation/assets/85567781/c20aee18-67ba-488c-84d0-5903340467f1)

##


The project is integrated Jenkins hosted in localhost:8080, please find the screenshot of build log below :

![image](https://github.com/ReshmaBarbieRaj/Bowling-Game/assets/85567781/081a7a04-3d6c-4878-ba50-f2996b66b900)



