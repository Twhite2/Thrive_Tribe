import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Environment variables will be read from .env.local
const connectionString = process.env.DATABASE_URL;

// Check if the connection string is available
if (!connectionString) {
  console.error('DATABASE_URL is not defined in environment variables');
}

// Create postgres connection
const client = postgres(connectionString || '');

// Create drizzle database instance
export const db = drizzle(client, { schema });

// Export the schema for use in other files
export { schema };
