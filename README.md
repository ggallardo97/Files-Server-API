# Files Server

An API that allows you to interact with a files server (it's like FTP, but you cannot download files, only upload them). I took the idea from a youtube video, so I decided to make my own project to upload files from every divice connected to my network.

## Technologies involved
- JavaScript - Nodejs
- Express
- MongoDB
- JWT
- npm modules

## Installation

First of all, you need to have installed Nodejs and MongoDB, then clone this repo and install the required npm modules. Here are some commands that will help you:
```bash
  git clone https://github.com/ggallardo97/Files-Server-API
  cd Files-Server-API
  npm install
  node index.js
```
Second step, create an .env file with the following info:
- API_URL = '/api/v1'
- CONNECTION_DB = 'yourDBConnectionHere'
- JWT_SECRET = 'yourSecretHere'

Finally, use Postman (or another one) to use it.
## API Reference for files managment

#### Remember! For each end point you need to send the json web token.

#### Get all files
```http
  GET /api/v1/
```

#### Get a file

```http
  GET /showFiles/:id?
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file_id` | `int` | Get files or a specific one|

#### Upload a file

```http
  POST /uploadFile/:dir?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dir`      | `string` | Upload files to the current directory or a specific one |

#### Create a directory

```http
  POST /createDirectory/:dir?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `dir`      | `string` | Create a directory at the current directory or a specific one |


## API Reference for users managment

#### Create an account

```http
  POST /register
```

#### Login to the server

```http
  POST /login
```

#### Logout from the server

```http
  POST /logout
```

## Usage

To create an account, send a json with the following fields:
- name
- email
- password

After that, you will get a token which you will need to send on each API request.


To log in, send a json with the following fields:
- email
- password

While you are logged in, you will be able to create a large number of directories to upload your files and have them in perfect order.

List of allowed file types:
- png
- jpg
- jpeg
- gif
- pdf
