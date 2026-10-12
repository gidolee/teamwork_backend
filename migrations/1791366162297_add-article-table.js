// exports.up = (pgm) => {
//     pgm.sql(`
//     CREATE TABLE articles (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       article TEXT NOT NULL,
//       user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
//       category_id INTEGER NOT NULL,
//       color_id INTEGER,
//       flagged BOOLEAN NOT NULL DEFAULT false,
//       flagged_at TIMESTAMPTZ,
//       created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//       updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
//     );

//     CREATE INDEX idx_articles_user_id ON articles (user_id);
//     CREATE INDEX idx_articles_created_at ON articles (created_at DESC);
//   `);
// };

// exports.down = (pgm) => {
//     pgm.sql('DROP TABLE IF EXISTS articles;');
// };

exports.up = (pgm) => {
    pgm.sql(`
    CREATE TABLE articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      article TEXT NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      category_id INTEGER NOT NULL,
      color_id INTEGER,
      flagged BOOLEAN NOT NULL DEFAULT false,
      flagged_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX idx_articles_user_id ON articles (user_id);
    CREATE INDEX idx_articles_created_at ON articles (created_at DESC);
  `);
};

exports.down = (pgm) => {
    pgm.sql('DROP TABLE IF EXISTS articles;');
};
