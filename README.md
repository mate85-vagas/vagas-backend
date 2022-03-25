# How to run

Make sure to have all dependencies installed before run the project, you can use ``` npm install ``` to do that.

Since you have all the dependencies, you can run the project by using ``` npx nodemon index ``` on your console.

p.s.: Make sure to have a MySQL database named vagas_db running and all the environment tables set.

# API endpoints
These endpoints will be used to consult, analyze and update informations on the application in IC's jobs base

## GET
`url` [/usuarios](#get-usuarios) <br/>
`url` [/vagas](#get-vagas) <br/>

## POST
`url` [/usuarios](#post-usuarios)<br/>
`url` [/usuarios/login](#post-usuarioslogin)<br/>
`url` [/vagas](#post-vagas) <br/>
___

### GET /usuarios

**Response**

|          Name | Type   | Description  |
| -------------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` |  int  | The user's identification code   |
|     `name` | string  | The user's name
|     `email` | string  | The user's email
|     `password` |  string  | The user's password to sign in 
|     `createdAt` | date  | The date of the job's record creation
|     `updatedAt` | date  | The date of the last job's record update


**Example**

```
{
      "id: 1,
      "name": "Vinicius",
      "email": "viniciuskevitzz@gmail.com",
      "password": "lQacNBFz2Z7HoUkN&OXVV8eSGvCbmqGb!1q",
      "createdAt": "2022-03-23T16:36:05.000Z",
      "updatedAt": "2022-03-24T16:36:05.000Z",
}
```
___

### GET /vagas

**Parameters**

|          Name | Required |  Type   | Description  |
| -------------:|:--------:|:-------:| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
|    `type` | optional | string | Shows you the type of the job... Internship, junior, full or senior                   |
|     `site` | optional | string  | Tells you the city where you will work <br/><br/> In case of home office, tells you the city your team is alocated |
|    `workload` | optional | int  | Your weekly workload          |
|    `scholarity` | optional | string  | The minimum scholarity required fot the job   |
|    `filter` | optional | string  | Filter will search in both description and title   |
|    `min` | optional | float  | Lower bound of salary (must have `max` parameter too work) |
|    `max` | optional | float  | Upper bound of salary (must have `min` parameter too work) |
|    `itemsPerPage` | optional | int  | The number of items you want to see in a single page   |
|    `pageNumber` | optional | int  | The page number   |
|    `createdAt` | optional | date  | The date of the job's record creation   |

**Response**

|          Name |  Type   | Description |
| -------------:|:--------:| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    `count` | int | Counts the amount of data from database that matches with the requisition query (not based on pagination) |
|    ` rows ` | array | Contains the data from database that matches with requisition query |
|    ` id ` | int | The id of the job |
|     `description` | string  | Explains the job's requirements   |
|    `scholarity` | string  | The minimum scholarity required fot the job   |
|        `title` | string  | A little 'spoiler' of the job's requirement |
| `type` |  string | Shows you the type of the job... Internship, junior, full or senior                   |
|       `site` | string  | Tells you the city where you will work <br/><br/> In case of home office, tells you the city your team is alocated
|    `workload` |  int  | Your weekly workload          |
|    `salary` |  float  | The monthly wage offer    |
|    `endingDate` | date  | Deadline for the job in the database (default: 3 weeks, 6 months max)  |
|    `startingDate` |  date  | When the job starts   |
|    `createdAt` |  date | The date of the job's record creation   |
|    `updatedAt` |  date  | The date of the last job's record update |
|    `userId` | int  | The job's identification code   |
|    `user` | object | Contains information about job's creator |
|    `user.name` | string | Name of the creator of the job |
|    `user.email` | string | Email of the creator of the job |

**Example**

```
// {url}/vagas?site=Salvador&workload=40
{   count": 2,
    "rows: ": [
      {
               "id": 1
               "description: "Vaga programador júnior com pelo menos 1 ano de experiência, na Vini LTDA",
               "scholarity": "Ensino médio completo",
               "title": "Vaga para backend python",
               "type": "Júnior",
               "site": "Salvador-BA",
               "workload": "40",
               "salary": "2970",
               "endingDate": "2022-03-23",
               "startingDate": "2021-11-15",
               "createdAt" : "2022-06-01T16:36:05.000Z",
               "updatedAt": "2022-06-01T16:36:05.000Z",
               "userId": "1",
               "user": {
                  "name": "Vinicius Andrade",
                  "email": "vini@vini.ltda"
               }
       }
       {        
               "id": 2
               "description: "Vaga programador sênior com pelo menos 5 anos de experiência, na Natan LTDA",
               "scolarity": "Ensino superior completo",
               "title": "Vaga para backend php",
               "type": "Júnior",
               "site": "Salvador-BA",
               "workload": "40",
               "salary": "10000",
               "endingDate": "2022-06-01",
               "startingDate": "2022-01-16",
               "createdAt" : "2022-06-01T16:36:05.000Z",
               "updatedAt": "2022-06-01T16:36:05.000Z",
               "userId": "2",
                "user": {
                  "name": "Natan Moura",
                  "email": "natan@ntan.ltda"
               }
       }
 }             
```
___

### POST /usuarios

**Body**

|          Name | Type     | Required | Description |
| -------------:|:--------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                                
|     `name` | required | string  | The user's name |
|     `email` | required | string  | The user's email |
|     `password` |  required | string  | The user's password to sign in |



**Response**

```
{ 
      {
      "message: "Usuário criado.",
       }
    or
       {
       "message": "Erro",
       }
 }             
```
___

### POST /usuarios/login

**Body**

|          Name | Type   | Required | Description                                                                                                                                                           |
| -------------:|:--------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                              
|     `email` | required | string  | The user's email |
|     `password` |  required | string  | The user's password to sign in |

**Response**

|          Name | Type   | Description                                                                                                                                                           |
| -------------:|:--------:|--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                                  
|     `token` |  string  | Random token to verify user access (expires in 2 hours) |




**Response**

```
{ 
      {
      "token": "string with random token",
       }
    or
       {
       "message": "Erro",
       }
 }             
```
___

### POST /vagas

**Body**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `description` | required | string  | Explains the job's requirements                                                                      |
|        `title` | required | string  | A little 'spoiler' of the job's requirement |
| `type` | required | string | Shows you the type of the job... Internship, junior, full or senior                   |
|       `site` | required | string  | Tells you the city where you will work <br/><br/> In case of home office, tells you the city your team is alocated
|    `workload` | required | int  | Your weekly workload          |
|    `salary` | required | float  | The monthly wage offer    |
|    `endingDate` | required | date  | Deadline for the job in the database (default: 3 weeks, 6 months max)  |
|    `startingDate` | required | date  | When the job starts   |
|    `scholarity` | required | string  | The minimum scholarity required fot the job   |
|    `userId` | required | int  | the job's identification code   |



**Response**

```
{ 
      {
      "message": "Vaga criada",
       }
    or
       {
       "message": "Erro",
       }
 }             
```
___
