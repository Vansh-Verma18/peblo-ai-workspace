#!/usr/bin/env node

/**
 * Database setup script
 * Switches Prisma provider based on DATABASE_URL
 */

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const databaseUrl = process.env.DATABASE_URL || '';

// Determine provider based on DATABASE_URL
const isSQLite = databaseUrl.startsWith('file:');
const isPostgreSQL = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://');

let provider = 'postgresql'; // Default to PostgreSQL for Vercel

if (isSQLite) {
  provider = 'sqlite';
} else if (isPostgreSQL) {
  provider = 'postgresql';
}

console.log(`Setting up database with provider: ${provider}`);

// Read schema file
let schema = fs.readFileSync(schemaPath, 'utf8');

// Replace provider
if (provider === 'sqlite') {
  schema = schema.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
} else {
  schema = schema.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
}

// Write back
fs.writeFileSync(schemaPath, schema);

console.log(`✓ Prisma schema updated to use ${provider}`);
