const pool = require('./config/db');

async function test() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Connexion OK :', rows[0].result);
  } catch (err) {
    console.error('Erreur de connexion :', err);
  }
}

test();
