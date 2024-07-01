const TABLE_NAME = 'files';

const createTable = () => `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NULL,
    name VARCHAR(255) NULL,
    extension VARCHAR(20) NULL,
    mime_type VARCHAR(100) NULL,
    size BIGINT NULL,
    date_uploaded DATETIME NULL,
    PRIMARY KEY (id),
    KEY FK_user_id (user_id),
    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
`;

const createFile = (data) => `
  INSERT INTO ${TABLE_NAME} (id, user_id, name, extension, mime_type, size, date_uploaded)
  VALUES ('${data.id}', '${data.userId}', '${data.name}', '${data.extension}', '${data.mimeType}', '${data.size}', '${data.dateUploaded}');
`;

const findFile = (data) => `SELECT * FROM ${TABLE_NAME} WHERE user_id = '${data.userId}' AND id = '${data.id}' LIMIT 1`;

const findUserFiles = (data) => `
  SELECT * FROM ${TABLE_NAME} 
  WHERE user_id = '${data.userId}' 
  ORDER BY date_uploaded DESC
  LIMIT ${data.pagination.limit} OFFSET ${data.pagination.offset}
`;

const countUserFiles = (userId) => `SELECT COUNT(*) AS count FROM ${TABLE_NAME} WHERE user_id = '${userId}';`;

const removeFile = (data) => `DELETE FROM ${TABLE_NAME} WHERE user_id = '${data.userId}' AND id = '${data.id}'`;

const updateFile = (data) => `
  UPDATE ${TABLE_NAME}
  SET name = '${data.name}', extension = '${data.extension}', mime_type = '${data.mimeType}', size = '${data.size}', date_uploaded = '${data.dateUploaded}'
  WHERE user_id = '${data.userId}';
`;

export {
  createTable, createFile, findFile, findUserFiles, countUserFiles, removeFile, updateFile,
};
