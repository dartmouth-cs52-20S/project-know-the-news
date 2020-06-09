# Varify

## About

* The main goal of this project was to build a web application that would give people the ability to easily see the "other" side of a news story. Given the problem of the United States and the World becoming more polarized on political and social matters due to various reasons such as echo-chambers, we decided that this type of application would be a step in the right direction of breaking down the echo-chamber walls and giving people the ability to form their own opoinion on matters by seeing a more diverse set of opinions than they would have originally seen.


* Our team developed a chrome-extension which searches the web for news articles on the same topic of an article that a current web-user is viewing, and gives back a set of articles with a different sentiment on the same subject, therefore exposing the user to other opinions on the topic.


* Further the user has the ability to save the articles, and access them for later use on our website. Our website will host every "topic" or set of articles that anybody has saved and therefore users can access a variety of different topics on our website.

## Setup

### Non-Local Setup

* To get the full experience of our project you should also make use of our [chrome extension](https://chrome.google.com/webstore/detail/denggifplbggoleagckomiilhcoeofka/publish-accepted?authuser=0&hl=en). Install it in chrome, go to some news articles and see how it works.

* After you have installed the chrome extension, you can navigate to any news article on any news source and use the "Fetch News" button to find other articles on the same topic but from another point of view.

* If you decide to save a topic by pressing the "Save Topic" button you can view the topic on our website listed below.

### Local Setup

* . First you must git clone the following repositories and run yarn install/yarn start on then -
  - [Front End](https://github.com/dartmouth-cs52-20S/project-know-the-news)
    - Change the root_url in actions/index to the local api server you will start. 
  - [API Server](https://github.com/dartmouth-cs52-20S/project-api-know-the-news)
    - add a .env file with a random key of your choice as explained [here](http://cs52.me/assignments/lab/redux-platform+auth/#secret-key)

* Second clone the chrome extension [repository](https://github.com/dartmouth-cs52-20S/project-other-know-the-news) navigate to chrome [extensions](chrome://extensions/) in your browser, toggle into developer mode in the upper right hand corner, then press loud unpacked in the upper left hand corner and choose the repository you just cloned. You are good to use it on any news site!

## Deployment

* [Front End](http://knowthenews.surge.sh/)
* [Chrome Extension](https://chrome.google.com/webstore/detail/denggifplbggoleagckomiilhcoeofka/publish-accepted?authuser=0&hl=en)
* [API Backend](https://know-the-news.herokuapp.com/) 

## Screenshots 

* Extension on page

![Page Extension](https://i.imgur.com/qxSEbWA.jpg))

* Extension Close Up

![Extension](https://i.imgur.com/QFNwTHc.png)

* Topic home page on our Site

![Topic Homepage](https://i.imgur.com/caA3JjX.png)

## Architecture

* Chrome Extension - (https://github.com/dartmouth-cs52-20S/project-other-know-the-news)
* API - (https://github.com/dartmouth-cs52-20S/project-api-know-the-news)
* Front-end - (https://github.com/dartmouth-cs52-20S/project-know-the-news)

## Authors

* Fedor Myagkov
* Ayan Agarwal
* Ryan Blankemeier
* Alex Feng
* Ray Li
* Dylan Spector

## Acknowledgments
* Lab 4, CS52
* Starter Pack, CS52
* Lab 5, CS52
* News-API
* Congress-API
