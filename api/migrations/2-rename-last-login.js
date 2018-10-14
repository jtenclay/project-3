'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "last_login" from table "Users"
 * addColumn "lastLogin" to table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "rename-last-login",
    "created": "2018-10-14T16:00:02.680Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Users", "last_login"]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "lastLogin",
            {
                "type": Sequelize.DATE
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
