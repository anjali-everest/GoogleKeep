const pg = require("pg");
require("dotenv").config();

const Pool = pg.Pool;

let connectionURL = null;
if (process.env.ENVIRONMENT === "test")
  connectionURL = process.env.TEST_DATABASE_URL;
else connectionURL = process.env.DATABASE_URL;

let pool;
pool = new Pool({
  connectionString: connectionURL,
});

module.exports = pool;
