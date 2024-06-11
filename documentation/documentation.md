# AirBeanz API Dokumentation

### Authentication
>* #### POST   `/api/auth/register`                       - Register
>* #### POST   `/api/auth/login`                          - Login
>* #### GET    `/api/auth/users`                          - Get all users
>* #### GET    `/api/auth/users/:userId`                  - Specific user
>* #### GET    `/api/auth/admin/set/:userId`              - Set admin rights on/off for specific user

### Order
>* #### GET    `/api/orders/`                             - All orders
>* #### GET    `/api/orders/history`                      - Specific user order History (only for logged in users)
>* #### GET    `/api/orders/:orderId`                     - Get specific order
>* #### GET    `/api/orders/:orderId/place`               - Place order
>* #### GET    `/api/orders/:orderId/estimatedTimeLeft`   - Place order
>* #### POST   `/api/orders/:productId`                   - Add product to order
>* #### POST   `/api/orders/discount/:discountId`         - Add whole discount to order
>* #### DELETE `/api/orders/:productId`                   - Remove product from order

### Product
>* #### GET    `/api/products/`                           - Get all products
>* #### GET    `/api/products/:productId`                 - Get specific product
>* #### POST   `/api/products/`                           - Add product to database
>* #### PUT    `/api/products/:productId`                 - Modify product in database
>* #### DELETE `/api/products/:productId`                 - Remove product from database

### Discount
>* #### GET    `/api/discounts/`                          - Get all discounts
>* #### DELETE `/api/discounts/`                          - Remove all discounts
>* #### POST   `/api/discounts/`                          - Add new discount to database
>* #### PUT    `/api/discounts/:discountId`               - Modify discount in database
>* #### DELETE `/api/discounts/:discountId`               - Remove discount from database

### About
>* #### GET    `/api/about/`                              - Get about page information

### Navigation
>* #### GET    `/api/navigation/`                         - Get navigation alternatives in menu

 