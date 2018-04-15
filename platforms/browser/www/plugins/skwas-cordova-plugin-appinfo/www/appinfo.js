cordova.define("skwas-cordova-plugin-appinfo.AppInfo", function(require, exports, module) { /*
The MIT License (MIT)

Copyright (c) 2015 skwas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onAppInfoReady');
// Tell cordova channel to wait on the AppInfoReady event
channel.waitForInitialization('onAppInfoReady');

/**
 * This represents the app, and provides properties for inspecting the app info.
 * phone, etc.
 * @constructor
 */
function AppInfo() {
    this.available = false;
    this.name = null;
    this.version = null;
    this.build = null;
    this.identifier = null;
    this.compileDate = null;
    this.isHardwareAccelerated = null;
    this.isDebuggable = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            me.available = true;
            me.name = info.name;
            me.version = info.version;
            me.identifier = info.identifier;
            me.build = info.build;
            me.compileDate = info.compileDate;
            me.isHardwareAccelerated = info.isHardwareAccelerated;
            me.isDebuggable = info.isDebuggable;
            channel.onAppInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

/**
 * Get app info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
AppInfo.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'AppInfo.getInfo', arguments);
    exec(successCallback, errorCallback, "AppInfo", "getAppInfo", []);
};

module.exports = new AppInfo();

});
