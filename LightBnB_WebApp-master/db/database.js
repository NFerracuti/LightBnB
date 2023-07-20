const { Pool } = require('pg');

const pool = new Pool({
  user: 'nick',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
}); 


const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`
    SELECT * FROM users WHERE email = '${email}';`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`
    SELECT * FROM users WHERE id = '${id}';`)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(`INSERT INTO users (
      name, email, password) 
      VALUES (
      '${user.name}', 
      '${user.email}', 
      '${user.password}')
      RETURNING *;`
      )
    .then((res) => {
      if(!res.rows.length){
        return(null)
      }
      return res.rows[0];
      })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(`
    SELECT reservations.id AS id, 
    properties.title AS title, start_date, 
    properties.cost_per_night, 
    avg(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = ${guest_id}
    GROUP BY properties.id, reservations.id
    ORDER BY start_date;
    `)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city 
    || options.owner_id 
    || options.minimum_price_per_night 
    || options.maximum_price_per_night) {
      queryString += `WHERE `
    }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    if (options.city) {
      queryString += ` AND `;
    }
    queryParams.push(`${(options.minimum_price_per_night * 100)}`);
    queryString += `cost_per_night > $${queryParams.length} `;
  }
  
  if (options.maximum_price_per_night) {
    if (options.city || options.minimum_price_per_night) {
      queryString += ` AND `;
    }
    queryParams.push(`${(options.maximum_price_per_night * 100)}`);
    queryString += `cost_per_night < $${queryParams.length} `;
  }

  if (options.owner_id) {
    if (options.city || options.minimum_price_per_night || options.maximum_price_per_night) {
      queryString += ` AND `;
    }
    queryParams.push(`%${options.owner_id}%`);
    queryString += `owner_id LIKE $${queryParams.length} `;
  }

  // 4
  queryString += `
  GROUP BY properties.id
  `
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryParams = [
    property.owner_id, 
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];
  const queryString = `
  INSERT INTO  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`

  return pool
  .query(
    queryString,
    queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
