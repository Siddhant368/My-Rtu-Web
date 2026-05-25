const isAdmin = (req, res, next) => {

  // TOKEN CHECK
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // ROLE CHECK
  const role = req.headers.role;

  if (role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only"
    });
  }

  next();
};

export default isAdmin;