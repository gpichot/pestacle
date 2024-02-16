#!/bin/sh

pnpm run build

cd dist

pnpm publish --no-git-checks 
