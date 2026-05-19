exports.up = (pgm) => {
    pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(50) NOT NULL,
      gender VARCHAR(20),
      job_role VARCHAR(100),
      department VARCHAR(100),
      address TEXT,
      is_admin BOOLEAN DEFAULT FALSE,
      created_on TIMESTAMP DEFAULT NOW()
    );
  `);
};

exports.down = (pgm) => {
    pgm.sql('DROP TABLE users;');
};
