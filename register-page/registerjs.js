document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.background-glow');
    glows.forEach(glow => {
        const speed = 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        glow.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

function validatePasswordFields(password, confirmPassword) {
    const errors = [];

    // 1. Check if passwords match
    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
    }

    // 2. Check length (at least 8 characters)
    if (password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres.");
    }

    // 3. Check for security (uppercase, lowercase, number, special character)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (!hasUppercase) {
        errors.push("La contraseña debe contener al menos una letra mayúscula.");
    }
    if (!hasLowercase) {
        errors.push("La contraseña debe contener al menos una letra minúscula.");
    }
    if (!hasNumber) {
        errors.push("La contraseña debe contener al menos un número.");
    }
    if (!hasSpecialChar) {
        errors.push("La contraseña debe contener al menos un carácter especial.");
    }

    if (errors.length > 0) {
        // You might want to display these errors to the user
        console.error("Errores de validación de contraseña:", errors);
        return false;
    }

    return true;
}

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const confirmPassword = document.getElementById('password-confirm').value;
    validatePasswordFields(password, confirmPassword);
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;

    const modal = document.getElementById('errorModal');
    const modalMessage = document.getElementById('errorMessage');
    const closeBtn = document.querySelector('.close-button');

    // Basic Validation
    if (!validatePasswordFields(password, confirmPassword)) {
        modalMessage.innerText = "Por favor verifica los requisitos de la contraseña.";
        modal.style.display = "block";
        return;
    }

    // Check if user exists
    const userKey = `user_${email}`;
    if (localStorage.getItem(userKey)) {
        modalMessage.innerText = "El correo electrónico ya está registrado.";
        modal.style.display = "block";
        return;
    }

    // Save user
    const user = {
        name,
        lastname,
        phone,
        email,
        password
    };

    localStorage.setItem(userKey, JSON.stringify(user));

    // Success feedback
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    window.location.href = '../login-page/login.html';
});

// Modal Close Logic
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('errorModal').style.display = "none";
});

window.onclick = function (event) {
    const modal = document.getElementById('errorModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
