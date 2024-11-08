function salvarDados() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    const biotipo = document.getElementById("biotipo").value;
    const tipo = document.getElementById("tipo").value;
    const frequencia = document.getElementById("frequencia").value;
    const objetivo = document.getElementById("objetivo").value;

    const dados = {
        nome,
        idade,
        altura,
        peso,
        biotipo,
        tipo,
        frequencia,
        objetivo
    };

    localStorage.setItem("dadosUsuario", JSON.stringify(dados));
}
