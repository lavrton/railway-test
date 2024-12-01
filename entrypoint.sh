#!/bin/bash

# Set resource limits
ulimit -u 65535 # Max user processes
ulimit -n 65535 # Max open file descriptors

# Execute the main application
exec "$@"