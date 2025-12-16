document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.background-glow');
    glows.forEach(glow => {
        const speed = 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        glow.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

document.getElementById('resetForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    if (!email) return;

    // Simulate network request
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
        alert(`Hemos enviado un enlace de recuperación a: ${email}`);
        btn.innerText = "¡Enviado!";

        // Optional: redirect back to login
        setTimeout(() => {
            window.location.href = '../login-page/login.html';
        }, 1500);
    }, 1500);
});
