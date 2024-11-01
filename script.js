/**
 * Formulário de Endereço
 * @author Emmanuel L. Nogueira
 */

// Registrar o Service Worker >>>>>>>>>>>>>>>>>>>
// Se o Service Worker estiver disponível no navegador
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log("Service Worker registrado.")
        })
}

function buscarEndereco() {
    let cep = document.getElementById('cep').value;
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('logradouro').value = dados.logradouro || '';
            document.getElementById('bairro').value = dados.bairro || '';
            document.getElementById('cidade').value = dados.localidade || '';
            document.getElementById('uf').value = dados.uf || '';

            // Preencher o DDD automaticamente
            if (dados.ddd) {
                document.getElementById('ddd').value = dados.ddd;
            }
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error));
}


// Formatar CEP
function formatarCEP(input) {
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen
    }
    input.value = value;
}

// Formatar CPF
function formatarCPF(input) {
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) {
        value = value.substring(0, 11); // Limita a 11 dígitos
    }
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{2})$/, '-$1'); // Adiciona o hífen
    input.value = value;
}

// Formatar Celular
function formatarCelular(input) {
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3'); // Adiciona parênteses e hífen
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3'); // Adiciona parênteses e hífen
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})/, '($1) '); // Adiciona parênteses
    }
    input.value = value;
}

function verificarCampos() {
    const camposObrigatorios = [
        'nome', 'cpf', 'ddd', 'celular', 'cep',
        'logradouro', 'numero', 'numero', 'cidade', 'uf', 'bairro'
    ];
    let camposVazios = [];

    // Verifica se os campos obrigatórios estão preenchidos
    camposObrigatorios.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento.value.trim()) {
            camposVazios.push(campo);
            elemento.style.borderColor = 'red'; // Destaca o campo vazio
        } else {
            elemento.style.borderColor = ''; // Remove o destaque caso preenchido
        }
    });

    if (camposVazios.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    } else {
        alert('Todos os campos foram preenchidos corretamente!');
        // Aqui você pode adicionar a lógica para salvar os dados
    }
}