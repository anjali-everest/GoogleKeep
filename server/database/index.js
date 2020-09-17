import pg from "pg";
const Pool = pg.Pool;

let pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
