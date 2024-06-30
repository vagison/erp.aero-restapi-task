const TABLE = 'refresh_tokens';

const findTokenById = (id) => `SELECT * FROM ${TABLE} WHERE id = '${id}' LIMIT 1`;

const findTokenByUserId = (userId) => `SELECT * FROM ${TABLE} WHERE user = '${userId}' LIMIT 1`;

const createToken = (data) => `
  INSERT INTO ${TABLE} (id, user, active, create_date)
  VALUES ('${data.id}', '${data.user}', ${data.active}, '${data.createDate}');
`;

// const updateToken = (data) => `
//   UPDATE ${TABLE}
//   SET create_date = '${data.createDate}', active = ${data.active}
//   WHERE user = '${data.user}';
//   `;

const markTokenInactive = (id) => `UPDATE ${TABLE} SET active = 0 WHERE id = '${id}';`;

export {
  findTokenById,
  findTokenByUserId,
  createToken,
  // updateToken,
  markTokenInactive,
};
