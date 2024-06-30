const paginate = (req, defaultLimit = 10) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || defaultLimit;
  const offset = (page - 1) * limit;

  return { offset, limit, page };
};

const generatePaginatedRes = (data, { total, page, limit }) => {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      pages: totalPages,
    },
  };
};

export { paginate, generatePaginatedRes };
