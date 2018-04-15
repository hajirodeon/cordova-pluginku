
# cordova-plugin-whois

[![NPM version](https://img.shields.io/npm/v/cordova-plugin-whois.svg)](https://www.npmjs.org/package/cordova-plugin-whois)

This plugin implements the client side of the Internet Whois Protocol defined in [RFC 954](https://www.rfc-editor.org/rfc/rfc954.txt).

## Installation

> cordova plugin add cordova-plugin-whois

or

> cordova plugin add https://github.com/t1st3/cordova-plugin-whois.git

## Usage

This plugin defines a global `Whois` object.
Although the object is in the global scope, it is not available until after the `deviceready` event.

### Usage with default whois server

The whois server `whois.internic.net` will be used if no whois server is specified. Here is an example query to the default server for information regarding the domain `wikipedia.com`:

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var w, success, err, queries;
  queries = ['wikipedia.com'];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  w = new Whois();
  p.whois(queries, success, err);
}
```

### Usage with a specific server

You can query a specific whois server. Here is an example query to the whois server `whois.pir.org` for information regarding the domain `apache.org`:

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var w, success, err, queries;
  queries = ['apache.org@whois.pir.org'];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  w = new Whois();
  p.whois(queries, success, err);
}
```

NOTE: You can get an exhaustive list of whois servers at [IANA's Root Zone Database](http://www.iana.org/domains/root/db).

### Usage with multiple queries

You can perform multiple queries (here, a query to the whois server `whois.pir.org` for information regarding the domain `apache.org`, and another query to the whois server `whois.nic.fr` for information regarding the domain `ovh.fr`):

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var w, success, err, queries;
  queries = ['ovh.fr@whois.nic.fr', 'apache.org@whois.pir.org'];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  w = new Whois();
  p.whois(queries, success, err);
}
```

## Methods

- Whois.whois

## Whois.whois

This method takes the following arguments:

* queries: an array of queries (domain or domain@whois-server)
* success: a callback function that handles success
* err: a callback function that handles error

The callback function for success takes one argument, which is a JSON array of results:

```json
[
  {
    "query": "apache.org@whois.pir.org",
    "status": "success",
    "result": "RESULT FROM WHOIS SERVER"
  }
]
```

The callback function for error takes one argument, which is the error emitted.

### Supported Platforms

- Android


*****

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT). Check the [LICENSE.md file](https://github.com/t1st3/cordova-plugin-whois/blob/master/LICENSE.md).

## Dependencies

For the Android part, this project depends on [Apache Commons Net 3.4](https://commons.apache.org/proper/commons-net/), which is distributed under the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0).
