#!/usr/bin/env bash

# Clear
rm -rf build
CWD="$(pwd)" # /kyuch4n.github.io

# Pangu
# Build
cd $CWD/packages/pangu
jekyll build
# Copy Build Files
cp -rf _site $CWD/build