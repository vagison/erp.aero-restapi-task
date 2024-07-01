const TABLE_NAME = 'users';

const createTable = () => `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  );
`;

const findById = (id) => `SELECT * FROM ${TABLE_NAME} WHERE id = '${id}' LIMIT 1`;

const createUser = (data) => `
  INSERT INTO ${TABLE_NAME} (id, password)
  VALUES ('${data.id}', '${data.password}');
`;

export { createTable, findById, createUser };
