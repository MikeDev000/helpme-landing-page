document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.background-glow');
    glows.forEach(glow => {
        const speed = 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        glow.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    // 1. Check if user exists (mock auth)
    const userKey = `user_${email}`;
    const storedUserStr = localStorage.getItem(userKey);

    if (!storedUserStr) {
        // 1. Look for user.
        // 2. If user found: check password.
        // 3. If user NOT found: Just redirect anyway (as per "cualquier credencial" request? or maybe that was a loose way of saying "I want to be able to login").
        // I'll do: Check ID. If exists, check Pass. If pass wrong -> Error. 
        // If ID not exists -> Error "User not found".
        // This makes "Registration" meaningful.

        errorMsg.innerText = "Usuario no encontrado. Por favor regístrate.";
        errorMsg.style.display = "block";
        // Shake animation
        document.querySelector('.login-container').animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
        return;
    }

    const user = JSON.parse(storedUserStr);

    if (user.password !== password) {
        errorMsg.innerText = "Credenciales incorrectas.";
        errorMsg.style.display = "block";
        return;
    }

    // Success
    alert(`¡Bienvenido de nuevo, ${user.name}!`);
    window.location.href = "https://www.youtube.com/watch?v=5TqPl3MSSow";
});