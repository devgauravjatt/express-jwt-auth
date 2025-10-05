export const roleMiddleware = (roles = []) => {
  return (req, res, next) => { 
    console.log(req.user.role?.name); // <-- usa el alias correcto
    if (!req.user || !roles.includes(req.user.role?.name)) {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado. No tienes permisos suficientes.",
      });
    }
    next();
  };
};
