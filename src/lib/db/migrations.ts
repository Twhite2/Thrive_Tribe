import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// This file is used to run migrations separately (not during runtime)
const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('DATABASE_URL is not defined in environment variables');
    process.exit(1);
  }

  // Create a new connection for the migration
  const migrationClient = postgres(connectionString, { max: 1 });
  
  try {
    // Create drizzle database instance for migrations
    const db = drizzle(migrationClient);
    
    // Run migrations from the specified directory
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the migration client
    await migrationClient.end();
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations().catch((error) => {
    console.error('Unhandled error during migration:', error);
    process.exit(1);
  });
}
