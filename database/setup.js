const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

/**
 * Database setup script for Instant Bite
 * This script:
 * 1. Creates the MySQLdatabase
 * 2. Runs the schema creation
 * 3. Optionally loads sample data
 */

const config = {
  hostUrl: 'localhost',
  port: 3306,
  rootUser: 'root',
  rootPassword: '', // Change this to your MySQL root password
  databaseName: 'instant_bite',
  databaseUser: 'instant_bite_user',
  databasePassword: 'InstantBite@2024', // Change this to a secure password
};

async function setupDatabase() {
  console.log('🍽️  Starting Instant Bite Database Setup...\n');

  try {
    // Step 1: Create connection with root user
    console.log('📌 Connecting to MySQL as root...');
    const rootConnection = await mysql.createConnection({
      host: config.hostUrl,
      port: config.port,
      user: config.rootUser,
      password: config.rootPassword || '',
    });
    console.log('✅ Connected!\n');

    // Step 2: Create database
    console.log(`📌 Creating database '${config.databaseName}'...`);
    await rootConnection.execute(`DROP DATABASE IF EXISTS ${config.databaseName}`);
    await rootConnection.execute(`CREATE DATABASE ${config.databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${config.databaseName}' created!\n`);

    // Step 3: Create database user
    console.log(`📌 Creating database user '${config.databaseUser}'...`);
    await rootConnection.execute(`DROP USER IF EXISTS '${config.databaseUser}'@'localhost'`);
    await rootConnection.execute(
      `CREATE USER '${config.databaseUser}'@'localhost' IDENTIFIED BY '${config.databasePassword}'`
    );
    await rootConnection.execute(
      `GRANT ALL PRIVILEGES ON ${config.databaseName}.* TO '${config.databaseUser}'@'localhost'`
    );
    await rootConnection.execute('FLUSH PRIVILEGES');
    console.log(`✅ User '${config.databaseUser}' created and granted privileges!\n`);

    // Step 4: Run schema
    console.log('📌 Running schema creation...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
    const schemaStatements = schemaSQL.split(';').filter((stmt) => stmt.trim().length > 0);

    for (const statement of schemaStatements) {
      try {
        await rootConnection.execute(statement + ';');
      } catch (err) {
        // Skip comments and empty statements gracefully
        if (!err.message.includes('syntax error')) {
          console.error(`⚠️  Error executing statement: ${err.message}`);
        }
      }
    }
    console.log(`✅ Schema created with ${schemaStatements.length} statements!\n`);

    // Step 5: Ask if user wants sample data
    console.log('📌 Would you like to load sample data? (y/n)');
    const answer = await getUserInput();

    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log('📌 Loading sample data...');
      const samplePath = path.join(__dirname, 'sample-data.sql');
      const sampleSQL = fs.readFileSync(samplePath, 'utf-8');
      const sampleStatements = sampleSQL.split(';').filter((stmt) => stmt.trim().length > 0);

      for (const statement of sampleStatements) {
        try {
          await rootConnection.execute(statement + ';');
        } catch (err) {
          console.error(`⚠️  Error: ${err.message}`);
        }
      }
      console.log(`✅ Sample data loaded!\n`);
    }

    await rootConnection.end();

    // Step 6: Create connection config file
    console.log('📌 Creating connection config file...');
    const configContent = `// Database connection configuration for Instant Bite
// DO NOT commit this file to version control!

module.exports = {
  host: '${config.hostUrl}',
  port: ${config.port},
  user: '${config.databaseUser}',
  password: '${config.databasePassword}',
  database: '${config.databaseName}',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
};
`;

    const configPath = path.join(__dirname, 'db-config.js');
    fs.writeFileSync(configPath, configContent);
    console.log(`✅ Config file created at ${configPath}\n`);

    console.log('✨ Database setup complete!');
    console.log('\n📚 Next steps:');
    console.log('1. Update database credentials in database/db-config.js if needed');
    console.log('2. Install mysql2 in your project: npm install mysql2');
    console.log('3. Use the connection pool in your server code');
    console.log('\n==========================================');
    console.log('Database Connection Details:');
    console.log('==========================================');
    console.log(`Host: ${config.hostUrl}`);
    console.log(`Port: ${config.port}`);
    console.log(`Database: ${config.databaseName}`);
    console.log(`User: ${config.databaseUser}`);
    console.log(`Password: ${config.databasePassword}`);
    console.log('==========================================\n');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

function getUserInput() {
  return new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}

// Run the setup
setupDatabase();
