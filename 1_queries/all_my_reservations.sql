-- Show all reservations for a user.

-- Select the reservation id, property title, reservation start_date,
-- property cost_per_night and the average rating of the property.

-- You'll need data from both the reservations and properties tables.
-- The reservations will be for a single user, so just use 1 for the user_id.
-- Order the results from the earliest start_date to the most recent start_date.
-- Limit the results to 10.

SELECT reservations.id AS id, 
properties.title AS title, start_date, 
properties.cost_per_night, 
avg(property_reviews.rating) AS average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY start_date
LIMIT 10;