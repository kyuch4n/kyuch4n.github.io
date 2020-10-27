#!/usr/bin/env bash

# Clear
rm -rf build
CWD="$(pwd)" # /kyuch4n.github.io

# Pangu
# Build
cd $CWD/packages/pangu
yarn build
# Copy Build Files
cp -rf _site $CWD/build

# Shennong
# Build
cd $CWD/packages/shennong
yarn build
# Copy Build Files
cp -rf dist $CWD/build/lab

# Regen Sitemap (Not Real Time)
echo '>>>>>>>>>>>>>>>>>>>>'
echo 'generate sitemap ...'
node $CWD/scripts/sitemap.js