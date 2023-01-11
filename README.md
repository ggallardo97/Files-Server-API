# Files Server

An API that allows you to interact with a files server (it's like FTP, but you cannot download files, only upload them). I took the idea from a youtube video, so I decided to make my own project to upload files from every divice connected to my network.

## Technologies involved
- JavaScript - Nodejs
- Express
- MongoDB
- JWT
- npm modules



## Instalación

First of all, you need to have installed Nodejs and MongoDB, then clone this repo and install the required npm modules. Here are some commands that will help you:
```bash
  git clone Files-Server-API
  cd Files-Server-API
  node index.js
```
Second step, create an .env file with the following info:
- API_URL = '/api/v1'
- CONNECTION_DB = 'yourDBConnectionHere'
- JWT_SECRET = 'yourSecretHere'

Finally, use Postman (or another one) to use it.

## API Reference for files managment

#### Get all files

```http
  GET /api/v1/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get a file

```http
  GET /showFiles/:id?
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Upload a file

```http
  POST /uploadFile/:dir?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create a directory

```http
  POST /createDirectory/:dir?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### add(num1, num2)

Takes two numbers and returns the sum.

