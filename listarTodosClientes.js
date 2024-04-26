 /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */


const getList = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(client => insertList(client.cpf, client.nome, client.telefone))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
  
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
  Função para remover um cliente da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
  
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpfCliente = div.getElementsByTagName('td')[0].innerHTML

      // removendo a máscara do cpf para deletar o cliente do banco de dados.
      let cpfRemoveString = cpfCliente.toString()
      let cpfFormat = cpfRemoveString.replace (/\.|-/gm,'')
      let cpfClean = parseFloat(cpfFormat)

      // confirmação da remoção.
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteCliente(cpfClean)
        alert("Cliente foi pro espaço!")
      }
    }
  }
}
  
/*
  --------------------------------------------------------------------------------------
  Função para deletar um cliente da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
  
const deleteCliente = (client) => {
  let url = 'http://127.0.0.1:5000/cliente?cpf=' + client;
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
  
const insertList = (cpf, nome, telefone) => {
  // Convertendo CPF e telefone para string
  cpf = cpf.toString();
  telefone = telefone.toString();

  // Formatação do CPF e telefone
  const cpfFormat = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  const telefoneFormat = telefone.replace(/(\d{2})(\d{4,5})(\d{4})/g, "($1) $2 - $3");
  
  // Verificar o tipo de dados para o telefone
  console.log(typeof telefone);

  // Criando uma nova linha na tabela
  const table = document.getElementById('myTable');
  const row = table.insertRow();
  
  // Inserindo os dados na linha da tabela
  const cellCPF = row.insertCell(0);
  const cellNome = row.insertCell(1);
  const cellTelefone = row.insertCell(2);
  
  cellCPF.textContent = cpfFormat;
  cellNome.textContent = nome;
  cellTelefone.textContent = telefoneFormat;
  
  // Adicionando botão de remoção
  insertButton(row.insertCell(3));
  
  // Limpar os campos do formulário após a inserção
  document.getElementById("newCPF").value = "";
  document.getElementById("newNome").value = "";
  document.getElementById("newTelefone").value = "";
  
  // Remover mensagem de lista vazia, se houver
  removeElement();
}
  