document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("but");
    const divh = document.getElementById("loginArea");
    const textInput = document.getElementById("textInput");
    const textSenha = document.getElementById("textsenha")
    const loginMessage = document.getElementById("loginMessage");

    textInput.classList.add("hidden-input");
    textSenha.classList.add("hidden-input");    
    divh.classList.add("hidden");

    button.addEventListener("click", function() {
        divh.classList.toggle("hidden");
        textSenha.classList.add("hidden-input"); 
        if(divh.classList.contains("hidden")) {
            loginMessage.textContent = "";
            textInput.classList.add("hidden-input");
        } else {
            loginMessage.textContent = "Faça cadastro do seu estacionamento:";
            textInput.classList.remove("hidden-input");
            textInput.placeholder = "Digite aqui...";
        }
    });

    function ProcuraEstacionamento() {
        divh.classList.remove("hidden");
        loginMessage.textContent = "Procurando estacionamentos próximos...";
        textInput.classList.add("hidden-input");
        textSenha.classList.add("hidden-input"); 
    }

    function Login() {
        divh.classList.remove("hidden");
        loginMessage.textContent = "Informe seu email e senha:";
        textInput.classList.remove("hidden-input");
        textSenha.classList.remove("hidden-input");
        textInput.placeholder = "Email";
        textSenha.placeholder = "senha"
        textInput.type = "text"; 
        textSenha.type = "password"
    }

    function CadastroUsuario() {
        textSenha.classList.add("hidden-input"); 
        divh.classList.remove("hidden");
        loginMessage.textContent = "Crie sua conta";
        textInput.classList.remove("hidden-input");
        textInput.placeholder = "Nome, email, senha...";
        textInput.type = "text";
    }

    function sair() {
        divh.classList.add("hidden");
        loginMessage.textContent = "";
        textInput.classList.add("hidden-input");
    }

    // Exporta as funções para o escopo global
    window.ProcuraEstacionamento = ProcuraEstacionamento;
    window.Login = Login;
    window.CadastroUsuario = CadastroUsuario;
    window.sair = sair;
});