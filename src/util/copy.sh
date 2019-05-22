#!/bin/sh
cd C:/Users/Admin/Desktop/tmc/node_learn/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log