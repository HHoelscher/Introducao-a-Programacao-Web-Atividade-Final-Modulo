function register(event) {
  event.preventDefault()

  const emailAcess = document.getElementById("registerEmail").value
  const passwordAcess = document.getElementById("registerPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (!emailAcess || emailAcess.length < 12) {
    alert("Confirme se o e-mail foi preenchido corretamente!")
    return
  }
  if (!passwordAcess || !confirmPassword || confirmPassword !== passwordAcess) {
    alert("Verifique se a senha está preenchida corretamente!")
    return
  }

  const user = {
    id: Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
    email: emailAcess,
    password: passwordAcess,
  }
  salvarUsuario(user)
}

function salvarUsuario(receivedUser) {
  let users = []

  const localStorageUsers = JSON.parse(localStorage.getItem("users"))

  if (!!localStorageUsers && localStorageUsers.length) users = localStorageUsers

  if (users.length) {
    const emailAlreadyExists = users.some(
      (user) => user.email === receivedUser.email
    )

    if (emailAlreadyExists) {
      alert("Este e-mail já foi cadastrado.")
      return
    }
  }

  users.push(receivedUser)
  localStorage.setItem("users", JSON.stringify(users))

  window.location.href = "index.html"
  alert("Cadastro realizado com sucesso. Efetue seu login!")
}

function backToLogin() {
  window.location.href = "/"
}
///
