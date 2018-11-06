## Backend Technical Test

This is the backend implementation for a __REST API__ that allows consumers to create *articles*. Each *article* contains the following properties:
1. `title` - type: `String`, required: `true`
2. `author` - type: `String`, required: `true`
3. `content` - type: `Array`, Schema: `[...{body: String}]`, required: `true`
4. `date_created` - type: `Date`, Auto populated
5. `date_updated` - type: `Date`, Auto populated

### Prerequisites
1. **mongodb** latest version. Tested on v4.0.2
2. **NodeJS** latest version. Tested on v8.12.0
3. **npm** latest version. Tested on 6.4.1

### Steps to Run the Application
1. Clone this repository
2. `cd` into the **/backend** folder in your terminal and type `npm install`
3. Make sure you have __mongodb__ installed on your system and is running. If it's running at a port different from the default port (27017), you will need to update the config parameters in relevant config files. More on that below.
4. Create two empty databases at your mongodb instance. Default names used are: `db_articles` (for the server) and `db_articles_test` (for tests). You can use different names as well, but then you will need to update config parameters.
5. After you have the databases created, come back to the terminal pointing at the repo location, and type `npm run start:dev`. This will run the server in *dev* environment.
6. Now, you can use __Postman__ or any other similar utility to hit any of the endpoints listed below.
7. To run unit tests, go back to the terminal pointing at the repo location and type `npm run start:test`.
8. The server can also be run in production environment by typing `npm run start:prod` in the terminal pointing to the repo location.

### Endpoint Details
1. __GET /article__: responds with an array of all articles in DB. It is paginated. Will send 10 articles in one go. This can be configured via the config parameter in config files. You can pass `?page=[PAGE_NO]` to get a specific page number. The response also includes total number of pages, and current page number.
2. __POST /article__: adds a new article to DB. You will need to send article details in the body of the request. Please note that it expects the mime-type to be *x-www-form-urlencoded*, so please don't forget to check that box in **Postman** (or whichever utility you use) before issuing the request. An sample article content would look something like this:<br/> ```{
    title: "Test Article Dummy",
    author: "Test Author Dummy",
    content: [
        {body: "Article Dummy Paragraph 1"}, 
        {body: "Article Dummy Paragraph 2"}, 
        {body: "Article Dummy Paragraph 3"}
    ]
}```
3. __GET /article/:articleId__: fetches a specific article from the database based on its `_id` value.
4. __PUT /article/:articleId__: updates the article with `_id` *articleId*. Updated values need to be sent in the body of the request. You don't need to (re)send all fields of the article in your request. Just the ones that need to update will do. Please note that it expects the mime-type to be *x-www-form-urlencoded*, so please don't forget to check that box in **Postman** (or whichever utility you use) before issuing the request.
5. __DELETE /article/:articleId__: removes the article with `_id` *articleId* from the database. Please note that this action is permanent.

### Config Files and Parameters
The application has three config files inside the config folder. These are `default`, `production`, and `test`, corresponding with dev server, production server and test cases respectively.

The application will automatically pick the correct file based on the value of **NODE_ENV** variable. If you use the scripts from `package.json` to run the application (e.g. `npm run start:dev` or `npm run start:test`), the correct **NODE_ENV** value will be set by default, so you don't need to do anything additional.

However, if you are launching the application directly from terminal, you will need to set the value of **NODE_ENV** variable first.

The parameters that can be adjusted in these files are:
1. PORT on which the application will run (port)
2. Database name and url of your local mongodb instance (dbConfig)
3. The number of articles it should send per page (countPerPage)

In addition, should you want to force this application to run only on `https://`, please change the value of `usesHttps` in config file to `true`, and save your certificate files (key.pem and cert.pem) at the root of the application.