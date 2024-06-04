# MightyByte-Backend-Challenge

- I'm using websocket to send the url to the client and using websocket to receive the acknowledgment from client 
  as websockets don't have native acknowledgment mechanism.

- We will save the client connection and shortendURL in hashmap and object.

- Websocket will wait for client to acknowledge back on 'message' meanwhile continue to send the message to the client. 

- Upon receiving acknowledgment on 'message' the flag hasReceivedTheMessage will be set to true.

- Once the hasReceivedTheMessage is set to true, server will stop sending the message.
