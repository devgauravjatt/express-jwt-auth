export const roleMiddleware = (roles = []) => {
  return (req, res, next) => { 
    if (!req.user || !roles.includes(req.user.role?.name)) {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado. No tienes permisos suficientes.",
      });
    }
    next();
  };
};
