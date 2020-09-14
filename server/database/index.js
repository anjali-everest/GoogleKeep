import pg from "pg";
const Pool = pg.Pool;

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
let pool;
pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
export default pool;
