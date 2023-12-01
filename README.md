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
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]
