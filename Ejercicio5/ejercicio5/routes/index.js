const express = require('express');
const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
  const messages = {
    success: "Bienvenido a la página principal"
  };
  res.render('index', { messages });
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'usuario' && password === '1234') {
    req.session.isAuthenticated = true;
    res.redirect('/restricted');
  } else {
    res.render('login', { error: "Usuario o contraseña incorrectos" });
  }
});

// Página restringida (solo accesible si el usuario ha hecho login)
router.get('/restricted', (req, res) => {
  if (req.session.isAuthenticated) {
    res.render('restricted');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;


