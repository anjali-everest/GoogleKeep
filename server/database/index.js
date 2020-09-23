const pg = require("pg");
require("dotenv").config();

const Pool = pg.Pool;

const connectionURL =
  process.env.ENVIRONMENT === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionURL,
});

module.exports = pool;
