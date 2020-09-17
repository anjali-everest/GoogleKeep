import pg from "pg";
const Pool = pg.Pool;

let pool;
pool = new Pool({
  user: "postgres",
  host: "database",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

export default pool;
