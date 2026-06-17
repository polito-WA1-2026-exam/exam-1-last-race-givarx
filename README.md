# Exam #N: "Exam Title"
## Student: s364170 DE CATA GIOVANNI

## React Client Application Routes

- Route `/`: HomePage With Rules that can be visited by anyone
- Route `/login`: Login Page
- Route `/GameLobby`: Main Page for registered users, here you can start a Game
- Route `/GameLobby/map`: for registered Users Only, here you can see the Full Map

## API Server

- POST `/api/session`
  - is the api login post method
  - the browser sends through the body username and passowrd
  - the systsem vaildates data and if positive authorizes the browser starting a session
- GET `/api/Stations`
  - requests a station from the server, if you dont specify parameters you get all stations
  - response body content: contains the requeste station/s
  -doesnt need auth(for now)
- POST `/api/Links`
  - requests a link from the server, if you dont specify parameters you get all stations
  - response body content: contains the requeste link/s
  -doesnt need auth(for now)
- GET `/api/RandomStations`
  - requests 2 random stations with distance between them of at least 3 links
  - needs to be logged in

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

| username | password |
| --- | --- |
| dummyuser | dummyuser123 |

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
