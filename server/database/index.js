const pg = require("pg");
require('dotenv').config()

const Pool = pg.Pool;
let pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
