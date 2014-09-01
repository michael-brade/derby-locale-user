Derby Locale User
=================

A [derby-locale](https://github.com/psirenny/derby-locale) strategy that selects user's locale preferences.

[![Build Status](https://travis-ci.org/psirenny/derby-locale-user.png?branch=master)](https://travis-ci.org/psirenny/derby-locale-user)

Installation
------------

    $ npm install derby-locale-user --save

Usage
-----

In your server file, add the middleware *before* derby-locale:

    var localeUser = require('derby-locale-user');

    expressApp
      // ...
      // ...
      .use(localeUser())
      .use(locale())

Options
-------

**key** – The path to the user's locales property. Defaults to `local.locales`.

**name** – The name of the strategy. Defaults to `user`.

**order** – The order of the strategy. Blank by default.

**path** – The path to the locale object. Defaults to `$locale`.

Dynamically Update
------------------

Create a reference from the strategy to the user's locale preference in order for the locale to update dynamically:

    app.get('/', function (page, model, params, next) {
      var strategy = model.at('$locale.strategies.user');
      var userId = ...
      var user = model.at('users.' + userId);

      user.subscribe(function (err) {
        if (err) return next(err);
        strategy.ref('locales', user.at('local.locales'));  
        // ...
      });
    });
