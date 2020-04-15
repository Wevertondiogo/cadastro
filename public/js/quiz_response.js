function populate() {
  if (quiz.isEnded()) {
    showScores()
  }
  else {
    // show question
    const element = document.querySelector('#question')
    element.innerHTML = quiz.getQuestionIndex().text

    const choices = quiz.getQuestionIndex().choices

    for (i in choices) {
      const element = document.querySelector('#choice' + i)
      element.innerHTML = choices[i]
      guess('btn' + i, choices[i])
    }
    showProgress()
  }
}


function guess(id, guess) {
  const button = document.getElementById(id)
  button.onclick = function () {
    quiz.guess(guess)
    populate()
  }
}

function showProgress() {
  const currentQuestionNumber = quiz.questionIndex + 1
  const element = document.querySelector('#progress')
  element.innerHTML = "Questão " + currentQuestionNumber + " de " + quiz.questions.length
}

function showScores() {
  let gameOverHtml = "<h1 class='title'>Result</h1>"
  gameOverHtml += "<h2 class='score'> Sua pontuação é: " + quiz.score + "<h2>"
  const element = document.querySelector('#quiz')
  element.innerHTML = gameOverHtml
}

const questions = [
  new Question('Qual desses esportes é o favorito do Paulo? ', ['Futebol', 'Basquete', 'Ele é sedentário', 'Tennis'], 'Ele é sedentário'),
  new Question('O que o Paulo não costuma fazer ? ', ['DORMIR', 'Estudar', 'Ler', 'Trabalhar'], 'DORMIR'),
  new Question('Qual é o signo do Paulo ? ', ['Leão', 'Foda-se o signo caralho', 'Libras', 'Peixes'], 'Foda-se o signo caralho'),
  new Question('Qual nick o Paulo SEMPRE usa nos jogos ? ', ['Bunda mole', 'Monstro', 'Bonieky', 'Deletking'], 'Deletking')
]

const quiz = new Quiz(questions)

populate()