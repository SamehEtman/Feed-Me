
# [Feed Me](https://sameh-feed-me.herokuapp.com)

Back end API for Feed-me website which helps your find the restaurants around you

## Usage
Rename "config/dev.env.env" to "config/dev.env" and update the values/settings to your own
## Install Dependencies
```bash
npm install
```
## Run App
```bash
# Run in dev mode
npm run dev
```
```bash
# Run in prod mode
npm start
```

# Documentaion 

* The app is launched to heroku : [feed-me](https://sameh-feed-me.herokuapp.com)
## Indices

* [Admin](#admin)

  * [Create user](#1-create-user)
  * [Delete user](#2-delete-user)
  * [Get a single user](#3-get-a-single-user)
  * [Get all users](#4-get-all-users)
  * [Update user](#5-update-user)

* [Restaurants](#restaurants)

  * [Create restaurant](#1-create-restaurant)
  * [Delete restaurant](#2-delete-restaurant)
  * [Get all restaurants](#3-get-all-restaurants)
  * [Get restaurant within radius](#4-get-restaurant-within-radius)
  * [Update restaurant](#5-update-restaurant)
  * [Update restaurant picture](#6-update-restaurant-picture)
  * [get single restaurant](#7-get-single-restaurant)

* [Reviews](#reviews)

  * [Create a review](#1-create-a-review)
  * [Delete review](#2-delete-review)
  * [Get a single reveiw](#3-get-a-single-reveiw)
  * [Get all reviews](#4-get-all-reviews)
  * [Get reviews for a specific restaurant](#5-get-reviews-for-a-specific-restaurant)
  * [Update review](#6-update-review)

* [Servings](#servings)

  * [Create Serving](#1-create-serving)
  * [Delete serving](#2-delete-serving)
  * [Get all servings](#3-get-all-servings)
  * [Get servings for specific restaurant](#4-get-servings-for-specific-restaurant)
  * [Get single serving](#5-get-single-serving)
  * [Update a serving](#6-update-a-serving)

* [Users](#users)

  * [Create user](#1-create-user-1)
  * [Delete user](#2-delete-user-1)
  * [Forgot password](#3-forgot-password)
  * [Get user Profile](#4-get-user-profile)
  * [Login user](#5-login-user)
  * [Logout user](#6-logout-user)
  * [Reset password](#7-reset-password)
  * [Update password](#8-update-password)
  * [Update user details](#9-update-user-details)


--------


## Admin
Admin CRUD operations



### 1. Create user


Create a new user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/admin
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "hello",
    "email" : "h4k@g.com",
    "password" : "123456"
}
```



### 2. Delete user


Delete a user by id


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/admin/611ab2e3d18a4c075b72bafa
```



### 3. Get a single user


Fetch a user by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/admin/611ab2d9d18a4c075b72baf8
```



### 4. Get all users


Fetch all users in the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/admin
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| sort | -createdAt |  |
| skip | 1 |  |
| limit | 1 |  |



### 5. Update user


Update a user by id


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/admin/611ab2d9d18a4c075b72baf8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "edited"
}
```



## Restaurants
Restaurants CRUD operations



### 1. Create restaurant


Create a new restaurant


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "Adam Cafe2",
    "email" : "ad1am23@afion.com",
    "address" : "shobra millis zefta",
    "averageRating" : 8
}
```



### 2. Delete restaurant


Delete a restaurant by id, Requires an authenticated user.


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/6118604f91f10dbc32670992
```



### 3. Get all restaurants


Fetch all restaurants in the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants
```



### 4. Get restaurant within radius



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/radius
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| lat | 30.852144 |  |
| lon | 31 |  |
| radius | 50 |  |



### 5. Update restaurant


Update a restaurant by id, Requires an authenticated user.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "edited"
}
```



### 6. Update restaurant picture


Update restaurant picture


***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23/photo
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



### 7. get single restaurant


Fetch a single restaurant by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23
```



## Reviews
CRUD operations for reviews ,
Publishers aren't allowed to post reviews, only users can do that.



### 1. Create a review


Create a review for a restaurant ,
requires user role and authentication.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "title" : "bad restaur",
    "text": "hate every thing",
    "rating" : 7
}
```



### 2. Delete review


Delete a review , requires authentication


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/reviews/611ac868ea5b915230f0d1fa
```



### 3. Get a single reveiw


Fetch a single review by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/reviews/611ac0a36029ca31bea1336a
```



### 4. Get all reviews


Fetch all the reviews in the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/reviews
```



### 5. Get reviews for a specific restaurant


Fetch all reviews for a specific restaurant


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23/reviews
```



### 6. Update review


Update a review , requires authentication.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/reviews/611ac866ea5b915230f0d1f4
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "rating":10
}
```



## Servings
Servings CRUD operations



### 1. Create Serving


Create a serving for a specific restaurant ,
requires publisher role and authenticated user .


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611ab3cbd18a4c075b72bb23/servings
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "crep4",
    "price" : 50,
    "components" : ["katchap" , "bread" , "chicken"],
    "description" : "syrian good crep"
}
```



### 2. Delete serving


Delete a serving ,
requires publisher role and authenticated user .


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/servings/611ab3ddd18a4c075b72bb2b
```



### 3. Get all servings


Fetch all servings


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/servings
```



### 4. Get servings for specific restaurant


Fetch all servings of a specific restaurant


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/restaurants/611861b55ee30ec300cd5e5d/servings
```



### 5. Get single serving


Fetch serving by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/servings/611ab3d9d18a4c075b72bb27
```



### 6. Update a serving


update a serving ,
requires publisher role and authenticated user .


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/servings/611ab3ddd18a4c075b72bb2b
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "edited"
}
```



## Users
Users CRUD operations



### 1. Create user


Create a new user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/signup
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name":"user",
    "email" :"user@user.com",
    "password" : "123456"
}
```



### 2. Delete user


Delete authenticated user's account


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/deleteuser
```



### 3. Forgot password


This route is for resetting your forgotten password, It sends an email to your email address which contains a link  to your reset password page


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/forgotpassword
```



***Body:***

```js        
{
    "email" : "s@s.com"
}
```



### 4. Get user Profile


Fetch the authenticated user's details


***Endpoint:***

```bash
Method: GET
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/me
```



### 5. Login user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "email" :"admin@admin.com",
    "password" : "123456"
}
```



### 6. Logout user


Logout user , Clear cookies


***Endpoint:***

```bash
Method: POST
Type: 
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/logout
```



### 7. Reset password


Reset password route


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/resetpassword/2764ebbbfa2d41e72fe8de3b239b7f24e1165ea2
```



***Body:***

```js        
{
    "password" : "1235456"
}
```



### 8. Update password


Update authenticated users's password,
current password and new password are needed


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/updatepassword
```



***Body:***

```js        
{
    "currentPassword": "1234A56",
    "newPassword" : "123456"
}
```



### 9. Update user details


Update authenticated user's details


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: https://sameh-feed-me.herokuapp.com/api/v1/users/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name" : "edited",
    "email":"s3@s.com"
}
```



***Available Variables:***

| Key | Value | Type |
| --- | ------|-------------|
| url | https://sameh-feed-me.herokuapp.com |  |



---
[Back to top](#feed-me)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-08-17 00:58:56 by [docgen](https://github.com/thedevsaddam/docgen)
