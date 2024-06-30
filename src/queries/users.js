const TABLE = 'users';

const findById = (id) => `SELECT * FROM ${TABLE} WHERE id = '${id}' LIMIT 1`;

const createUser = (data) => `
        INSERT INTO ${TABLE} (id, password, first_name, last_name)
        VALUES ('${data.id}', '${data.password}', '${data.first_name}', '${data.last_name}');
    `;

export { findById, createUser };
