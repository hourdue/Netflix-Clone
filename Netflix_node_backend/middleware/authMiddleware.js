const db = require('../db');

async function authenticate(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const [rows] = await db.query(`
    SELECT users.* FROM users
    JOIN auth_tokens ON users.id = auth_tokens.user_id
    WHERE auth_tokens.token = ?
  `, [token]);

  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  req.user = user;
  next();
}

module.exports = authenticate;
