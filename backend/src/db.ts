import {Pool} from "pg";

const poolConfig = {
    user: 'shiv412',
    host: 'db',
    database: 'db123',
    password: 'Shivam@412',
    port: 5432,
}
const poolConnection = new Pool(poolConfig);
export default poolConnection;