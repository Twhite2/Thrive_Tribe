const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local or .env files
try {
  const localEnvPath = path.resolve(process.cwd(), '.env.local');
  const envPath = path.resolve(process.cwd(), '.env');
  
  if (fs.existsSync(localEnvPath)) {
    console.log('Loading environment from .env.local');
    dotenv.config({ path: localEnvPath });
  } else if (fs.existsSync(envPath)) {
    console.log('Loading environment from .env');
    dotenv.config({ path: envPath });
  } else {
    console.warn('No .env or .env.local file found');
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
}

// Database connection details
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Extract DB name from connection string
let dbName;
try {
  dbName = DATABASE_URL.split('/').pop().split('?')[0];
  console.log(`Database name: ${dbName}`);
} catch (error) {
  console.error('Error parsing database name from URL:', error);
  dbName = 'thrive_tribe'; // Default name if parsing fails
  console.log(`Using default database name: ${dbName}`);
}

// Function to create database using Node.js directly
async function createDatabaseDirectly() {
  try {
    // Parse connection parts from URL safely
    const urlParts = DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):([^/]+)\/(.+)/);
    
    if (!urlParts) {
      throw new Error('Could not parse connection URL properly');
    }
    
    const user = urlParts[1];
    const password = urlParts[2];
    const host = urlParts[3];
    const port = urlParts[4];
    
    // Create a client to connect to the default 'postgres' database
    const { Client } = require('pg');
    
    const client = new Client({
      user,
      host,
      database: 'postgres', // Connect to default database
      password,
      port: parseInt(port),
    });
    
    try {
      await client.connect();
      console.log('Connected to PostgreSQL server');
      
      // Check if database exists
      const checkResult = await client.query(
        "SELECT 1 FROM pg_database WHERE datname = $1", 
        [dbName]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`Database '${dbName}' already exists`);
      } else {
        // Create database - need to escape dbName for SQL safety
        const safeDbName = dbName.replace(/["']/g, ''); // Basic sanitization
        await client.query(`CREATE DATABASE ${safeDbName} WITH ENCODING 'UTF8'`);
        console.log(`Database '${dbName}' created successfully`);
      }
      
    } catch (dbError) {
      console.error('Database operation failed:', dbError.message);
      throw dbError;
    } finally {
      await client.end();
    }
    
    return true;
  } catch (error) {
    console.error('Failed to create database directly:', error.message);
    return false;
  }
}

// Main function to run the database initialization process
async function initDatabase() {
  try {
    console.log('Attempting to create database...');
    // First, try direct creation with Node.js
    const success = await createDatabaseDirectly();
    let sqlFilePath;
    
    if (!success) {
      console.log('Falling back to alternative method...');
      // Create an initialization SQL file for manual execution
      const initSql = `
        CREATE DATABASE ${dbName}
          WITH
          OWNER = postgres
          ENCODING = 'UTF8'
          CONNECTION LIMIT = -1;
      `;
      
      sqlFilePath = path.join(process.cwd(), 'init-db.sql');
      fs.writeFileSync(sqlFilePath, initSql);
      console.log(`Created SQL file at ${sqlFilePath}`);
      console.log('You can manually run this SQL file in pgAdmin or psql to create the database');
    }
    
    // Clean up if we created a file
    if (sqlFilePath && fs.existsSync(sqlFilePath)) {
      fs.unlinkSync(sqlFilePath);
    }
    
    // Run migrations using drizzle-orm
    if (success) {
      console.log('Running database migrations...');
      try {
        execSync('node src/lib/db/migrations.js', { stdio: 'inherit' });
        console.log('Database initialization completed successfully');
      } catch (migrationError) {
        console.error('Error running migrations:', migrationError.message);
        console.log('Please make sure your database is correctly set up before running migrations.');
      }
    } else {
      console.log('Database not created. Migrations skipped.');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}
// Call the initialization function
initDatabase().catch((error) => {
  console.error('Unhandled initialization error:', error);
  process.exit(1);
});
