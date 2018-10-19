'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "PostId" on table "Sources"
 * changeColumn "PostId" on table "Sources"
 * changeColumn "PostId" on table "Sources"
 *
 **/

var info = {
    "revision": 5,
    "name": "remove-cyclic-dependency",
    "created": "2018-10-14T21:54:14.476Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Sources",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Sources",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Sources",
            "PostId",
            {
                "type": Sequelize.INTEGER,
                "allowNull": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
