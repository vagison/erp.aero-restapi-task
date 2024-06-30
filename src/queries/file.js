const TABLE = 'files';

const createFile = (data) => `
    INSERT INTO ${TABLE} (id, user_id, name, extension, mime_type, size, date_uploaded)
    VALUES ('${data.id}', '${data.userId}', '${data.name}', '${data.extension}', '${data.mimeType}', '${data.size}', '${data.dateUploaded}');
`;

const findFileById = (id) => `SELECT * FROM ${TABLE} WHERE id = '${id}' LIMIT 1`;

const findUserFiles = (data, page = 1, pageSize = 10) => `
    SELECT * FROM ${TABLE} 
    WHERE user_id = '${data.userId}' 
    ORDER BY date_uploaded DESC
    LIMIT ${data.pagination.limit} OFFSET ${data.pagination.offset}
`;

const countUserFiles = (userId) => `SELECT COUNT(*) AS count FROM ${TABLE} WHERE user_id = '${userId}';`;

export {
  createFile, findFileById, findUserFiles, countUserFiles,
};
