document.addEventListener("DOMContentLoaded", function() {
    const dados = JSON.parse(localStorage.getItem("dadosUsuario"));

    if (!dados) {
        alert("Nenhum dado encontrado. Por favor, preencha o formulário na página anterior.");
        window.location.href = "index.html";
        return;
    }

    const { nome, idade, altura, peso, biotipo, tipo, frequencia, objetivo } = dados;

    const data = new Date();
    const dataAtual = data.toLocaleDateString();
    const horaAtual = data.toLocaleTimeString();

    // Calcular IMC
    const alturaEmMetros = altura / 100;
    const imc = (peso / (alturaEmMetros * alturaEmMetros)).toFixed(2);
    let classificacaoIMC = "";

    if (imc < 18.5) {
        classificacaoIMC = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacaoIMC = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        classificacaoIMC = "Sobrepeso";
    } else {
        classificacaoIMC = "Obesidade";
    }

    // Lógica para criar o treino e alimentação baseado nas variáveis
    let treino = "";
    let alimentacao = "";
    let duracao = "";
    let suplementos = "";

    if (frequencia === "1-2 vezes por semana") {
        treino = "Agachamento, Supino, Levantamento Terra, Remada Curvada, Flexões.";
        duracao = "Mínimo 2 horas.";
    } else if (frequencia === "3-4 vezes por semana") {
        treino = "A - Peito/Tríceps, B - Costas/Bíceps, C - Pernas/Ombros.";
        duracao = "Mínimo 1 hora.";
    } else if (frequencia === "5-6 vezes por semana") {
        treino = "A - Peito, B - Costas, C - Pernas, D - Ombros, E - Braços.";
        duracao = "Mínimo 30 minutos.";
    }

    if (tipo === "funcional") {
        treino += " Inclua exercícios funcionais como burpees, kettlebell swings e abdominais.";
    } else if (tipo === "maquinario") {
        treino += " Utilize máquinas como leg press, peck deck e extensora.";
    } else if (tipo === "pesoLivre") {
        treino += " Inclua exercícios com halteres e barras, como levantamento terra e agachamento livre.";
    } else if (tipo === "cardio") {
        treino += " Adicione corrida, ciclismo ou remo.";
    } else if (tipo === "hit") {
        treino += " Faça treinos intervalados de alta intensidade, como sprints e circuitos.";
    }

    if (biotipo === "ectomorfo") {
        alimentacao = "Foco em alto consumo calórico com proteínas magras, carboidratos complexos e gorduras saudáveis.";
        suplementos = "Suplementos recomendados: Whey Protein, Creatina, BCAAs.";
    } else if (biotipo === "mesamorfo") {
        alimentacao = "Dieta balanceada com proteínas, carboidratos e gorduras em proporções equilibradas.";
        suplementos = "Suplementos recomendados: Whey Protein, Creatina, Multivitamínico.";
    } else if (biotipo === "endomorfo") {
        alimentacao = "Dieta baixa em carboidratos simples e alta em proteínas e fibras.";
        suplementos = "Suplementos recomendados: Whey Protein, Termogênico, L-Carnitina.";
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h2>Treino Ideal para ${nome}</h2>
        <p><strong>Data:</strong> ${dataAtual}</p>
        <p><strong>Hora:</strong> ${horaAtual}</p>
        <p><strong>Biotipo:</strong> ${biotipo}</p>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Frequência:</strong> ${frequencia}</p>
        <p><strong>Objetivo:</strong> ${objetivo}</p>
        <p><strong>IMC:</strong> ${imc} (${classificacaoIMC})</p>
        <p><strong>Motivação Diária:</strong> Mantenha-se focado e nunca desista! 💪</p>
        <h2>Detalhes do Treino</h2>
        <p><strong>Exercícios:</strong> ${treino}</p>
        <p><strong>Duração:</strong> ${duracao}</p>
        <p><strong>Alimentação:</strong> ${alimentacao}</p>
        <p><strong>Suplementos:</strong> ${suplementos}</p>
        <h3>Feedback de Progresso</h3>
        <textarea id="feedback" rows="4" cols="50" placeholder="Como foi seu treino?"></textarea>
        <button type="button" onclick="salvarFeedback('${dataAtual}', '${horaAtual}')">Salvar Feedback</button>
    `;
});

function salvarFeedback(data, hora) {
    const feedback = document.getElementById("feedback").value;
    if (!feedback) {
        alert("Por favor, insira seu feedback.");
        return;
    }
    let historico = JSON.parse(localStorage.getItem("historicoTreinos"));
    if (!historico) {
        historico = [];
    }
    historico.push({ data, hora, feedback });
    localStorage.setItem("historicoTreinos", JSON.stringify(historico));
    alert("Feedback salvo com sucesso!");
}

function voltar() {
    window.location.href = "index.html";
}

