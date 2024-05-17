# virtual-event-management-platform
A virtual event management platform focusing on user registration, event scheduling, and participant management

## Introduction

This project provides the following API's:

|           Endpoint  | Description                                                    |
| ------------------ :| :------------------------------------------------------------- |
|   `POST /register`  | Register a new user.                                           |
|      `POST /login`  | Log in a user.                                                 |
|     `POST /events`  | Create a new event for the logged-in user.                     |
|      `GET /events`  | View all events for the logged-in user.                        |
| `GET /events/:id`   | View specific event for the logged-in user.                    |
| `PATCH /events/:id` | Update specific event for the logged-in user.                  |
| `DELETE /events/:id`| Delete specific event for the logged-in user.                  |


## Installation

To run this project locally, please follow these steps to get started:

Clone this repository: git clone https://github.com/Shikha-Shetty/news-aggregator.git

Navigate to the project directory: `cd project-directory`

Install dependencies: `npm install`

## Usage
To start the API server, run the following command: `npm run start`

## Postman collection Documentation for this project
https://documenter.getpostman.com/view/6720526/2sA3JT2xgy

