# LightBnB

## Project Summary

LightBNB is an AirBNB clone built during the Lighthouse Labs Bootcamps for the sake of learning PostgreSQL and databases interacting with Node and JS. It is built using SASS, JS, Express, and PostgreSQL.

!["Main Page"](https://github.com/NFerracuti/lightbnb/LightBnB_WebApp-master/docs/lightbnbmain.png?raw=true)

## Setup

Install dependencies with `npm i`.

### Dependencies
"bcrypt": "^3.0.6",
"cookie-session": "^1.3.3",
"express": "^4.17.1",
"nodemon": "^1.19.1"

## To Run
    
To get started, run: "npm run local"
```

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```