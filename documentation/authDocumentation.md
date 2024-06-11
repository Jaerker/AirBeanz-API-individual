 # Authentication - `/api/auth`
 
* [#### POST   `/api/auth/register`                       - Register](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/authDocumentation.md#post---apiauthregister)
* [#### POST   `/api/auth/login`                          - Login](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/authDocumentation.md#post---apiauthlogin)
* [#### GET    `/api/auth/users`                          - Get all users](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/authDocumentation.md#get---apiauthusers-)
* [#### GET    `/api/auth/users/:userId`                  - Specific user](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/authDocumentation.md#get---apiauthusersuserid)
* [#### GET    `/api/auth/admin/set/:userId`              - Set admin rights on/off for specific user](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/authDocumentation.md#get---apiauthadminsetuserid)

 ## POST - `/api/auth/register`

Skapar en ny användare baserat på information från `req.body`

### Req.body
```
	username: string,		//Required
	password: string,		//Required
	verifyPassword: string, //Required
	email: string,			//Required
	firstName: string,		//Required
	lastName: string,		//Required
	address: string			//Required
```

### Returns

* #### Successful Response
```
	success: true,
	message: 'Successfully added user',
	status: 201 
```

## POST - `/api/auth/login`

Loggar in användare till hemsidan

**Returnerar en `token` som man behöver lägga till i headers för att säkerställa att man är inloggad gällande andra anrop.**

### Req.body
```
	username: string, //Required
	password: string, //Required
```

### Returns

* #### Successful Response
```
	success: true,
	message: 'Logged in succesfully!',
	status: 202,
	token: "eyhcjklas..." //Spara denna token och placera i req.headers.authorization
```

## GET - `/api/auth/users `
*KAN ENDAST ANVÄNDAS SOM ADMIN*

Returnerar alla användare.
*(Av säkerhetsskäl så skickas inte lösenorden med)*

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Returns

* #### Successful Response
```
	success: true,
	message: 'Active users found!',
	status: 202,
	users: [{...},{...}] 
```


## GET - `/api/auth/users/:userId`
*KAN ENDAST ANVÄNDAS SOM ADMIN*

Returnerar specifik användare.
*(Av säkerhetsskäl så skickas inte lösenorden med)*

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Returns

```
	"success": true,
	"message": "User found",
	"status": 201,
	"user": {
		"username": "username",
		"userId": "userId",
		"email": "din@email.se",
		"firstName": "förnamn",
		"lastName": "efternamn",
		"address": "adress",
		"isAdmin": true,
		"_id": "3wzAzlIUg0WqhOzt"
	}
```

## GET - `/api/auth/admin/set/:userId`
*KAN ENDAST ANVÄNDAS SOM ADMIN*

Antingen ger, eller tar bort, admin rättigheter till specifik användare.


### Returns

* #### Specifik användare hittad (på id)

```
	"success": true,
	"message": `User with username: ${username} has ${isAdmin ? 'no longer admin rights' : 'admin rights from now'}.`,
	"status": 201
```
