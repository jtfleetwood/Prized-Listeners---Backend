#!/usr/bin/bash

if [ "$(date +%u)" = 1 ]; then node maintenance/updates.js; fi