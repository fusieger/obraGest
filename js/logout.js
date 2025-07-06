document.addEventListener('DOMContentLoaded', () => {
//exibir e-mail do usuário
const email = sessionStorage.getItem('userEmail');
document.getElementById('username').textContent = email;

//logout
const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('userEmail');
      window.location.href = 'index.html';
    });
  }
});