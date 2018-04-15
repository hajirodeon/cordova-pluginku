/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/* jshint jasmine: true */

exports.defineAutoTests = function () {

    describe('Plugin conforms to w3c specs', function() {

        it("navigator.getBattery should exist", function(){
            expect(navigator.getBattery).toBeDefined();
            expect(typeof navigator.getBattery).toBe('function');
        });

        it('getBattery should return a promise with attributes of Battery Interface', function(done){
            try{
                var promise = navigator.getBattery();
                expect(typeof promise.then).toBe('function');
                promise.then(function (battery){
                    expect(battery).toBeDefined();
                    expect(typeof battery).toBe('object');
                    expect(battery.charging).toBeDefined();
                    expect(battery.chargingTime).toBeDefined();
                    expect(battery.dischargingTime).toBeDefined();
                    expect(battery.level).toBeDefined();
                    expect(battery.onchargingchange).toBeDefined();
                    expect(battery.onchargingtimechange).toBeDefined();
                    expect(battery.ondischargingtimechange).toBeDefined();
                    expect(battery.onlevelchange).toBeDefined();
                    expect(typeof battery.charging).toBe('boolean');
                    expect(typeof battery.chargingTime).toBe('number');
                    expect(typeof battery.dischargingTime).toBe('number');
                    expect(typeof battery.level).toBe('number');
                    expect(battery.addEventListener).toBeDefined();
                    expect(typeof battery.addEventListener).toBe('function');
                    expect(battery.removeEventListener).toBeDefined();
                    expect(typeof battery.removeEventListener).toBe('function');
                    done();
                }, function(err) {
                    expect(err).toBeDefined();
                    fail(err);
                    done();
                });
            } catch (err) {
                fail(err);
                done();
            }

        });

    });

};

//******************************************************************************************
//***************************************Manual Tests***************************************
//******************************************************************************************

exports.defineManualTests = function (contentEl, createActionButton) {

    /* Battery */

    function getChargingChange(){
        navigator.getBattery().then(function (battery){
           battery.onchargingchange  = function() {
                document.getElementById('pluggedValue').innerText = this.charging;
            };
        });
    }
    function getChargingTimeChange(){
        navigator.getBattery().then(function (battery){
           battery.onchargingchange  = function() {
                document.getElementById('chrgTimeValue').innerText = this.chargingTime;
            };
        });
    }
    // function getdischargingTimeChange(){
    //     navigator.getBattery().then(function (battery){
    //         console.log(typeof battery.dischargingTime);
    //         console.log(battery.dischargingTime);
    //        battery.ondischargingtimechange  = function() {
    //             document.getElementById('dischrgTimeValue').innerText = this.dischargingTime;
    //         };
    //     });
    // }
    function getChargingLevel(){
        navigator.getBattery().then(function (battery){
           battery.onlevelchange = function() {
                document.getElementById('levelValue').innerText = this.level;
            };
        });
    }
    //Generate Dynamic Table
    function generateTable(tableId, rows, cells, elements) {
        var table = document.createElement('table');
        for (var r = 0; r < rows; r++) {
            var row = table.insertRow(r);
            for (var c = 0; c < cells; c++) {
                var cell = row.insertCell(c);
                cell.setAttribute("align", "center");
                for (var e in elements) {
                    if (elements[e].position.row == r && elements[e].position.cell == c) {
                        var htmlElement = document.createElement(elements[e].tag);
                        var content;

                        if (elements[e].content !== "") {
                            content = document.createTextNode(elements[e].content);
                            htmlElement.appendChild(content);
                        }
                        if (elements[e].type) {
                            htmlElement.type = elements[e].type;
                        }
                        htmlElement.setAttribute("id", elements[e].id);
                        cell.appendChild(htmlElement);
                    }
                }
            }
        }
        table.setAttribute("align", "center");
        table.setAttribute("id", tableId);
        return table;
    }
    // Battery Elements
    var batteryElements =
        [{
            id : "statusTag",
            content : "Status:",
            tag : "div",
            position : {
                row : 0,
                cell : 0
            }
        }, {
            id : "statusValue",
            content : "",
            tag : "div",
            position : {
                row : 0,
                cell : 1
            }
        }, {
            id : "levelTag",
            content : "Level:",
            tag : "div",
            position : {
                row : 1,
                cell : 0
            }
        }, {
            id : "levelValue",
            content : "",
            tag : "div",
            position : {
                row : 1,
                cell : 1
            }
        }, {
            id : "pluggedTag",
            content : "Plugged:",
            tag : "div",
            position : {
                row : 2,
                cell : 0
            }
        }, {
            id : "pluggedValue",
            content : "",
            tag : "div",
            position : {
                row : 2,
                cell : 1
            }
        }, {
            id : "lowTag",
            content : "Low:",
            tag : "div",
            position : {
                row : 3,
                cell : 0
            }
        }, {
            id : "lowValue",
            content : "",
            tag : "div",
            position : {
                row : 3,
                cell : 1
            }
        }, {
            id : "criticalTag",
            content : "Critical:",
            tag : "div",
            position : {
                row : 4,
                cell : 0
            }
        }, {
            id : "criticalValue",
            content : "",
            tag : "div",
            position : {
                row : 4,
                cell : 1
            }
        }, {
            id : "chrgTimeTag",
            content : "Charging Time:",
            tag : "div",
            position : {
                row : 5,
                cell : 0
            }
        }, {
            id : "chrgTimeValue",
            content : "",
            tag : "div",
            position : {
                row : 5,
                cell : 1
            }
        },
        // {
        //     id : "dischrgTimeTag",
        //     content : "Discharging Time:",
        //     tag : "div",
        //     position : {
        //         row : 6,
        //         cell : 0
        //     }
        // }, {
        //     id : "dischrgTimeValue",
        //     content : "",
        //     tag : "div",
        //     position : {
        //         row : 6,
        //         cell : 1
        //     }
        // }
    ];

    //Title audio results
    var div = document.createElement('h2');
    div.appendChild(document.createTextNode('Battery Status'));
    div.setAttribute("align", "center");
    contentEl.appendChild(div);

    var batteryTable = generateTable('info', 7, 3, batteryElements);
    contentEl.appendChild(batteryTable);

    div = document.createElement('h2');
    div.appendChild(document.createTextNode('Actions'));
    div.setAttribute("align", "center");
    contentEl.appendChild(div);

    contentEl.innerHTML += '<h3>Battery Status Tests</h3>' +
        '</p> Will update value for charging status' +
        '<div id="chckChargingChange"></div>'+
        '</p> Will update value for charge level' +
        '<div id="chckChargingLevel"></div>'+
        '</p> Will update value for charging time' +
        '<div id="chckChargingTime"></div>';
        // '</p> Will update value for discharging time' +
        // '<div id="chckdischargingTime"></div>';

    createActionButton('check charging change event', function () {
        getChargingChange();
    }, 'chckChargingChange');
    createActionButton('check charging level event', function () {
        getChargingLevel();
    }, 'chckChargingLevel');
    createActionButton('check charging time change event', function () {
        getChargingTimeChange();
    }, 'chckChargingTime');
    // createActionButton('check discharging time change event', function () {
    //     getdischargingTimeChange();
    // }, 'chckdischargingTime');


};
