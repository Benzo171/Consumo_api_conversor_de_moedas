// ===== PEGANDO OS ELEMENTOS DO HTML =====

const inputValor = document.getElementById('valor')
const selectOrigem = document.getElementById('moeda-origem')
const selectDestino = document.getElementById('moeda-destino')
const btnInverter = document.getElementById('btn-inverter')
const btnConverter = document.getElementById('btn-converter')
const divResultado = document.getElementById('resultado')

// Como chamar a API
async function converter(){
   
    // 1. Pega os valores que o usuário digitou/selecionou
  const valor = inputValor.value
  const origem = selectOrigem.value
  const destino = selectDestino.value

  // 2. Validação básica
  if (!valor || valor <= 0) {
    divResultado.innerHTML = '<p class="erro">Digite um valor válido.</p>'
    return
  }

  // 3. Mostra mensagem de carregando enquanto busca
  divResultado.innerHTML = '<p class="carregando">Buscando cotação...</p>'

  // 4. Tenta chamar a API (try/catch captura erros)
  try {

    // Monta a URL com os parâmetros escolhidos pelo usuário
    const url = `https://api.frankfurter.dev/v2/rates?base=${origem}&quotes=${destino}`

    // Faz a requisição para a API
    const resposta = await fetch(url)

    // Converte a resposta para JSON
    const dados = await resposta.json()

    // 5. Pega a taxa de câmbio do JSON retornado
    const taxa = dados[0].rate
    const data = dados[0].date

    // 6. Calcula o valor convertido
    const resultado = (valor * taxa).toFixed(2)

    // 7. Exibe o resultado no HTML
    divResultado.innerHTML = `
    <div>
        <p class="valor-convertido">${resultado} ${destino}</p>
        <p class="taxa-info">1 ${origem} = ${taxa} ${destino}</p>
        <p class="taxa-info">Atualizado em: ${data}</p>
    </div>
    `

  } catch (erro) {
    // Se algo der errado, mostra mensagem de erro
    divResultado.innerHTML = '<p class="erro">Erro ao buscar cotação. Tente novamente.</p>'
    console.error(erro)
  }
}


// ===== FUNÇÃO DE INVERTER MOEDAS =====
function inverter() {
  const temp = selectOrigem.value
  selectOrigem.value = selectDestino.value
  selectDestino.value = temp
}


// ===== OUVINDO OS CLIQUES DOS BOTÕES =====
btnConverter.addEventListener('click', converter)
btnInverter.addEventListener('click', inverter)
