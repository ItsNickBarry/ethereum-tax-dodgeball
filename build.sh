#!/bin/bash

npx yarn licenses generate-disclaimer --silent > static/LICENSE.txt

npx saber build
