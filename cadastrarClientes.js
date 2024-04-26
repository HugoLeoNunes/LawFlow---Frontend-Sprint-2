/*
  --------------------------------------------------------------------------------------
  Função para colocar um cliente na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
  
  const postCliente = async (inputCPF, inputNome, inputTelefone, inputNomeSocial, inputRG, inputOrgao_Expeditor, inputUfDoc, inputNacionalidade, inputEstadoCivil, inputDataDeNascimento, inputProfissao, inputEmail, inputSexo, inputRua, inputNumero, inputBairro, inputCidade, inputUF, inputCep, inputComplemento) => 
  {

    const formData = new FormData();
    formData.append('cpf', inputCPF);
    formData.append('nome', inputNome);
    formData.append('telefone', inputTelefone);
    formData.append('nome_social', inputNomeSocial);
    formData.append('rg', inputRG);
    formData.append('orgao_expeditor', inputOrgao_Expeditor)
    formData.append('uf_doc', inputUfDoc);
    formData.append('nacionalidade', inputNacionalidade);
    formData.append('estado_civil', inputEstadoCivil);
    formData.append('data_de_nascimento', inputDataDeNascimento);
    formData.append('profissao', inputProfissao);
    formData.append('email', inputEmail);
    formData.append('sexo', inputSexo);
    formData.append('rua', inputRua);
    formData.append('numero', inputNumero);
    formData.append('bairro', inputBairro);
    formData.append('cidade', inputCidade);
    formData.append('uf_endereco', inputUF);
    formData.append('cep', inputCep);
    formData.append('complemento', inputComplemento)

  
    let url = 'http://127.0.0.1:5000/cliente';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => {
        if (response.status == 200) {
          insertList(inputCPF, inputNome, inputTelefone, inputNomeSocial, inputRG, inputOrgao_Expeditor, inputUfDoc, inputNacionalidade, inputEstadoCivil, inputDataDeNascimento, inputProfissao, inputEmail, inputSexo, inputRua, inputNumero, inputBairro, inputCidade, inputUF, inputCep, inputComplemento)
          alert("Cliente adicionado!")
        } else {
          alert ("Já existe um cliente cadastrado com este CPF")
        }
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo cliente com cpf, nome, telefone  e demais campos.
  --------------------------------------------------------------------------------------
*/
  
  const newCliente = () => {
    let inputCPF = document.getElementById("newCPF").value;
    let inputNome = document.getElementById("newNome").value;
    let inputTelefone = document.getElementById("newTelefone").value;
    let inputNomeSocial = document.getElementById("newNomeSocial").value;
    let inputRG = document.getElementById("newRG").value;
    let inputOrgao_Expeditor = document.getElementById("orgao_expeditor").value;
    let inputUfDoc = document.getElementById("uf_doc").value;
    let inputNacionalidade = document.getElementById("nacionalidade").value;
    let inputEstadoCivil = document.getElementById("nacionalidade").value;
    let inputDataDeNascimento = document.getElementById("data_de_nascimento").value;
    let inputProfissao = document.getElementById("profissao").value;
    let inputEmail = document.getElementById("email").value;
    let inputSexo = document.getElementById("sexo").value;
    let inputRua = document.getElementById("rua").value;
    let inputNumero = document.getElementById("numero").value;
    let inputBairro = document.getElementById("bairro").value;
    let inputCidade = document.getElementById("cidade").value;
    let inputUF = document.getElementById("uf").value;
    let inputCep = document.getElementById("cep").value;
    let inputComplemento = document.getElementById("complemento").value;
    

  
    if (inputCPF === '') {
      alert("Escreva o número do cpf do cliente!");
    } else if (isNaN(inputCPF) || isNaN(inputTelefone)) {
      alert("CPF e Telefone precisam ser números!");
    } else {
      postCliente(inputCPF, inputNome, inputTelefone, inputNomeSocial, inputRG, inputOrgao_Expeditor, inputUfDoc, inputNacionalidade, inputEstadoCivil, inputDataDeNascimento, inputProfissao, inputEmail, inputSexo, inputRua, inputNumero, inputBairro, inputCidade, inputUF, inputCep, inputComplemento)
    }
  }
  
/*
  --------------------------------------------------------------------------------------
  Função para inserir clientes na lista apresentada
  --------------------------------------------------------------------------------------
*/
  
  const insertList = (cpf, nome, telefone, nome_social, rg, orgao_expeditor, uf_doc, nacionalidade, estado_civil, data_de_nascimento, profissao, email, sexo, rua, numero, bairro, cidade, uf_endereco, cep, complemento) => {
    var client = [cpf, nome, telefone, nome_social, rg, orgao_expeditor, uf_doc, nacionalidade, estado_civil, data_de_nascimento, profissao, email, sexo, rua, numero, bairro, cidade, uf_endereco, cep, complemento]

    let cpfDoBanco = client[0];
    let telefoneString = client[2].toString()
    var table = document.getElementById('myTable');
    var row = table.insertRow();
    var clean = parseFloat(client[0])
  
  
    for (var i = 0; i < client.length; i++) {
      var cel = row.insertCell(i);
      // Aplicando máscara no CPF e telefone do cliente
      let cpfString = cpfDoBanco.toString()
      var cpfFormat = cpfString.replace( /(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
      var telefoneFormat = telefoneString.replace( /(\d{2})(\d{4,5})(\d{4})/g, "($1) $2 - $3")
      client[0] = `${cpfFormat}`
      client[2] = `${telefoneFormat}`
      cel.textContent = client[i];
    }
    // retornando o cpf para float.
    client[0] = clean
    insertButton(row.insertCell(-1))
    // Sumindo com os dados adicionados nos campos iniciais.
    document.getElementById("newCPF").value = "";
    document.getElementById("newNome").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newNomeSocial").value = "";
    document.getElementById("newRG").value = "";
    document.getElementById("orgao_expeditor").value = "";
    document.getElementById("uf_doc").value = "";
    document.getElementById("nacionalidade").value = "";
    document.getElementById("nacionalidade").value = "";
    document.getElementById("data_de_nascimento").value = "";
    document.getElementById("profissao").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("complemento").value = "";

    removeElement()
  }
  


/*
  --------------------------------------------------------------------------------------
  Consulta a API externa visando facilitar o cadastro do cliente, através de consulta do CEP
  --------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------
  Funções da API externa
  --------------------------------------------------------------------------------------
*/

  function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";
        document.getElementById('ibge').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};