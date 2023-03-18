exports.pagination = (req) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 1;
  const endIndex = startIndex + limit - 1;
  const offset = (parseInt(req.params?.page) - 1) * limit || 0;
  return {
    limit,
    startIndex,
    endIndex,
    offset,
    page: req.params?.page,
  };
};
