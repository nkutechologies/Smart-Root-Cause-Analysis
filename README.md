"# MightyByte-Backend-Challenge" 
"# MightyByte-Backend-Challenge"

1: I'm using websocket to send the url to the client and using websocket to receive the acknowledgment from client 
as websockets don't have native acknowledgment mechanism.

2: We will save the client connection and shortendURL in hashmap and object.

3: Websocket will wait for client to acknowledge back on 'message' meanwhile continue to send the message to the client. 

4: Upon receiving acknowledgment on 'message' the flag hasReceivedTheMessage will be set to true.

5: Once the hasReceivedTheMessage is set to true, server will stop sending the message.
