'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "PostParts", deps: [Posts]
 * changeColumn "isPrivate" on table "Posts"
 *
 **/

var info = {
    "revision": 3,
    "name": "add-post-parts",
    "created": "2018-10-14T20:22:38.468Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "PostParts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "index": {
                    "type": Sequelize.INTEGER
                },
                "type": {
                    "type": Sequelize.ENUM('heading', 'image'),
                    "defaultValue": "heading"
                },
                "imageUrl": {
                    "type": Sequelize.STRING
                },
                "text": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Posts",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Posts",
            "isPrivate",
            {
                "type": Sequelize.BOOLEAN,
                "default": false
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
