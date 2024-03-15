const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
