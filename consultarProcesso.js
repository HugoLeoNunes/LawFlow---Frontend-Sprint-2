/*
--------------------------------------------------------------------------------------
Função para obter a lista existente do servidor via requisição GET
--------------------------------------------------------------------------------------
*/

const getProcesso = async (processoInput) => {

    // Remover caracteres não numéricos do Processo digitado
    
    let numProcessoFormat = processoInput.replace (/\D/g, '');
      
    let url = 'http://127.0.0.1:5000/processo?num_processo=' + numProcessoFormat;
    console.log('URL:', url);
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao obter os clientes');
    }
    const data = await response.json();
    
    console.log('Clientes da API:', data);
    
    insertList(data.num_processo, data.prazo, data.audiencia, data.status, data.processo_relacionado, data.patrono);

    } catch (error) {
        console.error('Erro:', error);
    }
}
  
  
  
/*
--------------------------------------------------------------------------------------
Função para criar um botão close para cada item da lista
--------------------------------------------------------------------------------------
*/
  
const insertButton = (parent) => {
let span = document.createElement("span");
let txt = document.createTextNode("\u00D7");
span.className = "close";
span.appendChild(txt);
parent.appendChild(span);
}
  
/*
--------------------------------------------------------------------------------------
Função para remover um cliente da lista de acordo com o click no botão close
--------------------------------------------------------------------------------------
*/
  
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const numProcesso = div.getElementsByTagName('td')[0].innerHTML
    
        // removendo a máscara do número do processo para deletar o processo do banco de dados.
        let processoRemoveString = numProcesso.toString()
        let numProcessoFormat = processoRemoveString.replace (/\D/g, '')
        let processoClean = parseFloat(numProcessoFormat)
    
        // confirmação da remoção.
        if (confirm("Você tem certeza?")) {
            div.remove()
            deleteProcesso(processoClean)
            alert("Processo incinerado digitalmente!")
        }
        }
    }
}
  
/*
--------------------------------------------------------------------------------------
Função para deletar um cliente da lista do servidor via requisição DELETE
--------------------------------------------------------------------------------------
*/
  
const deleteProcesso = (process) => {
    let url = 'http://127.0.0.1:5000/processo?num_processo=' + process;
    fetch(url, {
        method: 'delete'
    })
    .then((response) => response.json())
    .catch((error) => {
    console.error('Error:', error);
    });
}

  
/*
--------------------------------------------------------------------------------------
Função para inserir clientes na lista apresentada
--------------------------------------------------------------------------------------
*/


const insertList = (num_processo, prazo, audiencia, status, processo_relacionado, patrono) => { console.log('Dados recebidos:', num_processo, prazo, audiencia, status, processo_relacionado, patrono);
    
    
    // Formatação do Número do Processo 

    const numProcessoFormat = num_processo.replace( /(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/g, "$1-$2.$3.$4.$5.$6");

    // Criando uma nova linha na tabela
    const table = document.getElementById('myTable');
    const row = table.insertRow();

    // Inserindo os dados na linha da tabela
    const cellProccesso = row.insertCell(0);
    const cellPrazo = row.insertCell(1);
    const cellAudiencia = row.insertCell(2);
    const cellStatus = row.insertCell(3);
    const cellProcessoRelacionado = row.insertCell(4);
    const cellPatrono = row.insertCell(5);

    cellProccesso.textContent = numProcessoFormat;
    cellPrazo.textContent = prazo;
    cellAudiencia.textContent = audiencia;
    cellStatus.textContent = status;
    cellProcessoRelacionado.textContent = processo_relacionado;
    cellPatrono.textContent = patrono;

    // Adicionando botão de remoção
    insertButton(row.insertCell(6));
    
    // Sumindo com os dados adicionados nos campos iniciais.
    document.getElementById("num_processo").value = "";
    document.getElementById("prazo").value = "";
    document.getElementById("audiencia").value = "";
    document.getElementById("status").value = "";
    document.getElementById("processo_relacionado").value = "";
    document.getElementById("patrono").value = ""

    // Remover mensagem de lista vazia, se houver
    removeElement()
}
