require('dotenv').config()

module.exports = {
  'development': {
    'username': process.env.DEVELOPMENT_DB_USERNAME,
    'password': process.env.DEVELOPMENT_DB_PASSWORD,
    'database': 'project3',
    'host': '127.0.0.1',
    'port': 33066, // make sure to open the ssh tunnel to vagrant first
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql'
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql'
  }
}
