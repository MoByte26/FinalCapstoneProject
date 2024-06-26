const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/atelier_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'secret';
if(JWT === 'secret'){
  console.log('If deployed, set process.env.JWT to something other than secret');
}

const createTables = async()=> {
    const SQL = `
      DROP TABLE IF EXISTS users;
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    await client.query(SQL);
  };
  
  const createUser = async({ username, password})=> {
    const SQL = `
      INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 5)]);
    console.log("response from createUser" , response);
    const token = await jwt.sign({ id: response.rows[0].id}, JWT);
    return {user:response.rows[0], token};
  };
  
  const authenticate = async({ username, password })=> {
    const SQL = `
      SELECT id, username, password FROM users WHERE username=$1;
    `;
    const response = await client.query(SQL, [username]);
    if(!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const token = await jwt.sign({ id: response.rows[0].id}, JWT);
    return { token };
  };
  
  const findUserWithToken = async(token)=> {
    let id;
    try{
      const payload = await jwt.verify(token, JWT);
      id = payload.id;
    }
    catch(ex){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const SQL = `
      SELECT id, username FROM users WHERE id=$1;
    `;
    const response = await client.query(SQL, [id]);
    if(!response.rows.length){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    return response.rows[0];
  };
  
  const fetchUsers = async()=> {
    const SQL = `
      SELECT id, username FROM users;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  module.exports = {
    client,
    createTables,
    createUser,
    fetchUsers,
    authenticate,
    findUserWithToken
  };

  