const TABLE_NAME = 'bearer_tokens';

const createTable = () => `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(36) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 0
  );
`;

const findTokenById = (id) => `SELECT * FROM ${TABLE_NAME} WHERE id = '${id}' LIMIT 1`;

const createToken = (data) => `
INSERT INTO ${TABLE_NAME} (id, refresh_token, active)
VALUES ('${data.bearerToken}', '${data.refreshToken}', 1);
`;

const markTokensInactiveByRefreshTokenId = (id) => `UPDATE ${TABLE_NAME} SET active = 0 WHERE refresh_token = '${id}';`;

export {
  createTable,
  findTokenById,
  createToken,
  markTokensInactiveByRefreshTokenId,
};
