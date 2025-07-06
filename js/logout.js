document.addEventListener('DOMContentLoaded', () => {
// Exibir e-mail do usuário
const email = sessionStorage.getItem('userEmail');
document.getElementById('username').textContent = email;

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('userEmail');
    window.location.href = 'index.html';
    });
});