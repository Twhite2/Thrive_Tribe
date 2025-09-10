// Test database connection script
const postgres = require('postgres');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

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
    console.log('Please create a .env.local file with DATABASE_URL before running this script');
    process.exit(1);
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

// Check if DATABASE_URL is set
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not defined in environment variables');
  console.log('Please add DATABASE_URL to your .env.local file in the format:');
  console.log('DATABASE_URL=postgres://username:password@localhost:5432/thrive_tribe');
  process.exit(1);
}

async function testConnection() {
  console.log('Testing PostgreSQL connection...');
  console.log(`Using connection string: ${DATABASE_URL.replace(/:.+@/, ':***@')}`); // Hide password
  
  try {
    const sql = postgres(DATABASE_URL, { max: 1 });
    
    // Test query
    const result = await sql`SELECT current_timestamp as now`;
    
    console.log('Connection successful!');
    console.log(`Current database time: ${result[0].now}`);
    
    // Check for required tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    const requiredTables = ['users', 'accounts', 'sessions', 'verification_tokens', 'profiles'];
    const existingTables = tables.map(t => t.table_name);
    
    console.log('\nChecking for required tables:');
    
    let allTablesExist = true;
    for (const table of requiredTables) {
      const exists = existingTables.includes(table);
      console.log(`- ${table}: ${exists ? '✅ Found' : '❌ Missing'}`);
      if (!exists) allTablesExist = false;
    }
    
    if (!allTablesExist) {
      console.log('\n⚠️ Some required tables are missing. Run migrations with:');
      console.log('npm run db:init');
    } else {
      console.log('\n✅ Database setup looks good! All required tables exist.');
    }
    
    // Close connection
    await sql.end();
  } catch (error) {
    console.error('Connection failed:', error.message);
    if (error.message.includes('role') || error.message.includes('password')) {
      console.error('\nAuthentication error: Check your database credentials');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('\nDatabase does not exist: Run initialization script with:');
      console.error('npm run db:init');
    } else if (error.message.includes('connect')) {
      console.error('\nCould not connect to PostgreSQL server:');
      console.error('- Make sure PostgreSQL is installed and running');
      console.error('- Check host and port in your connection string');
    }
    process.exit(1);
  }
}

testConnection();
