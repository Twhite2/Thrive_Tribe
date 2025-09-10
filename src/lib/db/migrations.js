const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
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

// Get the database connection string
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

async function runMigrations() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  
  try {
    await client.connect();
    console.log('Connected to database for migrations');
    
    // Read the migration SQL file
    const migrationPath = path.join(process.cwd(), 'migrations', '0001_initial_schema.sql');
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found at ${migrationPath}`);
    }
    
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Running initial schema migration...');
    await client.query(sql);
    console.log('Migration completed successfully');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run migrations
runMigrations().catch(error => {
  console.error('Unhandled error during migration:', error);
  process.exit(1);
});
