/*
--------------------------------------------------------------------------------------
Chamada da função para carregamento inicial dos dados
--------------------------------------------------------------------------------------
*/

const getList = async () => {
    let url = 'http://127.0.0.1:5000/processos';
    fetch(url, {
        method: 'get',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro ao obter os dados dos processos.');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Dados recebidos:', data); // Verifique os dados recebidos do servidor
        if (data && data.processos) {
            data.processos.forEach(process => {
                console.log('Processo:', process); // Verifique cada processo antes de inserir na tabela
                insertList(process.Num_processo, process.prazo, process.audiencia, process.status, process.processo_relacionado, process.patrono);
            });
        } else {
            console.error('Dados de processos não encontrados ou formato inválido.');
        }
    })
    .catch((error) => {
        console.error('Erro ao obter dados:', error); // Registre qualquer erro de requisição
    });
}

// // Chame a função para obter e listar os processos
// getList();

// const getList = async () => {
//     let url = 'http://127.0.0.1:5000/processos';
//     fetch(url, {
//     method: 'get',
//     })
//     .then((response) => response.json())
//     .then((data) => { console.log(data); // Verifique os dados retornados pela API
//     // Chame insertList com os dados obtidos
//         data.processos.forEach(process => insertList(process.num_processo, process.prazo, process.audiencia, process.status, process.processo_relacionado, process.patrono ))
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }
  
getList()
  
  
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
Função para remover um processo da lista de acordo com o click no botão close
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
Função para deletar um Processo da lista do servidor via requisição DELETE
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
Função para inserir processos na lista apresentada
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
