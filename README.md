# Yii-Bum-Stack

> Front End Stack for Backbone and Marionette development with Yii. Uses grunt for modularity instead of requirejs.

Bum - a nickname and acronym: Backbone, Underscore and Marionette.

## Getting Started
This package requires NodeJS, Bower, and Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this package with this command:

```shell
git clone https://github.com/dtison/Yii-Bum-Stack.git
```

Once the package has been installed, you must get dependencies from your site root:


```shell
bower install

Bower - manages retrieval and storage of all the js libraries used.

npm install . --save-dev
```

Then to run the example, cd src/sponsor

```shell
cd src/sponsor
grunt

```

Should load all the packages needed.


Next you set up for staging server uploads in rsync.json:

```json
{
    "options": "-rvp --progress -a --delete -e 'ssh -q' --include '*.' ",
    "user": "username",
    "host": "hostname.com",
    "path": "/directory/to/public_html"
}
```

Then:

```shell
grunt build

```

Should say:

Done, without errors.

The directories:

public_html/assets
public_html/debug
public_html/protected/runtime

Must all be set to 777 permissions.

.htaccess must be in public_html on the server.  If you don't have one working with Yii, this one works

```shell
grunt build
RewriteEngine On

# If a directory or a file exists, use it directly.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Else, forward it to index.php.
RewriteRule . index.php

php_value upload_max_filesize 80M
php_value post_max_size 80M

```


~  


### Overview

TBD

### Usage Example

TBD

#### Result:
TBD


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.0.1 : First Release

## License
Copyright (c) 2014 Gravityneutral.com Matt McFarland & David Ison. Licensed under the MIT license.
