#!/bin/bash

npx buidler run scripts/export_abi.js && npx buidler run scripts/deploy.js && npx saber
