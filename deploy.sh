#!/usr/bin/env sh

# set NODE_ENV=production

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

if [ $# -eq 0 ]
echo Got message
echo deploy message: $*
then
   message="deploy: $*"
else
   message='deploy'
fi

git add -A
git commit -m "$message"
git push
