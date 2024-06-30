const get = async (req, res, next) => {
  try {
    return res.json({ id: req.user.id });
  } catch (error) {
    next(error);
  }
};

export {
  get,
};
