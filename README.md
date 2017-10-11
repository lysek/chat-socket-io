# Chat demo s RethinkDB a Socket.IO

Spustit RethinkDB a [vytvorit](http://localhost:8080) databazi `chat` tabulku
a v ni tabulku `messages`.
 
Spustit backend pomoci prikazu `npm run start` a v prohlizeci otevrit
[http://localhost:3000](http://localhost:3000).

## API nad Socket.IO
- *chat.message* - emituje klient a server zapise zpravu do DB, server ocekava
  payload jako JSON `{"from": "...", "message": "..."}`.
- *chat.addMessage* - emituje server s podobnym JSONem a klient zobrazi zpravu.