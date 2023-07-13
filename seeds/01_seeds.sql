INSERT INTO users (
  name, email, password) 
  VALUES (
  'Nico Suave', 'nsuave@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
  INSERT INTO users (
  name, email, password) 
  VALUES (
  'Rico Pico', 'rpico@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
  INSERT INTO users (
  name, email, password) 
  VALUES (
  'Ron Burgundy', 'rburger@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (
  'Cottage 1', 'Description', 1, 'imglink234.png', 'imglink123.png', 2438, 8, 2, 1, true, 'Ontario', 'Toronto', 'Canada', '78 Mill rd', 'M9C1U8');
  INSERT INTO properties (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (
  'Beach House', 'Description', 2, 'imglink224.png', 'imglink113.png', 36317, 1, 3, 0, true, 'Quebec', 'Montreal', 'Canada', '1950 Roady rd', '19755');
  INSERT INTO properties (
  title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
  VALUES (
  'The Cabin', 'Description', 1, 'imglink524.png', 'imglink513.png', 34565, 0, 1, 1, true, 'Alberta', 'Canmore', 'Canada', '123 4th st', 'T1W 2G8');

INSERT INTO reservations (
  guest_id, property_id, start_date, end_date) 
  VALUES (
  1, 3, '2018-09-11', '2010-11-18');
  INSERT INTO reservations (
  guest_id, property_id, start_date, end_date) 
  VALUES (
  2, 2, '2019-01-04', '2021-06-28');
  INSERT INTO reservations (
  guest_id, property_id, start_date, end_date) 
  VALUES (
  3, 1, '2020-04-21', '2020-04-13');

INSERT INTO property_reviews (
  guest_id, property_id, reservation_id, rating, message) 
  VALUES (
  3, 1, 2, 4, 'messages');
  INSERT INTO property_reviews (
  guest_id, property_id, reservation_id, rating, message) 
  VALUES (
  2, 2, 2, 4, 'messages');
  INSERT INTO property_reviews (
  guest_id, property_id, reservation_id, rating, message) 
  VALUES (
  3, 2, 1, 3, 'messages');