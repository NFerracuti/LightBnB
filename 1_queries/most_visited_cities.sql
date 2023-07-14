SELECT city,
count(reservations) as total_reservations
FROM properties
JOIN reservations ON reservations.property_id = properties.id
GROUP BY city
ORDER BY count(reservations) DESC;