const { client, getAllUsers, createUser } = require('./index');

async function testDB() {
  try {
    // connect the client to the database, finally
    console.log("Starting to test database...");
   const users = await getAllUsers();
   console.log("Grabbing users:", users)
   console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({ username: 'sandra', password: 'bertie99' });
      const glamgal = await createUser({ username: 'glamgal', password: 'bertie99' });
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
}
  

// this function should call a query which drops all tables from our database
async function dropTables() {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
            DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping tables!")
    } catch (error) {
        console.log("Error dropping tables!")
      throw error; // we pass the error up to the function that calls dropTables
    }
  }
  
  // this function should call a query which creates all tables for our database 
async function createTables() {
    try {
        console.log("Starting to build tables...")
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );
        `);
        console.log("Finished building tables!")
    } catch (error) {
        console.log("Error trying to build tables!")
        throw error; // we pass the error up to the function that calls createTables
    }
}
  
async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
        throw error;
    }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());