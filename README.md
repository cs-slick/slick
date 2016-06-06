# slick [![Build Status](https://travis-ci.org/cs-slick/slick.svg?branch=master)](https://travis-ci.org/cs-slick/slick) [![Coverage Status](https://coveralls.io/repos/github/cs-slick/slick/badge.svg?branch=master)](https://coveralls.io/github/cs-slick/slick?branch=master)
Slack for Music: provide real time event driven collaboration between users for synchronized music playback and DJ delegation

##Overview
###Tech Stack
- React
- rollup (bundling)
- Socket.io
- Mocha
- Chai
- Supertest
- socket.io-client
- Node + Express

###Front-end
- built in React
- 4 different components 
``<Main>
      <SongPlayer>
      <SongQueue> 
          <Songs>
``
- ``<Main>`` is component where DOM event and socket event handling happens (ex: play, pause, onPlay socket emit events, etc..)
- ``<SongPlayer>`` is component where ``<audio>`` element is mounted and where audio playback events are listened to and events passed back up to ``<Main>``
- ``<SongQueue>`` is container component to hold ``<Songs>`` components
- ``<Songs>`` is view component which displays song information in queue

###Back-end
- See simple chat application using Socket.io here http://socket.io/get-started/chat/ to get up to speed with how to use sockets
- There are 3 socket events
  - ``playCurrent``: all client sockets emit this event when user triggers play on song player; all client sockets listen for this event to play current song
  - ``pauseCurrent``:  same as the playCurrent event except pauses the current song
  - ``songEnded``: socket event dispatched when current song is done playing

##Setup
1. Get your own Soundcloud client id at http://soundcloud.com/you/apps/new and use in ``client-id.js`` file
2. Configure and define IP address of person hosting DJ room in ``main.js`` when instantiating ``<Slick>`` component 

3. ``npm install``
4. ``rollup -c`` to bundle up React source files
5. ``npm start`` to start server

``rollup -c`` each time you make changes to client side react .js files to bundle  files

##Features to Implement
- Chatroom UI
- Friends List UI 
- User login with DB:  persist user information for friends list / chat
- DJ power: only 1 person can change songs currently playing in chat room
- Data Persistence on server:  save song list queue on server side to synchronize current playing song across users in chat room
