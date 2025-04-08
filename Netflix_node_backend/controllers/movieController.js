const db = require('../db');

exports.get_movies = async (req, res) => {
    try {
        const [movies] = await db.query('SELECT * FROM movie');
        res.json(movies);
    }
    catch {
        res.status(500).json({error: 'Failed to fetch movies'});
    }
}