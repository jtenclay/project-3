# Project 3

✨

## Vue

* Using Pug and SCSS
* Start Vue server with `yarn serve`

## Server and database

* Sequelize will be looking for a `VAGRANT_DB` environment variable set in your shell with your database url
* Forward your Vagrant port with `ssh -NL <vagrant_port>:localhost:3306 <vagrant_username>@<vagrant_ip_address>` (replace the variables with your own). I have this aliased to `openvagrantssh`. Then `yarn start` in a new window to start the server
* Create migrations with `yarn makemigration --name <name>` (use `--preview` instead for a dry run)
* Run migrations with `yarn runmigration`
