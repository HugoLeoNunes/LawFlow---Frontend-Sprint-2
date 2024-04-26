
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/

//getList()

    
/*
--------------------------------------------------------------------------------------
Função para obter a lista existente do servidor via requisição GET
--------------------------------------------------------------------------------------
*/


// const getCliente = async (cpfInput) => {

//   // Remover caracteres não numéricos do CPF digitado
  
//   const cpf = parseInt(cpfInput.replace(/\D/g, ''), 10); // Convertendo para número inteiro
    
//     let url = 'http://127.0.0.1:5000/clientes';
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Erro ao obter os clientes');
//       }
//       const data = await response.json();
      
//       console.log('Clientes da API:', data.clientes);
  
//       const filteredClients = data.clientes.filter(client => parseInt(client.cpf) === cpf); // Convertendo para número inteiro antes da comparação
//       console.log('Clientes filtrados:', filteredClients);
  
//       if (filteredClients.length === 0) {
//         console.log('Nenhum cliente encontrado com o CPF fornecido');
//         return;
//       }
    
//         filteredClients.forEach(client => {
//           console.log('Inserindo cliente na interface:', client);
//           insertList(client.cpf, client.nome, client.telefone, client.nome_social, client.rg);
//         });
//       } catch (error) {
//         console.error('Erro:', error);
//       }
//     }


/*
--------------------------------------------------------------------------------------
Função para obter a lista existente do servidor via requisição GET
--------------------------------------------------------------------------------------
*/

const getCliente = async (cpfInput) => {

  // Remover caracteres não numéricos do CPF digitado
  
  const cpf = parseInt(cpfInput.replace(/\D/g, ''), 10); // Convertendo para número inteiro
    
    let url = 'http://127.0.0.1:5000/cliente?cpf=' + cpf;
    console.log('URL:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao obter os clientes');
      }
      const data = await response.json();
      
      console.log('Clientes da API:', data);
      
      insertList(data.cpf, data.nome, data.telefone, data.nome_social, data.rg);

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

  const insertList = (cpf, nome, telefone, nomeSocial, RG) => {
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
    const cellNomeSocial = row.insertCell(3);
    const cellRG= row.insertCell(4);
    
    cellCPF.textContent = cpfFormat;
    cellNome.textContent = nome;
    cellTelefone.textContent = telefoneFormat;
    cellNomeSocial.textContent =  nomeSocial;
    cellRG.textContent = RG;
    
    // Adicionando botão de remoção
    insertButton(row.insertCell(5));
    
    // Limpar os campos do formulário após a inserção
    document.getElementById("newCPF").value = "";
    document.getElementById("newNome").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newNomeSocial").value = "";
    document.getElementById("newRG").value = "";
    
    // Remover mensagem de lista vazia, se houver
    removeElement();
  }
