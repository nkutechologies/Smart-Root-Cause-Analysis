const express = require("express");
const WebSocket = require("ws");
const webApp = express();
webApp.use(express.json());
const serverPort = 5000;
const http = require("http");
const { generateRandomString } = require("./helpers");

const httpServer = http.createServer(webApp);
const websocketServer = new WebSocket.Server({ server: httpServer });

const storedURLs = {};
let activeWebsocketConnection;
let messageReceivedFlag = false;

websocketServer.on("connection", (ws) => {
  ws.on("message", function handleIncomingMessage(message) {
    if (message) {
      messageReceivedFlag = true;
    }
  });

  activeWebsocketConnection = ws;
});

webApp.post("/url", (req, res) => {
  const receivedURL = req.body.url;
  const uniqueString = generateRandomString();
  storedURLs[uniqueString] = receivedURL;

  const shortenedURL = `http://localhost:${serverPort}/${uniqueString}`;

  confirmAndSend(activeWebsocketConnection, shortenedURL);
});

function confirmAndSend(ws, message, retryCount = 5) {
  if (retryCount === 0) {
    console.error(
      "Acknowledgment not received after several attempts:",
      message,
    );
    return;
  }

  ws.send(JSON.stringify(message), (error) => {
    if (error) {
      console.error("Error sending message:", error);
      return;
    }
    setTimeout(() => {
      console.log("Verifying acknowledgment received");
      if (!messageReceivedFlag) {
        console.log("Acknowledgment missing, retrying...");
        confirmAndSend(ws, message, retryCount - 1);
      }
    }, 5000);
  });
}

webApp.get("/:shortenedURL", (req, res) => {
  const targetURL = storedURLs[req.params.shortenedURL];

  res.json({ url: targetURL });
});

webApp.listen(serverPort, () => {
  console.log(`Server is up and running on port ${serverPort}`);
});
