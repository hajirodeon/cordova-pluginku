---
title: Battery Status
description: Get events for device battery level.
---
<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->


# phonegap-plugin-battery-status

This plugin provides an implementation based on the [W3C Battery Status Events API](https://www.w3.org/TR/battery-status/). The method navigator.getBattery() returns a promise with a BatteryManager object which has the following event handlers:

* onchargingchange
* onchargingtimechange
* ondischargingtimechange
* onlevelchange

## Installation

    phonegap plugin add phonegap-plugin-battery-status

## Status object

The BatteryManager object has the following properties:

- level: The battery charge percentage (0-100). _(Number)_
- charging: A boolean that indicates whether the device is plugged in. _(Boolean)_
- chargingTime: The time remaining to fully charge the battery. _(Number)_
- dischargingTime: The time remaining for the battery level to come down to 0. _(Number)_

## onchargingchange event

Fires when the device is plugged in or unplugged.

### Example

        navigator.getBattery().then(function(battery) {
            battery.onchargingchange = function() {
                console.log(this.level);
            };
        });

## onchargingtimechange event

Fires when the time required to charge the device changes.

### Example

        navigator.getBattery().then(function(battery) {
            console.log(battery.level);
            battery.onchargingtimechange = function() {
                console.log(this.level);
            };
        });

## ondischargingtimechange event

Fires when the time required to discharge the device changes.

### Example

        navigator.getBattery().then(function(battery) {
            battery.ondischargingtimechange = function() {
                console.log(this.level);
            };
        });

## onlevelchange event

Fires when the battery level of the device changes.

### Example

        navigator.getBattery().then(function(battery) {
            battery.onlevelchange = function() {
            console.log(this.level);
            };
        });


### Quirks: The onchargingtimechange and the ondischargingtimechange events and the chargingtime and dischargingTime properties are not supported on iOS.  

