# Node.js Websockets UI (backend for battleship game)

## To run app:

`git clone git@github.com:oibioib/nodejs-websockets-ui.git`

`cd nodejs-websockets-ui`

`git checkout develop`

`npm install`

## Scripts:

`npm run start`

`npm run start:dev`

## List of websocket commands (requests/responses) and their syntax

<- cmd from frontend

-> answer

- Player
  - Login or create player\
     `<-`
    ```ts
    {
        type: "reg",
        data:
            {
                name: <string>,
                password: <string>,
            },
        id: 0,
    }
    ```
    `->`
    ```ts
    {
        type: "reg",
        data:
            {
                name: <string>,
                index: <number>,
                error: <bool>,
                errorText: <string>,
            },
        id: 0,
    }
    ```
  - Update winners (for all after every winners table update)\
     `->`
    ```ts
    {
        type: "update_winners",
        data:
            [
                {
                    name: <string>,
                    wins: <number>,
                }
            ],
        id: 0,
    }
    ```
- Room
  - Create new room (create game room and add yourself there)\
     `<-`
    ```ts
    {
        type: "create_room",
        data: "",
        id: 0,
    }
    ```
  - Add user to room (add youself to somebodys room, then remove room from rooms list)\
     `<-`
    ```ts
    {
        type: "add_user_to_room",
        data:
            {
                indexRoom: <number>,
            },
        id: 0,
    }
    ```
    `->`
    ```ts
    {
        type: "create_game", //send for both players in the room
        data:
            {
                idGame: <number>,
                idPlayer: <number>, \* player id in the game *\
            },
        id: 0,
    }
    ```
  - Update room state (send rooms list, where only one player inside)\
     `->`
    ```ts
    {
        type: "update_room",
        data:
            [
                {
                    roomId: <number>,
                    roomUsers:
                        [
                            {
                                name: <string>,
                                index: <number>,
                            }
                        ],
                },
            ],
        id: 0,
    }
    ```
- Ships
  - Add ships to the game board\
     `<-`
    ```ts
    {
        type: "add_ships",
        data:
            {
                gameId: <number>,
                ships:
                    [
                        {
                            position: {
                                x: <number>,
                                y: <number>,
                            },
                            direction: <boolean>,
                            length: <number>,
                            type: "small"|"medium"|"large"|"huge",
                        }
                    ],
                indexPlayer: <number>, /* id of the player in the current game */
            },
        id: 0,
    }
    ```
  - Start game (only after server receives both player's ships positions)\  
     `->`
    ```ts
    {
        type: "start_game",
        data:
            {
                ships:
                    [
                        {
                            position: {
                                x: <number>,
                                y: <number>,
                            },
                            direction: <boolean>,
                            length: <number>,
                            type: "small"|"medium"|"large"|"huge",
                        }
                    ],
                currentPlayerIndex: <number>, /* id of the player in the current game who have sent his ships */
            },
        id: 0,
    }
    ```
- Game
  - Attack\
     `<-`
    ```ts
    {
        type: "attack",
        data:
            {
                gameId: <number>,
                x: <number>,
                y: <number>,
                indexPlayer: <number>, /* id of the player in the current game */
            },
        id: 0,
    }
    ```
  - Attack feedback (should be sent after every shot, miss and after kill sent miss for all cells around ship too)\  
     `->`
    ```ts
    {
        type: "attack";,
        data:
            {
                position:
                {
                    x: <number>,
                    y: <number>,
                },
                currentPlayer: <number>, /* id of the player in the current game */
                status: "miss"|"killed"|"shot",
            },
        id: 0,
    }
    ```
  - Random attack\
     `<-`
    ```ts
    {
        type: "randomAttack",
        data:
            {
                gameId: <number>,
                indexPlayer: <number>, /* id of the player in the current game */
            },
        id: 0,
    }
    ```
  - Info about player's turn (send after game start and every attack, miss or kill result)\
     `->`
    ```ts
    {
        type: "turn",
        data:
            {
                currentPlayer: <number>,
            },
        id: 0,
    }
    ```
  - Finish game\
     `->`
    ```ts
    {
        type: "finish",
        data:
            {
                winPlayer: <number>,
            },
        id: 0,
    }
    ```

## Websocket commands sequence

```
  Player1               Server                  Player2
    reg         -->
                <--        reg
                <--    update_room
                <--   update_winners
 create_room    -->
                <--    update_room
                                      <--         reg
                           reg        -->
                <--    update_room    -->
                <--   update_winners  -->
                                      <--    add_user_to_room
                <--    update_room    -->
                <--    create_game    -->
   add_ships    -->
                                      <--       add_ships
                <--     start_game    -->
                <--        turn       -->
 attack (miss)  -->
                <--       attack      -->
                <--        turn       -->
                                      <--     randomAttack (shoot)
                <--       attack      -->
                <--        turn       -->
                                      <--     randomAttack (kill) - send state for all cells around killed ship
                <--       attack      -->
                <--        turn       -->
                <--       attack      -->
                <--        turn       -->
                <--       attack      -->
                <--        turn       -->
                <--       attack      -->
                <--        turn       -->
                           ...
                                      <--     randomAttack (miss)
                <--       attack      -->
                <--        turn       -->
 attack (miss)  -->
                <--       attack      -->
                <--        turn       -->
                           ...
                <--      finish       -->
                <--   update_winners  -->
```
