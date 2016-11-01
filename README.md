# ed3n-bootstrap
Eden 3 Starter Template

## [Openovate's Framework](https://github.com/Openovate/Framework)

## Pre Requisites
1. PHP 5.3+
2. Apache 2
3. Composer

## Install
1. Checkout with git via `git clone https://github.com/Openovate/Framework.git`
2. Point your VirtualHost to load files from `[YOUR_OPENOVATE_FRAMEWORK_DIR]/repo/Front/public`
3. `cd` into that directory and run `php [PATH_TO_COMPOSER_PHAR]/composer.phar install`
4. Open write access to config via `sudo chmod -R 777 [YOUR_OPENOVATE_FRAMEWORK_DIR]/config`
5. Open up your VirtualHost domain with your browser to test.

Special thanks to  [Charles](https://github.com/cjzamora) [agular-bootstrap](https://github.com/cjzamora/angular-bootstrap)

## AngularJS Bootstrap Application

## Requirements
* [NodeJS](http://nodejs.org)
* [NPM](http://npmjs.com)
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

## Steps
1. Clone this repository, or just fork it then clone it
from your repository.
2. `cd repo/Front/public`. or `cd repo/Back/public`.
3. Execute this command `sudo npm install` to install node modules.
4. Execute this command `bower install` to install bower components.
5. Now let's start installing bower components to /application/vendor
by running this command `gulp install`.
6. Then Ola! You can now start developing by running `gulp`

### Gulp file available task
* `gulp` default gulp task that runs `gulp watch` task.
* `gulp watch` production watcher task.
* `gulp watch-dev` development watcher task.
* `gulp install` bower components installer to /application/vendor folder.
* `gulp clean-vendor` removes all the vendor files from /application/vendor folder.
* `gulp build` creates a minified rev-versioned file to /application/build folder.
* `gulp clean` removes or cleans the /application/build directory.
* `gulp inject` automatically injects angular files, scripts, styles, and vendor files to <head> tag of index.html file.
* `gulp inject-dev` injects development files, all the files that are not minified. except minified vendor files.
* `gulp inject-clean` remove all injected files to <head> tag of index.html file.
* `gulp lint` runs jshint with styled reporter.
* `gulp deploy` runs deployment task in sequence. e.g install, clean, build, inject-clean, inject.
* `gulp deploy-dev` runs developement deployment task in sequence. e.g install, clean, inject-clean, inject-dev.
* `gulp minify-controllers` generates minified rev-versioned angular controllers.
* `gulp minify-components` generates minified rev-versioned angular components.
* `gulp minify-decorators` generates minified rev-versioned angular decorators.
* `gulp minify-services` generates minified rev-versioned angular services.
* `gulp minify-scripts` generates minified rev-versioned /assets/scripts.
* `gulp minify-styles` generates minified rev-versioned /assets/styles.

## Tips
> If you are developing in development environment, just run `gulp watch-dev` and it will do all the development
> environment task, for production development / deployment just run `gulp` or `gulp watch` and it will do all the
> production task you need.

### ROCK ON!
