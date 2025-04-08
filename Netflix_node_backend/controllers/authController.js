const db = require('../db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken();
    await db.query('INSERT INTO auth_tokens (user_id, token) VALUES (?, ?)', [user.id, token]);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.auth_token;
  if (token) {
    await db.query('DELETE FROM auth_tokens WHERE token = ?', [token]);
    res.clearCookie('auth_token');
  }
  res.json({ message: 'Logged out' });
};
