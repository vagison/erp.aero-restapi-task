const TABLE = 'files';

const createFile = (data) => `
  INSERT INTO ${TABLE} (id, user_id, name, extension, mime_type, size, date_uploaded)
  VALUES ('${data.id}', '${data.userId}', '${data.name}', '${data.extension}', '${data.mimeType}', '${data.size}', '${data.dateUploaded}');
`;

const findFileById = (data) => `SELECT * FROM ${TABLE} WHERE user_id = '${data.userId}' AND id = '${data.id}' LIMIT 1`;

const findUserFiles = (data) => `
  SELECT * FROM ${TABLE} 
  WHERE user_id = '${data.userId}' 
  ORDER BY date_uploaded DESC
  LIMIT ${data.pagination.limit} OFFSET ${data.pagination.offset}
`;

const countUserFiles = (userId) => `SELECT COUNT(*) AS count FROM ${TABLE} WHERE user_id = '${userId}';`;

const removeFile = (data) => `DELETE FROM ${TABLE} WHERE user_id = '${data.userId}' AND id = '${data.id}'`;

const updateFile = (data) => `
  UPDATE ${TABLE}
  SET name = '${data.name}', extension = '${data.extension}', mime_type = '${data.mimeType}', size = '${data.size}', date_uploaded = '${data.dateUploaded}'
  WHERE user_id = '${data.userId}';
`;

export {
  createFile, findFileById, findUserFiles, countUserFiles, removeFile, updateFile,
};
