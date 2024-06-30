const TABLE = 'files';

const createFile = (data) => `
    INSERT INTO ${TABLE} (id, user_id, name, extension, mime_type, size, date_uploaded)
    VALUES ('${data.id}', '${data.userId}', '${data.name}', '${data.extension}', '${data.mimeType}', '${data.size}', '${data.dateUploaded}');
`;

const findFileById = (id) => `SELECT * FROM ${TABLE} WHERE id = '${id}' LIMIT 1`;

const findUserFiles = (userId) => `SELECT * FROM ${TABLE} WHERE user_id = '${userId}' LIMIT 1`;

export { createFile, findFileById, findUserFiles };
