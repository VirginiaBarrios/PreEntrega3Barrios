function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Lógica de verificación con los datos del archivo JSON
    fetch('/data/usuarios.json')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                // Usuario autenticado
                document.getElementById('error-message').innerText = '';
                Swal.fire({
                    title: "Inicio de sesión exitoso",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Redirigir a la página de inicio después de mostrar la alerta
                    window.location.href = '../index.html';
                });
            } else {
                // Usuario no autenticado
                document.getElementById('error-message').innerText = 'Credenciales incorrectas. Intenta de nuevo.';
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de usuario:', error);
        });
}


