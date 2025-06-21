/*Autenticação*/

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
  .then(response => response.json())
  .then(data => {
    if (data.sucesso) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("mensagemErro").textContent = "E-mail ou senha inválidos.";
    }
  })
  .catch(() => {
    document.getElementById("mensagemErro").textContent = "Erro ao conectar com o servidor.";
  });
});
