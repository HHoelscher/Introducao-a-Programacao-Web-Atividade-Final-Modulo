//utilizar o email cadastrado como chave para os recados
let list = document.getElementById("listMessages")
const messages = JSON.parse(localStorage.getItem("messages")) || []
const currentUser = JSON.parse(localStorage.getItem("currentUser"))

//criar mensagem ======================================================
function createMessage(event) {
  event.preventDefault()

  const title = document.getElementById("message").value
  const description = document.getElementById("description").value

  if (!currentUser) {
    window.location.href = "index.html"
    return alert("O usuário precisa estar logado para criar um recado!")
  }

  const message = {
    id: nextID(),
    userId: currentUser.id,
    title,
    description,
  }
  // let messages = []
  // const localStorageMessages = JSON.parse(localStorage.getItem("messages"))

  // if (!!localStorageMessages && localStorageMessages.length)
  //   messages = localStorageMessages

  messages.push(message)
  saveMessage(messages)
  localStorage.setItem("lastID", message.id)
  clearFields()
  location.reload()
}
listMessages()

///////////////////////////////////////////////

//limpar campos ===============================================================

function clearFields() {
  const title = document.getElementById("message")
  const description = document.getElementById("description")

  title.value = ""
  description.value = ""
}

function logOut() {
  window.location.href = "index.html"
}

///////////////////////////////////////////////

///createElement

function listMessages() {
  list.innerHTML = ""

  messages
    .filter((message) => message.userId === currentUser.id)
    .forEach((message) => {
      list.innerHTML =
        list.innerHTML +
        `
        <tr>
            <td>${message.id}</td>
            <td>${message.title}</td>
            <td>${message.description}</td>
            <td>
            <button type="button" id="delete" onclick="removeMessage(${message.id})">Excluir 🗑</button>
            <button type="button" id="edit" onclick="redirectToEditPage(${message.id})">Editar 🖊</button>
            </td>        

        </tr>
    `
    })
}
// deletar mensagem ===========================================================
function removeMessage(messageId) {
  const index = messages.findIndex((message) => message.id === messageId)

  if (index === -1) {
    alert("Não foi encontrada a mensagem que você deseja excluir")
    return
  }

  messages.splice(index, 1)

  saveMessage(messages)
  listMessages()
}

// editar mensagem ===========================================================
function redirectToEditPage(id) {
  location.href = `editMessage.html?messageId=${id}`
}

//funcoes complementares ======================================================

function getMessageID(messageId) {
  return messages.findIndex((message) => message.id === messageId)
}

function nextID() {
  let lastID = Number(localStorage.getItem("lastID") || "0")
  return ++lastID
}

function saveMessage() {
  localStorage.setItem("messages", JSON.stringify(messages))
}
