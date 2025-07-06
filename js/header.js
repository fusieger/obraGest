async function loadHeader() {
  //injeta o HTML
  const resp = await fetch('header.html');
  const html  = await resp.text();
  document.getElementById('header-placeholder').innerHTML = html;

  //faz a checagem de sessão
  if (!sessionStorage.getItem('userEmail')) {
    window.location.href = 'index.html';
    return;
  }

  //preenche o nome de usuário se existir
  const uname = document.getElementById('username');
  if (uname) {
    uname.textContent = sessionStorage.getItem('userEmail');
  }

  //configura o botão logout
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      sessionStorage.removeItem('userEmail');
      window.location.href = 'index.html';
    });
  }
}

//dispara ao carregar
document.addEventListener('DOMContentLoaded', loadHeader);