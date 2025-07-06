/*Autenticação*/

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const mensagemErro = document.getElementById('mensagemErro');

  //exemplo de dados(para teste)
  const credenciais = {
    email: 'admin@obragest.com',
    senha: '123456'
  };

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (email === credenciais.email && senha === credenciais.senha) {
      //autenticação bem sucedida: salva flag de sessão e redireciona
      sessionStorage.setItem('userEmail', email);
      window.location.href = 'dashboard.html';
    } else {
      //exibe mensagem de erro
      mensagemErro.textContent = 'E-mail ou senha inválidos.';
    }
  });
});
