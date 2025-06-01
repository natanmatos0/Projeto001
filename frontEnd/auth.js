document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = e.target.querySelector('button');
            btn.disabled = true;
            btn.textContent = 'Processando...';

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: document.getElementById('nomeCompleto').value,
                        email: document.getElementById('emailUsuario').value,
                        celular: document.getElementById('celular').value,
                        senha: document.getElementById('senhaUsuario').value
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
        });
    }
});