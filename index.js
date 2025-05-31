function logar() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    if (email == "" || senha == "") {
        window.alert("Preencha ambos os campos")
    }
    else if (email == ce && senha == cs) {
        window.alert("Login efetuado com sucesso")
    }
    else {
        window.alert("E-mail ou senha incorretos")
    }
}
function cadastrarUsuario() {
    const nomeCompleto = document.getElementById("nomeCompleto").value.trim()
    const emailUsuario = document.getElementById("emailUsuario").value.trim()
    const celularUsuario = document.getElementById("celular").value.trim()
    const senhaUsuario = document.getElementById("senhaUsuario").value.trim()

    if (nomeCompleto == "" || emailUsuario == "" || celularUsuario == "" || senhaUsuario == "" ){
        window.alert("Preencha todos os campos")
    } 
    else{

    }

}