# Products - `/api/products/`

* [#### GET    `/api/products/`                           - Get all products](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/productDocumentation.md#get---apiproducts)
* [#### GET    `/api/products/:productId`                 - Get specific product](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/productDocumentation.md#get---apiproductsproductid)
* [#### POST   `/api/products/`                           - Add product to database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/productDocumentation.md#post---apiproducts)
* [#### PUT    `/api/products/:productId`                 - Modify product in database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/productDocumentation.md#put---apiproductsproductid)
* [#### DELETE `/api/products/:productId`                 - Remove product from database](https://github.com/Jaerker/AirBeanz-API-individual/blob/main/documentation/productDocumentation.md#delete---apiproductsproductid)


## GET - `/api/products/`
Hämtar alla produkter från databasen

### Returns
* Successful Response
```
    success: true,
    message: 'Products found.',
    status: 200,
    products: [...]
```

## GET - `/api/products/:productId`

Hämtar specifik produkt från databasen

### Returns
* Successful Response
```
    success: true,
    message: 'Product found.',
    status: 200,
    product: {...}
```

## POST - `/api/products/`
**Endast admin kan göra detta.**

Skapar ny produkt till databasen. 

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Req.body
```
	title: string,                      //Required, minst 4 karaktärer, högst 30 karaktärer
    desc: string,                       //Required, minst 10 karaktärer
    price: number,                      //Required, måste vara positivt
    estimatedTimeInMinutes?: number     //Måste vara positivt, t.ex 0.2 för 12 sekunder
```

### Returns
* Successful Response
```
    success: true,
    message: 'Product successfully added.',
    status: 200,
    addedProduct: {...}
```

## PUT - `/api/products/:productId`
**Endast admin kan göra detta.**

Modifierar produkt i databasen. *Du behöver inte skicka med hela objektet i req.body, utan bara de värden som ska ändras. Se till att inte skicka fler saker i bodyn, då det kommer att hindra hela modifieringen. Ta endast med de värden du vill ändra, vars nycklar redan finns i produkten.*

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Req.body
```
	title?: string,                      //Minst 4 karaktärer, högst 30 karaktärer
    desc?: string,                       //Minst 10 karaktärer
    price?: number,                      //Måste vara positivt
    estimatedTimeInMinutes?: number      //Måste vara positivt, t.ex 0.2 för 12 sekunder
```
### Returns
* Successful Response
```
    success: true,
    message: 'Product successfully updated.',
    status: 200,
    updatedProduct: {...}
```

## DELETE - `/api/products/:productId`
**Endast admin kan göra detta.**

Tar bort produkt från databasen.

### Headers
```
authorization: "eafyasd..." // Värdet ska vara den token man får när man loggar in 
```

### Returns
* Successful Response
```
    success: true,
    message: 'Product successfully removed.',
    status: 200,
    removedProduct: {...}
```
