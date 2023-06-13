#!/bin/sh

publish() {
  (
    cd $1
    local name=$(cat package.json | grep name | head -n 1 | cut -d'"' -f 4)
    local targetVersion=$(cat package.json | grep version | head -n 1 | cut -d'"' -f 4)
    echo "Target Version: '$targetVersion'"
    local remoteVersion=$(npm info $name version)
    echo "Remote Version: '$remoteVersion'"
    if [ -z "$remoteVersion" ]; then remoteVersion="0.0.0"; fi
    echo "$name@$remoteVersion -> $targetVersion"
    if [ "$remoteVersion" != "$targetVersion" ]; then npm publish; fi
  )
}

for i in ./packages/*; do publish $i; done