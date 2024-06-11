# AirBeanz API Dokumentation

 [### Authentication](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#authentication---apiauth)
* [#### POST   `/api/auth/register`                       - Register](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#post---apiauthregister)
* [#### POST   `/api/auth/login`                          - Login](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#post---apiauthlogin)
* [#### GET    `/api/auth/users`                          - Get all users](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#get---apiauthusers-)
* [#### GET    `/api/auth/users/:userId`                  - Specific user](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#get---apiauthusersuserid)
* [#### GET    `/api/auth/admin/set/:userId`              - Set admin rights on/off for specific user](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/authDocumentation.md#get---apiauthadminsetuserid)

[### Order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#orders---apiorders)
* [#### GET    `/api/orders/`                             - All orders](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#get---apiorders)
* [#### GET    `/api/orders/history`                      - Specific user order History (only for logged in users)](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#get---apiordershistory)
* [#### GET    `/api/orders/:orderId`                     - Get specific order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#get---apiordersorderid)
* [#### GET    `/api/orders/:orderId/place`               - Place order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#get---apiordersorderidplace)
* [#### GET    `/api/orders/:orderId/estimatedTimeLeft`   - Get estimated time left for order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#get---apiordersorderidestimatedtimeleft)
* [#### POST   `/api/orders/:productId`                   - Add product to order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#post---apiordersproductid)
* [#### POST   `/api/orders/discount/:discountId`         - Add whole discount to order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#post---apiordersdiscountdiscountid)
* [#### DELETE `/api/orders/:productId`                   - Remove product from order](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/orderDocumentation.md#delete---apiordersproductid)

[### Product](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#products---apiproducts)
* [#### GET    `/api/products/`                           - Get all products](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#get---apiproducts)
* [#### GET    `/api/products/:productId`                 - Get specific product](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#get---apiproductsproductid)
* [#### POST   `/api/products/`                           - Add product to database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#post---apiproducts)
* [#### PUT    `/api/products/:productId`                 - Modify product in database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#put---apiproductsproductid)
* [#### DELETE `/api/products/:productId`                 - Remove product from database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/productDocumentation.md#delete---apiproductsproductid)

[### Discount](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#discounts---apidiscounts)
* [#### GET    `/api/discounts/`                          - Get all discounts](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#get---apidiscounts)
* [#### DELETE `/api/discounts/`                          - Remove all discounts](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#delete-----apidiscounts)
* [#### POST   `/api/discounts/`                          - Add new discount to database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#post-------apidiscounts)
* [#### PUT    `/api/discounts/:discountId`               - Modify discount in database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#put--------apidiscountsdiscountid)
* [#### DELETE `/api/discounts/:discountId`               - Remove discount from database](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/discountDocumentation.md#delete-----apidiscountsdiscountid)

[### About](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/aboutDocumentation.md#get---apiabout)
* [#### GET    `/api/about/`                              - Get about page information](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/aboutDocumentation.md#get---apiabout)

[### Navigation](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/navigationDocumentation.md#navigation---apinavigation)
* [#### GET    `/api/navigation/`                         - Get navigation alternatives in menu](https://github.com/Jaerker/AirBeanz-API-individual/blob/dev/documentation/navigationDocumentation.md#get---apinavigation)

 
