// GET /api/admin/verify
exports.verifyAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ isAdmin: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ isAdmin: false });
    res.json({ isAdmin: true });
  } catch {
    res.status(401).json({ isAdmin: false });
  }
};
