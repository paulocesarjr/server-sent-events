let eventSource = null
const userIdInput = document.querySelector("#userIdTxt")
const connectButton = document.querySelector("#connectBtn")

connectButton.addEventListener("click", startConnection)

function startConnection() {
  const userId = userIdInput.value.trim()
  if (!userId) {
    alert("Please enter a User ID")
    return
  }

  eventSource = new EventSource(`/events?user=${userId}`)
  connectButton.setAttribute("disabled", "")
  userIdInput.setAttribute("disabled", "")

  eventSource.onmessage = (event) => {
    const connectedUsers = JSON.parse(event.data)
    updateUsersList(connectedUsers)
  }
}

function updateUsersList(users) {
  const ulUsers = document.querySelector("#users")
  ulUsers.innerHTML = ""

  users.forEach((user) => {
    const liUser = document.createElement("li")
    liUser.textContent = user
    ulUsers.appendChild(liUser)
  })
}
