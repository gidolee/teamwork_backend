exports.up = (pgm) => {
    pgm.sql(`
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id INTEGER;
  `);
};

exports.down = (pgm) => {
    pgm.sql('ALTER TABLE articles DROP COLUMN IF EXISTS category_id;');
};
