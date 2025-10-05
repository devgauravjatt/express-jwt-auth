// src/middlewares/error.middleware.js

export const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error global:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
};
