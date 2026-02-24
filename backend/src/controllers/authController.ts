import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = []; // This should ideally be a database model

// Register User
export const register = async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store user in "database"
    users.push({ username, password: hashedPassword });

    res.status(201).send('User registered');
};

// Login User
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) return res.status(400).send('User not found');
    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).send('Invalid password');

    // Create JWT Token
    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
    res.json({ token });
};

// Logout User (Invalidate Token Example)
export const logout = (req, res) => {
    // For simplicity, just returning a message, JWT invalidation would be managed in practice
    res.send('User logged out');
};

// Middleware for session management (authenticate route)
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};