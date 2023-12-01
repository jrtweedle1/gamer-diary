# QuestLog (Gamer Diary)
QuestLog is a video game diary for gamers to record their progress in various games. This application was made with gamers in mind who are tired of losing thier progress after putting a game down for a while. It's especially useful for people that play multiple games at a time, take breaks from playing video games, or otherwise would need a way to record progress and notes.

![http://full/path/to/img.jpg "Optional title"](https://github.com/jrtweedle1/gamer-diary/blob/main/screenshot.png?raw=true)

## Features
* Gamer-friendly user interface
* Users can sign up and maintain their session through JWT tokens
* Users can create multiple Diaries
* Users can add titled custom text sections to each Diary
* Diaries and their sections can be deleted
* Data is stored persistently in the database

## Installation
1. Ensure that you have the necessary prequesites installed to your machine: Node.js, MongoDB, Java/JDK
2. Clone the repository to your local computer
   ```sh
   git clone https://github.com/jrtweedle1/gamer-diary.git
   ```
3. Install NPM packages: make sure you're in the client directory first
   ```sh
   cd Client
   npm install
   ```
4. Start the server
   ```sh
    mvn clean install
    mvn spring-boot:run
   ```
5. Start the client
   ```sh
   cd Client
   npm run start
   ```
   
## Technologies
What technologies my project uses.
* ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
* ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
* ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
