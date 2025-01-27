let eventSource = null
const userIdInput = document.querySelector("#userIdTxt")
const connectButton = document.querySelector("#connectBtn")
const closeButton = document.querySelector("#closeBtn")
const ulUsers = document.querySelector("#users")

connectButton.addEventListener("click", startConnection)
closeButton.addEventListener("click", closeConnection)

function startConnection() {
  const userId = userIdInput.value.trim()
  if (!userId) {
    alert("Please enter a User ID")
    return
  }

  eventSource = new EventSource(`/events?user=${userId}`)
  connectButton.setAttribute("disabled", "")
  closeButton.removeAttribute("disabled")
  userIdInput.setAttribute("disabled", "")

  eventSource.onmessage = (event) => {
    const connectedUsers = JSON.parse(event.data)
    updateUsersList(connectedUsers)
  }
}

function updateUsersList(users) {
  ulUsers.innerHTML = ""

  users.forEach((user) => {
    const liUser = document.createElement("li")
    liUser.textContent = user
    ulUsers.appendChild(liUser)
  })
}

function closeConnection() {
  eventSource.close()

  ulUsers.innerHTML = ""
  connectButton.removeAttribute("disabled")
  userIdInput.removeAttribute("disabled")
  closeButton.setAttribute("disabled", "")
}
