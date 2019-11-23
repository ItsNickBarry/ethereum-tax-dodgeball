#!/bin/bash

npx yarn licenses generate-disclaimer --silent > static/LICENSE.txt

npx buidler run scripts/export_abi.js && npx saber build
