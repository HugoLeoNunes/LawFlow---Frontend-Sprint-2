/*
  --------------------------------------------------------------------------------------
  Função para colocar um processo na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
  
const postProcesso = async (inputNumProcesso, inputPrazo, inputAudiencia, inputstatus, inputProcessoRelacionado, inputPatrono) => 
{

  const formData = new FormData();
  formData.append('num_processo', inputNumProcesso);
  formData.append('prazo', inputPrazo);
  formData.append('audiencia', inputAudiencia);
  formData.append('status', inputstatus);
  formData.append('processo_relacionado', inputProcessoRelacionado);
  formData.append('patrono', inputPatrono)


  let url = 'http://127.0.0.1:5000/processo';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.status == 200) {
        insertList(inputNumProcesso, inputPrazo, inputAudiencia, inputstatus, inputProcessoRelacionado, inputPatrono)
        alert("Processo adicionado!")
      } else {
        alert ("Já existe um processo cadastrado com este Número")
      }
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
--------------------------------------------------------------------------------------
Função para adicionar um novo Processo com numero do processo, prazo, audiência e demais campos.
--------------------------------------------------------------------------------------
*/

const newProcesso = () => {
  let inputNumProcesso = document.getElementById("num_processo").value;
  let inputPrazo = document.getElementById("prazo").value;
  let inputAudiencia = document.getElementById("audiencia").value;
  let inputstatus = document.getElementById("status").value;
  let inputProcessoRelacionado = document.getElementById("processo_relacionado").value;
  let inputPatrono = document.getElementById("patrono").value
  

  if (inputNumProcesso === '') {
    alert("Escreva o número do Processo!");
  } else if (isNaN(inputNumProcesso)) {
    alert("Número do Processo precisa ser números!");
  } else {
    postProcesso(inputNumProcesso, inputPrazo, inputAudiencia, inputstatus, inputProcessoRelacionado, inputPatrono)
  }
}

/*
--------------------------------------------------------------------------------------
Função para inserir Processos na lista apresentada
--------------------------------------------------------------------------------------
*/

const insertList = (num_processo, prazo, audiencia, status, processo_relacionado, patrono) => {
  
  var process = [num_processo, prazo, audiencia, status, processo_relacionado, patrono]

  let ProcessoDoBanco = process[0];
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  var clean = parseFloat(ProcessoDoBanco[0])


  for (var i = 0; i < process.length; i++) {
    var cel = row.insertCell(i);
    // Aplicando máscara no CPF e telefone do processe
    let numProcessoString = ProcessoDoBanco.toString()
    var numProcessoFormat = numProcessoString.replace( /(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/g, "$1-$2.$3.$4.$5.$6")
    process[0] = `${numProcessoFormat}`
    cel.textContent = process[i];
  }
  // retornando o cpf para float.
  process[0] = clean
  insertButton(row.insertCell(-1))
  // Sumindo com os dados adicionados nos campos iniciais.
  document.getElementById("num_processo").value = "";
  document.getElementById("prazo").value = "";
  document.getElementById("audiencia").value = "";
  document.getElementById("status").value = "";
  document.getElementById("processo_relacionado").value = "";
  document.getElementById("patrono").value = ""

  removeElement()
}