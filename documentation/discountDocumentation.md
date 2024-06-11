# Discounts - `/api/discounts/` 

* #### [GET    `/api/discounts/`                          - Get all discounts](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/discountDocumentation.md#get---apidiscounts)
* #### [DELETE `/api/discounts/`                          - Remove all discounts](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/discountDocumentation.md#delete-----apidiscounts)
* #### [POST   `/api/discounts/`                          - Add new discount to database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/discountDocumentation.md#post-------apidiscounts)
* #### [PUT    `/api/discounts/:discountId`               - Modify discount in database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/discountDocumentation.md#put--------apidiscountsdiscountid)
* #### [DELETE `/api/discounts/:discountId`               - Remove discount from database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/discountDocumentation.md#delete-----apidiscountsdiscountid)

## GET - `/api/discounts/`

Hämtar alla kampanj erbjudanden från databasen.

### Filtreringsval i Query
* `active : boolean` - Hämtar endast aktiva kampanj erbjudanden. *Default:*`false`; 

### Returns 
* Successful Response
```
    success: true,
    message: 'Discounts found.',
    status: 200,
    filterOptions: {...}
    orders: [...]
```

## DELETE   - `/api/discounts/`
**Endast admin kan göra detta.**

**Gör endast detta om du vet vad du håller på med!**

Rensar kampanj erbjudanden från databasen helt.
### Returns 
* Successful Response
```
    success: true,
    message: 'Discounts removed successfully.',
    status: 200
```

## POST     - `/api/discounts/`
**Endast admin kan göra detta.**

Lägger till nytt kampanj erbjudande. 

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Req.body
```
	title: string,              //Required, minst 4 karaktärer
	desc: string,               //Required, minst 10 karaktärer
	discount: number,           //Required, måste vara positivt
	products: [{                //Required, kan innehålla flera olika produkter för att skapa erbjudanden med kombinationer
        productId: string,      //Required
        amount: number,         //Required
    }],       
    expiresAt: date             //Required, skrivs till exempel så här: "2024-05-06"
```

## PUT      - `/api/discounts/:discountId`
**Endast admin kan göra detta.**

Modifierar kampanj erbjudande. 

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Req.body
```
	title?: string,              //Minst 4 karaktärer
	desc?: string,               //Minst 10 karaktärer
	discount?: number,           //Måste vara positivt
	products?: [{                //Om det ligger en array med products så är värdena "required", men om den inte finns med så behöver man inte tänka på det.
        productId: string,       //Required
        amount: number,          //Required
    }],       
    expiresAt?: date             // skrivs till exempel så här: "2024-05-06"
```

## DELETE   - `/api/discounts/:discountId`
**Endast admin kan göra detta.**

Tar bort kampanj erbjudande. 

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

