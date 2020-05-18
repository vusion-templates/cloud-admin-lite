#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build:site

# navigate into the build output directory
cd dist/

cp dashboard.html 404.html
cp dashboard.html index.html

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy [ci skip]'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f https://github.com/vusion-templates/cloud-admin-lite.git master:gh-pages

cd -
