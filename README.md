# create-wordpress-plugin

  NPM CLI tool for generating a WordPress Plugin in the current folder.

# Description
  Using this CLI tool, you can generate your own WordPress Plugin. Features:-

  * 100% WordPress coding standards maintained.
  * Used by lots of plugins in WordPress.org and Codecanyon.
  * Code watching functionality using Gulp (auto reload if PHP or JS file change).
  * SASS(scss) compilation support.
  * Browsersync Integrated to refresh SASS/CSS without browser reload.
  * Minimal configuration and folder/file structure that anyone can understand.

# Installation & Usage

    $ npx create-wordpress-plugin

# Code Watching & Reload

  * `npm install`
  * Change the proxy URL in the `gulpfile.js` to your site URL.
  * Start Gulp by running `gulp` in the terminal.
  * For creating a production build (plugin zip file with minified javascripts,css) run `gulp prod`