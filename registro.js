function register() {
  const name = document.getElementById('name').value;
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  // Validar campos obligatorios
  if (!name || !username || !password) {
      console.error('Por favor, completa todos los campos.');
      return;
  }

  const newUser = { name, username, password };

  // Realizar una solicitud POST al servidor
  fetch('http://localhost:5173/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error de red: ${response.statusText}`);
      }
      return response.json();
  })
  .then(data => {
      Swal.fire({
          title: data.success ? 'Registro exitoso' : 'Error',
          text: data.message,
          icon: data.success ? 'success' : 'error',
          timer: 2500,
          showConfirmButton: false,
      }).then(() => {
          // Redirigir a la página de inicio de sesión después de mostrar la alerta
          window.location.href = 'inicio-sesion.html';
      });
  })
  .catch(error => {
      console.error('Error al realizar la solicitud:', error);
  });
}
