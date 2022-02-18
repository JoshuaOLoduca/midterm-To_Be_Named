INSERT INTO users(name)
VALUES
  ('Troy Garrison'),
  ('Nathan Fletcher'),
  ('Chelsea Maldonado'),
  ('Richard Alford');


INSERT INTO maps (owner_id,city,title,description,cover_img)
VALUES
(1, 'Toronto', 'Restaurants', 'My Favourite Restaurants', 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/12/unhealthiest-foods-planet.jpg?quality=82&strip=1&resize=1250%2C702'),
(2, 'Toronto', 'Cats', 'My Favourite Cat Locations', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=980:*'),
(3, 'Toronto', 'Cafes', 'My Favourite Cafes', 'https://www.thespruceeats.com/thmb/7k46XrSAjTD8hzI0BBGtWu4YjrE=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cafe-au-lait-recipe-1374920-hero-01-0b1bbc7d69304240a1e864cef38eff88.jpg'),
(4, 'Toronto', 'Dog Parks', 'My Favourite Dog Parks', 'https://i.redd.it/l5h5l8irgbj31.png'),
(1, 'Toronto', 'Pokemons', 'My Favourite Pokemon Locations', 'https://static01.nyt.com/images/2020/01/21/multimedia/31xp-pokemongo/21xp-pokemongo-superJumbo.jpg?quality=75&auto=webp'),
(2, 'Toronto', 'Pubs', 'My Favourite Pubs', 'https://www.firkinpubs.com/wp-content/uploads/2019/06/FirkinChurchmouse-Blog-1024x576.jpg'),
(3, 'Toronto', 'Clubs', 'My Favourite Clubs', 'https://upload.wikimedia.org/wikipedia/commons/3/32/Wikipedia_space_ibiza%2803%29.jpg'),
(4, 'Toronto', 'Libraries', 'My Favourtite Libraries', 'https://cdn.britannica.com/92/216092-050-4B31C2B7/custom-library.jpg?q=60'),
(1, 'Toronto', 'Shops', 'My Favourite Shops', 'https://www.bhf.org.uk/-/media/news-images/2020/december/england-shop-640-x-410.jpg?w=100%25&la=en&rev=c2480dbfad1a4a4e9e12de71a6b60808&hash=D39E54F89D7DF5588D45B25DF88F902A07469DA9'),
(2, '', 'Airports', 'Canadian Airports', 'https://www.passengerterminaltoday.com/wp-content/uploads/2020/12/Airport-funding-e1607529091397-702x459.jpg'),
(3, '', 'Cities', 'Cities To Travel To', 'https://badgut.org/wp-content/uploads/Image-Content-travel-abroad.png'),
(4, '', 'Beaches', 'Beaches To Visit', 'https://lh3.googleusercontent.com/h_bcmzTE2T0mQ-5kysgk-Vla4Y13rNhVZ2xBw6yow3tMwMHroX3LUUPKgTYyx4wQw2rTXR9xrF991B_Ctrd7TVZoibo=w640-h400-e365-rj-sc0x00ffffff'),
(1, '', 'Sunsets', 'Must See Sunsets', 'https://earthsky.org/upl/2013/09/sunrise-red-sea-Graham-Telford-e1489764712368.jpg'),
(2, '', 'Donuts', 'Best Places To Get Donuta', 'https://www.bakemag.com/ext/resources/images/2020/11/DuckDonuts_ChocolateBase.jpg?t=1606317756&width=1080'),
(3, '', 'Bakeries', 'Best Bakeries', 'https://www.mashed.com/img/gallery/the-best-bakery-in-every-state/intro-1601499029.jpg'),
(4, '', 'Ice Cream Parlours', 'Coldest Ice Cream', 'https://www.eatwell101.com/wp-content/uploads/2020/02/chicken-soup-recipe-3.jpg'),
(1, '', 'Pasta', 'Must-see Italian Resturants', 'https://www.budgetbytes.com/wp-content/uploads/2021/10/Creamy-Mushroom-Pasta-V4.jpg'),
(2, '', 'Sushi', 'The Most Fresh Sushi', 'https://cdn-abhih.nitrocdn.com/KQYMGOLIdXGmoAcyJsPOrQDKktgCbwtG/assets/static/optimized/rev-164325c/wp-content/uploads/2020/01/Sushi-Rolls-Maki-Sushi-%E2%80%93-Hosomaki-1106-II.jpg'),
(3, '', 'Vegans', 'Boring Food', 'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1'),
(4, '', 'Bathrooms', 'Publics Washrooms', 'https://cdn.shopify.com/s/files/1/1456/4892/products/RR-16_Unisex_Washroom_large.png?v=1500479127'),
(1, '', 'French Restaurants', 'Places To Eat In France', 'https://www.namesnack.com/images/namesnack-french-restaurant-business-names-3401x2587-2020084.jpeg?crop=21:16,smart&width=420&dpr=2'),
(2, '', 'Burgers', 'Best Burgers', 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2240,c_limit/Smashburger-recipe-120219.jpg'),
(3, '', 'Shawarmas', 'Favourite Shawarmas', 'https://www.vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/2019/08/osmows_logo.jpg;w=960'),
(4, '', 'Chinese Restaurants', 'Best Chinese Food', 'https://asiasociety.org/files/160802_chinese_food.jpg'),
(1, '', 'Greek Food', 'Best Greek Food', 'https://fravel.co/wp-content/uploads/2021/06/traditional-greek-food.jpeg'),
(2, '', 'Water Fountains', 'Best Filtered Water', 'https://wlssd.com/wp-content/uploads/2017/02/water-fountain-pic-333x478.jpg');

INSERT INTO user_favourites (user_id,map_id)
VALUES
(1, 10),
(1, 26),
(1, 3),
(1, 6),
(2, 7),
(2, 17),
(2, 20),
(2, 3),
(3, 13),
(3, 18),
(3, 7),
(3, 1),
(4, 1),
(4, 19),
(4, 15),
(4, 23),
(1, 12),
(1, 26),
(1, 19),
(2, 9),
(2, 6),
(2, 10),
(3, 9),
(3, 22),
(3, 5),
(4, 21),
(4, 20),
(4, 12),
(1, 2),
(1, 8),
(1, 6),
(2, 19),
(2, 3),
(2, 11),
(3, 19),
(3, 25),
(4, 21),
(4, 1),
(4, 14),
(1, 13),
(2, 7),
(3, 11),
(4, 17);


INSERT INTO collaborators (user_id,map_id)
VALUES
(1, 26),
(1, 10),
(2, 3),
(2, 11),
(3, 1),
(3, 18),
(4, 20),
(4, 12);

INSERT INTO places (latitude,longitude,title,description,img_url,map_id)
VALUES (43.647690, -79.386436, 'Minami Toronto','cool restaurant', 'https://lh5.googleusercontent.com/p/AF1QipPsQJ0VVWENf5JFRidIigmbotj5ZlJqhMFlVxBS=w90-h90-n-k-no', 1),
(43.646470, -79.396890, 'Figo Toronto', 'soccer player name', 'https://lh5.googleusercontent.com/p/AF1QipMqLbbk3n4IeRZlndlZAPoHrHKQD1jc1aL9-5b-=w90-h90-n-k-no', 1),
(43.648520, -79.395880, 'Aloette Restaurant', 'sounds italia', 'https://lh5.googleusercontent.com/p/AF1QipOedfVO3erki6JjrKvEArQACysFG0pesXiMk3zu=w90-h90-n-k-no',1),
(43.648610, -79.390860, 'MARKED restaurant', 'marked for death' , 'https://lh5.googleusercontent.com/p/AF1QipOsKLJxMsVVhtUarSslUdNfXkQuv3VKccEvsdHA=w90-h90-n-k-no',1);


