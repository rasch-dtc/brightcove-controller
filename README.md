# brightcove-controller
a custom plugin for brightcove players only to add custom functionality to the brightcove player (mainly pre/mid/post - roll)

## setup
* checkout this repository `git checkout https://github.com/rasch-dtc/brightcove-controller.git`
* `npm install`
* make any changes in /src directories javascript files
* `npm run deploy` to push the project to again to github-pages

After all, the plugin is available (or every other file in /src) under:

http://rasch-dtc.github.io/brightcove-controller/controller.js

## brightcove
* create a new player or edit an existing one
* go to "Plugins" section, press Edit
* add the desired file of this repo trough the public github domain (just for dev!) to your plugin list

## following this guide
https://docs.brightcove.com/en/video-cloud/player-management/guides/plugin-dev-quick-start.html

### cue points info
http://docs.brightcove.com/en/video-cloud/smart-player-api/samples/basic-cue-points.html