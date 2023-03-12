const messages = JSON.parse(localStorage.getItem("messages")) || []

const params = new URLSearchParams(window.location.search)

const messageId = params.get("messageId")

const titleEdit = document.getElementById("titleEdit")
const descriptionEdit = document.getElementById("descriptionEdit")

const message = messages.find((message) => message.id === Number(messageId))
console.log(message)

titleEdit.value = message.title
descriptionEdit.value = message.description

titleEdit.focus()

function update(event) {
  event.preventDefault()

  const titleFieldValue = titleEdit.value
  const descriptionFieldValue = descriptionEdit.value

  if (titleFieldValue !== message.title) {
    message.title = titleFieldValue
  }
  if (descriptionFieldValue !== message.description) {
    message.description = descriptionFieldValue
  }

  localStorage.setItem("messages", JSON.stringify(messages))
  location.href = "messages.html"

  alert("Recado alterado com sucesso.")
}
