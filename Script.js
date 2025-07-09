var download = require('download-github-repo');
var fs = require('fs-extra');
const readline = require("readline");
var replace = require('replace');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function init() {
    console.log('\x1b[36m%s\x1b[0m', '========================================');
    console.log('\x1b[32m%s\x1b[0m', '|                                      |');
    console.log('\x1b[32m%s\x1b[0m', '|        create-wordpress-plugin       |');
    console.log('\x1b[32m%s\x1b[0m', '|         Author: Mehbub Rashid        |');
    console.log('\x1b[32m%s\x1b[0m', '|    https://github.com/MehbubRashid   |');
    console.log('\x1b[32m%s\x1b[0m', '|                                      |');
    console.log('\x1b[36m%s\x1b[0m', '========================================');

    var origin = process.cwd() + '/source/';
    var pluginSlug = '';
    var pluginName = '';
    var pluginURI = '';
    var pluginAuthor = '';
    var pluginAuthorURI = '';
    var pluginDescription = '';
    var pluginPrefix = '';
    var pluginNamePackage = '';
    var pluginNameInstance = '';
    var pluginAuthorEmail = '';
    var pluginAuthorFull = '';
    var pluginNameVersion = '';
    var pluginNamePath = '';
    var pluginNameUrl = '';
    var destination = '';
    var data = {
        name: '',
        slug: '',
        uri: '',
        prefix: '',
        author: {
            name: '',
            email: '',
            uri: '',
        }
    };


    rl.question("Plugin Name: ", function (name) {
        if (name) data.name = name;
        rl.question("Plugin Slug: ", function (slug) {
            if (slug) data.slug = slug;
            rl.question("Unique Prefix For Function Names: ", function (prefix) {
                if (prefix) data.prefix = prefix;
                rl.question("Plugin URI: ", function (uri) {
                    if (uri) data.uri = uri;
                    rl.question("Author Name: ", function (author) {
                        if (author) data.author.name = author;
                        rl.question("Author URI: ", function (authoruri) {
                            if (authoruri) data.author.uri = authoruri;
                            rl.question("Author Email: ", function (authoremail) {
                                if (authoremail) data.author.email = authoremail;
                                rl.close();

                                pluginSlug = String(data.slug).length
                                    ? String(data.slug).toLowerCase()
                                    : 'amazing-plugin';
                                pluginName = String(data.name).length ? data.name : 'Amazing Plugin';
                                pluginURI = String(data.uri).length
                                    ? data.uri
                                    : 'https://github.com/MehbubRashid';
                                pluginPrefix = String(data.prefix).length
                                    ? data.prefix
                                    : 'prefix';
                                pluginAuthor = String(data.author.name).length
                                    ? data.author.name
                                    : 'Mehbub Rashid';
                                pluginAuthorURI = String(data.author.uri).length
                                    ? data.author.uri
                                    : 'https://github.com/MehbubRashid';
                                pluginAuthorEmail = String(data.author.email).length
                                    ? data.author.email
                                    : 'mehbub.rabu@gmail.com';
                                pluginNamePackage = capitalize(pluginSlug);
                                pluginNameInstance = pluginSlug.replace(/-/gi, '_');
                                pluginNameVersion = (pluginNameInstance + '_VERSION').toUpperCase();
                                pluginNamePath = (pluginNameInstance + '_PATH').toUpperCase();
                                pluginNameUrl = (pluginNameInstance + '_URL').toUpperCase();
                                pluginAuthorFull = pluginAuthor + ' <' + pluginAuthorEmail + '>';

                                
                                destination = '.';

                                console.log('\x1b[36m%s\x1b[0m', `Creating Plugin...`);

                                downloadSourceCode(destination)
                                .then(() => {

                                    //RENAME THE MAIN PLUGIN DIRECTORY
                                    fs.renameSync(
                                        destination + '/plugin-name',
                                        destination + '/' + pluginSlug
                                    );

                                    //FIND AND REPLACE FILES NAMES
                                    walker(destination + '/' + pluginSlug, function (err, files) {
                                        if (err) {
                                            console.error(err);

                                            return;
                                        }

                                        files.forEach(function (file) {
                                            var newName;
                                            var re = /plugin-name/gi;
                                            newName = file.replace(re, pluginSlug);
                                            fs.renameSync(file, newName);
                                        });

                                        // Plugin URI
                                        replace({
                                            regex: 'http://example.com/plugin-name-uri/',
                                            replacement: pluginURI,
                                            paths: [destination + '/' + pluginSlug + '/' + pluginSlug + '.php'],
                                            recursive: false,
                                            silent: true
                                        });

                                        // Plugin Name
                                        replace({
                                            regex: 'WordPress Plugin Boilerplate',
                                            replacement: pluginName,
                                            paths: [destination + '/' + pluginSlug + '/' + pluginSlug + '.php'],
                                            recursive: true,
                                            silent: true
                                        });

                                        //Plugin URI
                                        replace({
                                            regex: 'http://example.com/plugin-name-uri/',
                                            replacement: pluginURI,
                                            paths: [destination + '/' + pluginSlug + '/' + pluginSlug + '.php'],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin Author
                                        replace({
                                            regex: 'Your Name or Your Company',
                                            replacement: pluginAuthor,
                                            paths: [destination + '/' + pluginSlug + '/' + pluginSlug + '.php'],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin Author Full
                                        replace({
                                            regex: 'Your Name <email@example.com>',
                                            replacement: pluginAuthorFull,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin_Name
                                        replace({
                                            regex: 'Plugin_Name',
                                            replacement: pluginNamePackage,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin slug
                                        replace({
                                            regex: 'plugin-name',
                                            replacement: pluginSlug,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Author URI
                                        replace({
                                            regex: 'http://example.com/?',
                                            replacement: pluginAuthorURI,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin Version
                                        replace({
                                            regex: 'PLUGIN_NAME_VERSION',
                                            replacement: pluginNameVersion,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin prefix lowercase
                                        replace({
                                            regex: 'uprefix',
                                            replacement: pluginPrefix,
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin prefix capitalized
                                        replace({
                                            regex: 'Uprefix',
                                            replacement: capitalize(pluginPrefix),
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Plugin prefix all capital
                                        replace({
                                            regex: 'UPREFIX',
                                            replacement: pluginPrefix.toUpperCase(),
                                            paths: [destination + '/' + pluginSlug],
                                            recursive: true,
                                            silent: true
                                        });

                                        //replace Author URI
                                        replace({
                                            regex: 'plugin_name',
                                            replacement: pluginNameInstance,
                                            paths: [destination + '/' + pluginSlug + '/' + pluginSlug + '.php'],
                                            recursive: true,
                                            silent: true
                                        });

                                        console.log('\x1b[32m%s\x1b[0m', `Plugin Created! To understand the structure & usage, please visit https://github.com/MehbubRashid/create-wordpress-plugin/blob/master/README.md`);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

/**
 * GET PLUGIN CODE FROM GITHUB
 */
var downloadSourceCode = function (destination) {
    return new Promise((resolve, reject) => {
    
        //GET THE NEW CODE FORM THE REPO
        download('MehbubRashid/WordPress-Plugin-Boilerplate', destination, function () {
            resolve();
        });
    })
};

/**
 * RECURSIVE WALKER TO GET ALL THE FILES IN DIRECTORY
 */
var walker = function (dir, done) {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        var i = 0;

        (function next() {
            var file = list[i++];

            if (!file) return done(null, results);

            file = dir + '/' + file;

            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walker(file, function (err, res) {
                        results = results.concat(res);

                        next();
                    });
                } else {
                    results.push(file);

                    next();
                }
            });
        })();
    });
};

var capitalize = function (name) {
    var newName = '';
    name = name.replace(/-/gi, ' ');
    pieces = name.split(' ');
    pieces.forEach(function (word) {
        newName += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    });

    return newName.trim().replace(/ /gi, '_');
};

module.exports = {
    init
}