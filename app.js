let amigos = [];
let amigosDisponiveis = [];
let amigosSorteados = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value.trim();
    
    if (!nome) {
        alert('Por favor, digite um nome válido!');
        return;
    }
    
    if (!amigos.includes(nome)) {
        amigos.push(nome);
        amigosDisponiveis.push(nome);
    }
    
    inputAmigo.value = '';
    atualizarListaAmigos();
    inputAmigo.focus();
}

function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join('');
}

function sortearAmigo() {
    // Verifica se há amigos para sortear
    if (amigosDisponiveis.length === 0) {
        if (amigos.length === 0) {
            alert('Adicione amigos antes de sortear!');
            return;
        }
        
        // Limpa completamente os dados e recarrega
        const confirmar = confirm('Todos já foram sorteados! Deseja reiniciar?');
        if (confirmar) {
            location.reload();
        }
        return;
    }

    // Sorteia e atualiza listas
    const indice = Math.floor(Math.random() * amigosDisponiveis.length);
    const sorteado = amigosDisponiveis[indice];
    
    amigosDisponiveis.splice(indice, 1);
    amigosSorteados.push(sorteado);

    // Exibe resultado temporário
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>O seu amigo secreto é: <strong>${sorteado}</strong></li>`;

    // Limpa após 5 segundos sem mostrar histórico
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 1000);
}

// Evento para tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') adicionarAmigo();
});
