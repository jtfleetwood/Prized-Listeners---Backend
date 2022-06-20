#!/usr/bin/bash

if [ "$(date +%u)" = 7 ]; then node maintenance/updates.js; fi