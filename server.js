const express = require('express');
const fs = require('fs');


const app = express();
const port = 5173;

app.use(express.json());


app.post('/register', (req, res) => {
  const { name, username, password } = req.body;

  // Cargar usuarios existentes desde usuarios.json
  const usersPath = '/data/usuarios.json';
  const existingUsers = JSON.parse(fs.readFileSync(usersPath, 'utf-8')) || [];

  // Verificar si el nombre de usuario ya existe
  const usernameExists = existingUsers.some(user => user.username === username);

  if (usernameExists) {
    res.json({ success: false, message: 'El nombre de usuario ya está en uso. Por favor, elige otro.' });
    return;
  }

  // Agregar nuevo usuario
  const newUser = { name, username, password };
  existingUsers.push(newUser);

  // Guardar usuarios en usuarios.json
  fs.writeFileSync(usersPath, JSON.stringify(existingUsers, null, 2));

  res.json({ success: true, message: 'Usuario registrado exitosamente' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
s