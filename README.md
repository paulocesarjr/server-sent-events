# Real-Time Connection with SSE (Server-Sent Events)

This project demonstrates the use of Server-Sent Events (SSE) for establishing real-time, one-way communication between a server and a client. Using Node.js for the back-end and vanilla JavaScript for the front-end, this application allows users to connect to a server and receive real-time updates on a list of connected users.

## Features

- Real-time updates: Clients receive updates every 5 seconds about the users connected to the server.
- SSE connection: Establishes an efficient, one-way communication channel from the server to the client.
- Dynamic user list: Displays a list of currently connected users, which updates automatically in real time.
- Connection management: Users can connect and disconnect, with the server maintaining an updated list of active users.

## Test it Out

To test the real-time connection, simply open two tabs in your browser and visit http://localhost:3000 on both. As you connect, the user list will automatically update in both tabs.
