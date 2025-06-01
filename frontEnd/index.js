// Função de Cadastro
async function cadastrarUsuario() {
  const form = document.getElementById('formCadastro');
  const btn = form.querySelector('button');
  
  btn.disabled = true;
  btn.textContent = 'Processando...';

  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome.value,
        email: form.email.value,
        celular: form.celular.value,
        senha: form.senha.value
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      window.location.href = 'perfil.html';
    } else {
      alert(data.error || 'Erro no cadastro');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha na conexão com o servidor');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Cadastrar';
  }
}

// Adiciona evento ao formulário
document.getElementById('formCadastro')?.addEventListener('submit', (e) => {
  e.preventDefault();
  cadastrarUsuario();
});