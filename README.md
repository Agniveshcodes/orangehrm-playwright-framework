# OrangeHRM Playwright Automation Framework

## Overview

This project is an end-to-end test automation framework built using Playwright and TypeScript.

The framework automates core OrangeHRM workflows using the Page Object Model (POM) design pattern.

## Features

* Login functionality
* Logout functionality
* Add Employee
* Search Employee
* Delete Employee
* Dynamic test data generation using Faker
* Reusable Page Object Model architecture
* Assertions with Playwright Test

## Tech Stack

* Playwright
* TypeScript
* Faker
* Node.js

## Project Structure

pages/ - Page Object classes

tests/ - Test specifications

test-data/ - Test data and Faker utilities

## Installation

npm install

## Run Tests

npx playwright test

## Run Tests in Headed Mode

npx playwright test --headed

## View HTML Report

npx playwright show-report
