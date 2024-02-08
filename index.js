const perguntas = [
  {
    pergunta:
      "Qual é a palavra-chave utilizada para declarar uma variável em JavaScript?",
    respostas: ["var", "let", "const"],
    correta: 2,
  },
  {
    pergunta:
      "Qual método é utilizado para imprimir mensagens no console em JavaScript?",
    respostas: ["logMessage()", "print()", "console.log()"],
    correta: 2,
  },
  {
    pergunta: "O que o operador '===' faz em JavaScript?",
    respostas: [
      "Compara valores e tipos de dados",
      "Atribuição de valores",
      "Compara apenas valores",
    ],
    correta: 0,
  },
  {
    pergunta: "Como se declara uma função em JavaScript?",
    respostas: [
      "function minhaFuncao()",
      "def minhaFuncao()",
      "const minhaFuncao = function()",
    ],
    correta: 0,
  },
  {
    pergunta: "O que é o DOM em JavaScript?",
    respostas: [
      "Documento de Operações Móveis",
      "Modelo de Objeto do Documento",
      "Desenvolvimento Orientado a Módulos",
    ],
    correta: 1,
  },
  {
    pergunta: "O que significa a sigla AJAX em JavaScript?",
    respostas: [
      "Asynchronous JavaScript and XML",
      "Advanced JavaScript and XML",
      "Automated JavaScript and XML",
    ],
    correta: 0,
  },
  {
    pergunta: "Como se verifica o tipo de uma variável em JavaScript?",
    respostas: ["typeOf", "getType()", "typeof"],
    correta: 2,
  },
  {
    pergunta:
      "Qual é o método utilizado para adicionar um elemento ao final de um array em JavaScript?",
    respostas: ["push()", "add()", "append()"],
    correta: 0,
  },
  {
    pergunta: "O que é o conceito de 'escopo' em JavaScript?",
    respostas: [
      "Um tipo de variável",
      "A área de código onde uma variável é válida",
      "Um operador lógico",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual é a forma correta de comentar uma linha em JavaScript?",
    respostas: ["// Comentário", "/* Comentário */", "# Comentário"],
    correta: 0,
  },
];

//Criando variaveis pegando do HTML utilizando o QuerySelector
//O # na frente da TAG, seria para representar o ID

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");

//Set seria uma função na qual pode adicionar ou tirar
//Nunca pode repetir
const corretas = new Set();
//utilizando o length como totalizador de perguntas
const totalDePerguntas = perguntas.length;
//Selecionando a div com Id acertos e o espaço para mostrar q esta dentro da div
const mostrarTotal = document.querySelector("#acertos span");
mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
//Reescrevendo o SPAN pelo JavaScript
//mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
// loop ou laço de repetição
//Utilizando laço de repetição pora repetir todas as perguntas sem
//reescrever todas
for (const item of perguntas) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.pergunta;
  //Alinhamento de laço

  for (let resposta of item.respostas) {
    //Utilizado dl dt, pois dt esta dentro de dl

    const dt = quizItem.querySelector("dl dt").cloneNode(true);
    dt.querySelector("span").textContent = resposta;
    //Pegando o unico input que tem dentro de dt, para deixar cada um "unico"
    dt.querySelector("input").setAttribute(
      "name",
      "pergunta-" + perguntas.indexOf(item)
    );
    //Ajustando o Valor do input, pois esta igual a 0
    //desta forma vai atualizar os input, sendo a reposta 0,1 e 2
    dt.querySelector("input").value = item.respostas.indexOf(resposta);
    //Validação da resposta correta
    //Onchange ele espera uma função, ou seja a cada mudança dentro do input ele ativa a função
    dt.querySelector("input").onchange = (event) => {
      //validação do valor da respota com a resposta correta
      const estaCorreta = event.target.value == item.correta;
      //Validação utilizando o if

      //Deleta caso a validação for falsa
      corretas.delete(item);
      if (estaCorreta) {
        //Adiciona todas as vezes que a validação esta correta
        corretas.add(item);
      }

      mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
    };

    //Append deixa sempre no final
    quizItem.querySelector("dl").appendChild(dt);
  }

  quizItem.querySelector("dl dt").remove();

  // coloca a pergunta na tela
  //appendChild ele vincula um "filho" dentro do objeto
  quiz.appendChild(quizItem);
}
