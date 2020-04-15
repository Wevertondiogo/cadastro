const q = q => document.querySelector(q)
const logOut = q('#logOut')
logOut.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    window.location.replace('../public/index.html')
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
})

const hamburguer = q('#hamburguer')

hamburguer.addEventListener('click', () => {

  const section = q('.section')
  const cardGroup = q('.card-group')
  const open = q('#open')

  section.classList.toggle('d-none')
  cardGroup.classList.toggle('d-none')
  open.classList.toggle('height')
})
let nome = 'Weverton'
console.log(nome.length)