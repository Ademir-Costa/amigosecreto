let usuarioAtual = '';
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
        atualizarDropdown(); 
    }
    
    inputAmigo.value = '';
    atualizarListaAmigos();
    inputAmigo.focus();
}

function atualizarDropdown() {
    const dropdown = document.getElementById('selecionarAmigo');
    dropdown.innerHTML = '<option value="">Selecione seu nome aqui</option>';
    
    amigos.forEach(amigo => {
        const option = document.createElement('option');
        option.value = amigo;
        option.textContent = amigo;
        dropdown.appendChild(option);
    });
}


function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join('');
}
function sortearAmigo() {
    usuarioAtual = document.getElementById('selecionarAmigo').value;
    
    if (!usuarioAtual) {
        alert('Selecione seu nome antes de sortear!');
        return;
    }
    
    // Filtra amigos disponíveis excluindo o usuário atual
    const listaFiltrada = amigosDisponiveis.filter(nome => nome !== usuarioAtual);
    
    if (listaFiltrada.length === 0) {
        if (amigos.length < 2) {
            alert('Adicione pelo menos mais um amigo!');
            return;
        }
        // Limpa completamente os dados e recarrega
        const confirmar = confirm('Todos já foram sorteados! Deseja reiniciar?');
        if (confirmar) {
            location.reload();
        }
        return;  
    }

    const indice = Math.floor(Math.random() * listaFiltrada.length);
    const sorteado = listaFiltrada[indice];
    
    // Remove o sorteado da lista geral
    const indiceOriginal = amigosDisponiveis.indexOf(sorteado);
    amigosDisponiveis.splice(indiceOriginal, 1);
    amigosSorteados.push(sorteado);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>Seu amigo secreto é: <strong>${sorteado}</strong></li>`;

    setTimeout(() => resultado.innerHTML = '', 5000);
}
    // Sorteia e atualiza listas
    const indice = Math.floor(Math.random() * amigosDisponiveis.length);
    const sorteado = amigosDisponiveis[indice];
    
    amigosDisponiveis.splice(indice, 1);
    amigosSorteados.push(sorteado);

    
    // Limpa após 3 segundos sem mostrar histórico
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 3000);

// Evento para tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') adicionarAmigo();
});
