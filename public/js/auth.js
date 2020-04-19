//Selecionadores
const q = q => document.querySelector(q);
const qAll = q => document.querySelectorAll(q)
//Inputs 
const authEmailInput = q('#authEmailInput');
const authPasswordInput = q('#authPasswordInput');
const nomeInput = q('#nomeInput');
const authCadastroEmailInput = q('#authCadastroEmailInput');
const authCadastroSenhaInput = q('#authCadastroSenhaInput');

//Buttons: Login E Cadastro
const login = q('#login')
const cadastro = q('#cadastro')

// Meenssagens de invalidado
const invalid = q('#invalid');
const mandatoryLoginEmail = q('#mandatoryLoginEmail');
const mandatoryLoginSenha = q('#mandatoryLoginSenha');

const mandatorySenha = q('#mandatorySenha');
const mandatoryEmail = q('#mandatoryEmail');
const mandatoryNome = q('#mandatoryNome')

const eyeLoginPassword = q('#eyeLoginPassword')
const eyeCadastroPassword = q('#eyeCadastroPassword')

// Função De Login
login.addEventListener('click', () => {

  //zerando campos do cadastro
  nomeInput.style.border = ''
  mandatoryNome.innerText = ''
  authCadastroEmailInput.style.border = ''
  mandatoryEmail.innerText = ''
  authCadastroSenhaInput.style.border = ''
  mandatorySenha.innerText = ''

  //Condição para afetuar o login corretamente
  if (authEmailInput.value == '') {
    invalid.innerText = 'Por favor, preencha todos os campos do login corretamente para prosseguir'
    authEmailInput.style.border = '1px solid red'
    mandatoryLoginEmail.innerText = 'Campo obrigatório *'
  }
  if (authPasswordInput.value == '') {
    invalid.innerText = 'Por favor, preencha todos os campos do login corretamente para prosseguir'
    authPasswordInput.style.border = '1px solid red'
    mandatoryLoginSenha.innerText = 'Campo obrigatório *'
  }

  else {
    if (authPasswordInput.value != '') {
      authPasswordInput.style.border = ''
      mandatoryLoginSenha.innerText = ''
    }

    // Funcão de êxito
    firebase.auth().signInWithEmailAndPassword(authEmailInput.value, authPasswordInput.value).then(() => {
      alert('Login efetuado com sucesso')
      window.location.href = 'https://home-807d3.web.app/'
      authEmailInput.value = '';
      authPasswordInput.value = '';
    }) // tratando Erro
      .catch(function () {
        if (authEmailInput.value != '' && authPasswordInput.value.length >= 6) {
          invalid.innerText = 'E-mail ou Senha não encontrados ou incorretos. Recomendo que vá até o campo de Cadastro';
          nomeInput.focus()
        }
      });
  }
})

// Funcão Cadastro
cadastro.addEventListener('click', () => {

  //zerando campo de login
  invalid.innerText = ''
  authEmailInput.style.border = ''
  mandatoryLoginEmail.innerText = ''
  authPasswordInput.style.border = ''
  mandatoryLoginSenha.innerText = ''

  //Condição para afetuar o cadastro corretamente
  if (authCadastroEmailInput.value == '') {
    authCadastroEmailInput.style.border = '1px solid red'
    mandatoryEmail.innerText = 'Campo obrigatório *'
  }
  if (authCadastroSenhaInput.value == '') {

    authCadastroSenhaInput.style.border = '1px solid red'
    mandatorySenha.innerText = 'Campo obrigatório *'
  }
  if (nomeInput.value == '') {
    nomeInput.style.border = '1px solid red'
    mandatoryNome.innerText = 'Campo obrigatório *'
  }

  else {
    if (nomeInput.value != '') {
      nomeInput.style.border = ''
      mandatoryNome.innerText = ''
    }
    if (authCadastroSenhaInput.value != '') {

      authCadastroSenhaInput.style.border = ''
      mandatorySenha.innerText = ''
    }
    if (nomeInput.value != '') {
      nomeInput.style.border = ''
      mandatoryNome.innerText = ''
      // window.location.reload()
    }

    //Função de de êxito
    firebase.auth().createUserWithEmailAndPassword(authCadastroEmailInput.value, authCadastroSenhaInput.value).then(() => {
      alert('Você foi cadastrado com sucesso!')
      window.location.href = 'https://home-807d3.web.app/'
      nomeInput.value = '';
      authCadastroEmailInput.value = '';
      authCadastroSenhaInput.value = '';
    })//tratando erro
      .catch(function () {
        if (authCadastroEmailInput.value != '' && authCadastroSenhaInput.value.length >= 6 && nomeInput.value.length > 0) {
          authCadastroEmailInput.style.border = '1px red solid'
          mandatoryEmail.innerText = 'Email invalido'
        }
      });
  }
})

function zero() {
  //Zerando todos os campo

  invalid.innerText = ''
  mandatoryLoginEmail.innerText = ''
  mandatoryLoginSenha.innerText = ''
  mandatoryNome.innerText = ''
  mandatoryEmail.innerText = ''
  mandatorySenha.innerText = ''
  nomeInput.style.border = ''
  authEmailInput.style.border = ''
  authPasswordInput.style.border = ''
  authCadastroEmailInput.style.border = ''
  authCadastroSenhaInput.style.border = ''
}

const forms = qAll('form')

const [loginBlur, cadastroBlur] = forms



const hasError = field => {
  //tratando Errro das funções BLUR

  const validity = field.validity;

  if (validity.valid) return

  if (validity.valueMissing) return 'Campo obrigatório *'

  if (validity.tooShort) return 'Sua senha tem que ter no mínimo 6, e no maxímo 12 caracteres.';


  if (validity.typeMismatch) {
    if (field.type === 'email') return 'Email inválido'
  }

}

const showError = (field, error) => {
  // exibindo mensagem de erro

  field.classList.add('error')

  const id = field.id || field.name
  if (!id) return

  let message = field.form.querySelector('.error-message#error-for-' + id)
  if (!message) {
    message = document.createElement('div');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    field.parentNode.insertBefore(message, field.nextSibling);
  }
  field.setAttribute('aria-describedby', 'error-for-' + id)

  message.innerHTML = error

}

const removeError = field => {
  //Removendo a mensagem de erro

  field.classList.remove('error')

  field.removeAttribute('aria-describedby')

  const id = field.id || field.name
  if (!id) return

  let message = field.form.querySelector('.error-message#error-for-' + id + '')

  if (!message) return

  message.innerHTML = ''
  message.style.display = 'none'
  message.style.visibility = 'hidden'

}

loginBlur.addEventListener('blur', event => {
  //Função BLUR

  //Chhamando as funçõe: hasError, showError e removeError

  const error = hasError(event.target)

  if (error) {
    showError(event.target, error)
    return
  }
  removeError(event.target)
}, true)

cadastroBlur.addEventListener('blur', event => {
  //Função BLUR

  //Chhamando as funçõe: hasError, showError e removeError

  const error = hasError(event.target)

  if (error) {
    showError(event.target, error)
    return
  }
  removeError(event.target)
}, true)


authPasswordInput.addEventListener('click', () => {
  eyeLoginPassword.classList.add('fa-eye')
})

authCadastroSenhaInput.addEventListener('click', () => {
  eyeCadastroPassword.classList.add('fa-eye')
})
// authPasswordInput.addEventListener('blur', () => {
//   eyeLoginPassword.classList.remove('fa-eye')
// })
eyeLoginPassword.addEventListener('click', togglePasswordLogin)
eyeCadastroPassword.addEventListener('click', togglePasswordCadastro)

function togglePasswordLogin() {
  switch (authPasswordInput.type) {
    case 'password':
      authPasswordInput.type = 'text'
      eyeLoginPassword.classList.remove('fa-eye')
      eyeLoginPassword.classList.add('fa-eye-slash')
      break;
    case 'text':
      authPasswordInput.type = 'password'
      eyeLoginPassword.classList.add('fa-eye')
      eyeLoginPassword.classList.remove('fa-eye-slash')
    default:
      break;
  }
}

function togglePasswordCadastro() {
  switch (authCadastroSenhaInput.type) {
    case 'password':
      authCadastroSenhaInput.type = 'text'
      eyeCadastroPassword.classList.remove('fa-eye')
      eyeCadastroPassword.classList.add('fa-eye-slash')
      break;
    case 'text':
      authCadastroSenhaInput.type = 'password'
      eyeCadastroPassword.classList.add('fa-eye')
      eyeCadastroPassword.classList.remove('fa-eye-slash')
    default:
      break;
  }
}