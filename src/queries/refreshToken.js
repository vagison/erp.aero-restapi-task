const TABLE_NAME = 'refresh_tokens';

const createTable = () => `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id VARCHAR(36) NOT NULL,
    user VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 0,
    create_date DATETIME NULL,
    PRIMARY KEY (id),
    KEY FK_user (user),
    CONSTRAINT FK_user FOREIGN KEY (user) REFERENCES users (id) ON DELETE CASCADE
  );
`;

const findTokenById = (id) => `SELECT * FROM ${TABLE_NAME} WHERE id = '${id}' LIMIT 1`;

const findTokenByUserId = (userId) => `SELECT * FROM ${TABLE_NAME} WHERE user = '${userId}' LIMIT 1`;

const createToken = (data) => `
  INSERT INTO ${TABLE_NAME} (id, user, active, create_date)
  VALUES ('${data.id}', '${data.user}', ${data.active}, '${data.createDate}');
`;

const markTokenInactive = (id) => `UPDATE ${TABLE_NAME} SET active = 0 WHERE id = '${id}';`;

export {
  createTable,
  findTokenById,
  findTokenByUserId,
  createToken,
  markTokenInactive,
};
