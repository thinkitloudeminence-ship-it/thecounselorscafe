// ─── Success Response ──────────────────────────────────────────────────────
const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
    ...(data !== null && { data }),
  };
  return res.status(statusCode).json(response);
};

// ─── Error Response ────────────────────────────────────────────────────────
const sendError = (res, message = 'Error', statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
};

// ─── Paginated Response ────────────────────────────────────────────────────
const sendPaginated = (res, message, data, pagination) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

// ─── Get Pagination ──────────────────────────────────────────────────────
const getPagination = (page = 1, limit = 10, total = 0) => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  const totalPages = Math.ceil(total / perPage);
  const skip = (currentPage - 1) * perPage;

  return {
    pagination: {
      currentPage,
      perPage,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
    skip,
    limit: perPage,
  };
};

module.exports = { sendSuccess, sendError, sendPaginated, getPagination };