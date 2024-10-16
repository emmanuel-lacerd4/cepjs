const dddMap = {
    'AC': '68',
    'AL': '82',
    'AP': '96',
    'AM': '92',
    'BA': '71',
    'CE': '85',
    'DF': '61',
    'ES': '27',
    'GO': '62',
    'MA': '98',
    'MT': '65',
    'MS': '67',
    'MG': '31',
    'PA': '91',
    'PB': '83',
    'PR': '41',
    'PE': '81',
    'PI': '86',
    'RJ': '21',
    'RN': '84',
    'RS': '51',
    'RO': '69',
    'RR': '95',
    'SC': '48',
    'SP': '11',
    'SE': '79',
    'TO': '63',
};

function buscarEndereco() {
    let cep = document.getElementById('cep').value;
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('logradouro').value = dados.logradouro;
            document.getElementById('bairro').value = dados.bairro;
            document.getElementById('cidade').value = dados.localidade;
            document.getElementById('uf').value = dados.uf;

            // Atribuir o DDD com base no estado
            const uf = dados.uf;
            document.getElementById('ddd').value = dddMap[uf] || '';
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