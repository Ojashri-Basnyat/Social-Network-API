# Social-Network-API
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.


## User Story 
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Video of Application (https://drive.google.com/file/d/1sXI7uPORehgHoh3SBhjnsBQVXgJ3XsTK/view?usp=sharing)
<img>.assets/demoscreenshot.png</img>

## Installation
npm init
npm install

## Usage
npm start server.js

## Technology Used
Express
Node
MongoDB
Mongoose
JS

## Questions/Comments?
Please reach out to the author: https://github.com/Ojashri-Basnyat or basnyat.ojashri@gmail.com 