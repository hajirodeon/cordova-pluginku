[![npm version](https://badge.fury.io/js/skwas-cordova-plugin-appinfo.svg)](https://badge.fury.io/js/skwas-cordova-plugin-appinfo)

# skwas-cordova-plugin-appinfo
Cordova Plugin to retrieve application information, like the App name, version, compile date and identifier. Additionally returns some device capabilities (which perhaps should be move to the device plugin).

## Installation ##

`cordova plugin add skwas-cordova-plugin-appinfo`

or for latest

`cordova plugin add https://github.com/skwasjer/skwas-cordova-plugin-appinfo.git`


## Supported platforms ##

Android 4 and higher  
iOS 8 and higher (tested with Xcode 7.2.3 and Xcode 8)  
Browser proxy (provided only for compatibility)

## Usage ##

This plugin defines a global appInfo object, which provides application properties. Although the object is in the global scope, it is not available until after the deviceready event.

```js
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(appInfo.name);
}
```

# Properties #

## appInfo.name ##
##### Type: String #####
Gets the application name.

#### Supported platforms ####
- Android (manifest/application@android:label)
- iOS (CFBundleName)

## appInfo.identifier ##
##### Type: String #####
Gets the application identifier.

#### Supported platforms ####
- Android (manifest/package)
- iOS (CFBundleIdentifier)

## appInfo.version ##
##### Type: String #####
Gets the application version.

#### Supported platforms ####
- Android (manifest@android:versionName)
- iOS (CFBundleShortVersionString)

## appInfo.build ##
##### Type: String #####
Gets the application build.

#### Supported platforms ####
- Android (manifest@android:versionCode)
- iOS (CFBundleVersion)

## appInfo.compileDate ##
##### Type: String #####
Gets the datetime when the application was compiled.

#### Supported platforms ####
- Android
- iOS

## appInfo.isHardwareAccelerated ##
##### Type: Boolean #####
Gets whether the application is using hardware acceleration.

#### Supported platforms ####
- Android, Honeycomb upwards
- iOS will always return true

## appInfo.isDebuggable ##
##### Type: Boolean #####
Gets whether the application can be remotely debugged.

#### Supported platforms ####
- Android
- iOS

## Changelog

#### 1.0.1
- Android: fix compile error when cordova-plugin-device is not installed

#### 1.0.0 ####
- Marking v1 since it is fairly stable and not changing much.
- Android/iOS: added build and identifier.

#### 0.4.0
- added Cordova 5.x support

#### 0.3.5
- run plugin in background as per Cordova manual

#### 0.3.4
- added iOS support

#### 0.3.2
- Android support
- first public release

