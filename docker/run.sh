#!/bin/bash
# docker run -d --name workspace-$1 -p $1:8080 --tmpfs /tmp --tmpfs /run --tmpfs /run/lock -v /sys/fs/cgroup:/sys/fs/cgroup:ro workspace-full
docker run -d --name workspace-$1 -p $1:8080 workspace-full