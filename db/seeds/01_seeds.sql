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
(4, '', 'Gas Station Bathrooms', 'Yuck', 'https://cdn.shopify.com/s/files/1/1456/4892/products/RR-16_Unisex_Washroom_large.png?v=1500479127'),
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
(2, 6);

INSERT INTO user_favourites (user_id,map_id)
VALUES
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
VALUES
(43.647690, -79.386436, 'Minami Toronto','cool restaurant', 'https://lh5.googleusercontent.com/p/AF1QipPsQJ0VVWENf5JFRidIigmbotj5ZlJqhMFlVxBS=w90-h90-n-k-no', 1),
(43.646470, -79.396890, 'Figo Toronto', 'soccer player name', 'https://lh5.googleusercontent.com/p/AF1QipMqLbbk3n4IeRZlndlZAPoHrHKQD1jc1aL9-5b-=w90-h90-n-k-no', 1),
(43.648520, -79.395880, 'Aloette Restaurant', 'sounds italia', 'https://lh5.googleusercontent.com/p/AF1QipOedfVO3erki6JjrKvEArQACysFG0pesXiMk3zu=w90-h90-n-k-no',1),
(43.648610, -79.390860, 'MARKED restaurant', 'marked for death' , 'https://lh5.googleusercontent.com/p/AF1QipOsKLJxMsVVhtUarSslUdNfXkQuv3VKccEvsdHA=w90-h90-n-k-no',1),
(45.54790208, -73.59293044, 'Boulangerie de Froment et de Sève - Maison Mère', 'Laughs in french', 'https://www.cordonbleu.edu/Files/MediaFile/58500.jpg', 15),
(45.46978784, -73.62827278, 'La Meunerie Urbaine', 'Bonjour bonjour boulangerie', 'https://blog.wego.com/wp-content/uploads/shutterstock_191870003_wpyl1x-1000x675.jpg', 15),
(43.64656334, -79.37824724, 'La Diperie', 'More ice cream for the lactose tolerant', 'https://cdn.vox-cdn.com/thumbor/1tWkTqHoi7ZFp0Vz4RKr17HZkmQ=/0x0:640x480/1820x1213/filters:focal(269x189:371x291):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/55116285/18835555_1323416814372938_8223777131431739119_n.0.jpg', 16);

INSERT INTO places (latitude,longitude,title,description,img_url,map_id)
VALUES
(43.64226603, -79.37340183, 'Bang Bang Ice Cream', 'Not for the lactose intolerant', 'http://pinchables.net/wp-content/uploads/2017/09/DSC_0701-940x627.jpg', 16),
(41.83882027, 12.49278442, 'Da Vittorio', 'Ciao bella', 'https://i.insider.com/55bf871b2acae700448b9f0b?width=1300&format=jpeg&auto=webp', 17),
(43.30576504, 12.33343892, 'Club del Doge Restaurant', 'Luxorius italian food', 'https://i.insider.com/55b7e81e371d222e008ba920?width=1300&format=jpeg&auto=webp', 17),
(35.28124087, 138.45749129, 'Sushi Asano', '#1 Sushi', 'https://images.getbento.com/accounts/25fd617895d952103480e78213c748cf/media/images/1578494522600.jpeg?w=1200&fit=max&auto=compress,format', 18),
(35.37025092, 138.4461014, 'Miku', 'Who does not love sushi?', 'https://www.washingtonian.com/wp-content/uploads/2020/12/10.2019_Dining_Area_09.jpg', 18),
(37.46344798, -120.78089307, 'Veganism', 'Eat your greens', 'https://ucarecdn.com/3103a696-ee98-4e78-afc7-8add889a75eb/-/format/auto/-/preview/3000x3000/-/quality/lighter/', 19),
(43.38778739, -79.78090061, 'Bathroom Yucky #2', 'Gross', 'https://preview.redd.it/7geddh8scy801.jpg?auto=webp&s=6aa71e1619024ff11d266b042543265feeec5ce8', 20),
(43.39791968, -79.78334002, 'Bathroom Yuck #1', 'Still ew', 'https://preview.redd.it/w6fpzpwc65261.jpg?auto=webp&s=8e386b45b4d64f6ac8c23939d690495648a40349', 20),
(46.37200932, 2.61600599, 'Poulet', 'I think this is chicken', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Poulet_de_chair.jpg/440px-Poulet_de_chair.jpg', 21),
(46.37425971, 2.68452996, 'Fromage', 'Cheesy restaurant somewhere in France', 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/milk-dairy/2-1-3-1dairyfoods_cheese_detailfeature.jpg?sfvrsn=a580dd8c_4', 21),
(46.38464338, 2.70477218, 'Le Petit Prince', 'Book or restaurant?', 'https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG', 21),
(43.654149, -79.397721, 'Cute Cat', 'might be aggro', 'https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg', 2),
(43.656199, -79.415660, 'Man Cat', 'Manly Cat', 'https://upload.wikimedia.org/wikipedia/en/9/94/StalkingCat.jpg', 2),
(43.656199, -79.455660, 'Magnificent Cat', 'Most Magnificent of Them All', 'https://cdn.vox-cdn.com/uploads/chorus_image/image/65936299/cats4.0.jpg',2),
(43.684186, -79.416306, 'Shoppers Cat', 'Loves Shopping', 'https://assets3.thrillist.com/v1/image/2957566/792x1502/flatten;scale;webp=auto;jpeg_quality=70',2),
(43.63992262814454, -79.392865016172, 'Music Garden Café', 'Music', 'https://lh5.googleusercontent.com/p/AF1QipPNpY4C0Ucs1jNJckymALrzUutKch3oUqMLAxLo=w426-h240-k-no',3),
(43.65778154163094, -79.40226711774369, 'The Arch Café', 'archy', 'https://lh5.googleusercontent.com/p/AF1QipPMBCAoDg5hzMdrVMDBEOI9CVhaoW_evkyhjobD=w426-h240-k-no', 3),
(43.64785732903048, -79.40918594390718, 'Cafe 23', 'it''s number 23', 'https://lh5.googleusercontent.com/p/AF1QipMl8rd0-_-zSIsPlQhSs-quhvVyz6Jci59UMuU7=w408-h483-k-no',3),
(43.66471873390761, -79.42096008667663, 'Christie Pits Park', 'christie''s park!', 'https://lh5.googleusercontent.com/p/AF1QipOU1GbeFAxcolSMb1CIfIS2oxUATBszAgxQnDcn=w408-h306-k-no', 4),
(43.660717955540704, -79.41887129477891, 'Bickford Park', 'great place for murder', 'https://lh5.googleusercontent.com/p/AF1QipPSWg2-ZpVFkau22rE6mfEZyXFQs6-yYcjCkHaH=w426-h240-k-no', 4),
(43.66163382631529, -79.4215964189458, 'Charizard', '🔥BEST POKEMON🔥', 'https://imageio.forbes.com/specials-images/imageserve/6061e29ea09768a4efcbc023/Base-Set-Charizard/960x0.jpg?fit=bounds&format=jpg&width=960', 5),
(43.68163382631529, -79.4615964189458, 'Pikachu', '😲😲😲😲😲😲😲😲😲', 'https://c.tenor.com/ZhKMg4_yCTgAAAAC/surprised-pikachu.gif',5),
(43.63163382631529, -79.4115964189458, 'infernape', 'monkay', 'https://wallpapers.com/images/high/pokemon-cute-jigglypuff-rj46nbgsd51rejka.jpg', 5),
(43.12434, -79.4243, 'Mew', 'Cool rare missingno', 'https://i.imgur.com/HaGnsHF.jpg', 5),
(43.662076537735814, -79.42741850030879, 'The Black Horse', 'Horses', 'https://lh5.googleusercontent.com/p/AF1QipMUav5cIvQEJWjjSyCvvF-0Hgt9XJpb_QmAqTEs=w408-h303-k-no', 6),
(43.66305447880841, -79.42271927044618, 'Christie Pits Pubs', 'You''ve heard of the park here''s the pub', 'https://lh5.googleusercontent.com/p/AF1QipO2mBD00bhScTi7mTgRzmAS4pabYtK61d4iHSiC=w408-h306-k-no', 6),
(43.64781392113086, -79.39286773029355, 'Orchid Nightclub', 'flowers maybe', 'https://lh5.googleusercontent.com/p/AF1QipOua8xi9xEGAo84Z5y3HI9JhWTnVfgTNJznA8hP=w408-h306-k-no', 7),
(43.645051695097, -79.39929977532377, 'Everleigh', 'looks bad', 'https://lh5.googleusercontent.com/p/AF1QipMAU5Tnw8YKaqDyc_8UzwYo8-mt6Zio7Co2leX2=w408-h240-k-no-pi-0-ya74.5128-ro-0-fo100', 7);


INSERT INTO places (latitude,longitude,title,description,img_url,map_id)
VALUES (43.65844169952611, -79.4439522315782, 'Club Paradise', 'might be a strip club', 'https://lh5.googleusercontent.com/p/AF1QipMg2wvP40cjeKv-VtQfajFNF1OF80vFvO2rFSA9=w408-h306-k-no', 7),
(43.665799530034256, -79.4539381967033, 'Toronto Public Library - Perth/Dupont Branch', 'GoodStuff', 'https://lh5.googleusercontent.com/p/AF1QipNDu5KP51K80tiCbWt9g0NTqQqiBH2pfiOijAOo=w412-h240-k-no', 8),
(43.66033552402384, -79.43389673235777, 'Toronto Public Library - Bloor/Gladstone Branch', 'lololo', 'https://lh5.googleusercontent.com/p/AF1QipMsoeUqzpmZBKyl1kaSiONa6QFLhLv-I9u2dyM4=w412-h240-k-no', 8),
(43.65797524502455, -79.44805879548753, 'Bloor Gift & Smoke', 'poooper', 'https://lh5.googleusercontent.com/p/AF1QipP5qpaaEiCYRFTqzUPf0_ERj2MeIUsW-GbrBjrL=w425-h240-k-no', 9),
(43.6620113652221, -79.42793150045956, 'Stop''n Shop', 'reeeeeeeeee', 'https://lh5.googleusercontent.com/p/AF1QipONglwkDl1JpijvM_g3-txoZ6xPERnoEKUpwJGM=w408-h273-k-no', 9),
(43.655538516313385, -79.42080703068355, 'The Monocle Shop Toronto', 'Who buys monocles', 'https://lh5.googleusercontent.com/p/AF1QipNhy692qPcPxRPexfB0g6QpxWTmY63re_Svn-B_=w426-h240-k-no', 9),
(43.63037756948579, -79.3958305991716, 'Billy Bishop Toronto City Airport', 'airport', 'https://lh5.googleusercontent.com/p/AF1QipPbx63K3h0uWEPrYB599LA6zKtKjjNrkVo6ksxX=w426-h240-k-no', 10),
(43.67989021448427, -79.6251630247464, 'Toronto Pearson International Airport', 'mikyu airport', 'https://lh5.googleusercontent.com/p/AF1QipOOP4sQUq2JQL6fmF9ViPk_Q-8Egu6QdeRQDWI6=w426-h240-k-no', 10),
(45.50535058009992, -73.6897916462807, 'Montreal', 'that''s a city', 'https://lh5.googleusercontent.com/p/AF1QipPPkCA6R6y0ZMVeA--3bbqmjMZpYjs57YVwX1EI=w450-h240-k-no', 11),
(41.891140106550054, 12.476945098980998, 'Rome', 'Pasta City', 'https://lh5.googleusercontent.com/p/AF1QipMAobJv8oE32VMVi4KfgIq0pgctCToxophekhZ8=w520-h240-k-no', 11),
(48.85692955130069, 2.3403399119873507, 'Paris', 'Croissant', 'https://lh5.googleusercontent.com/p/AF1QipPSqJhEkbBMLIbQ7hzEL04Mx8uAaO2_jzLP9OF_=w426-h240-k-no', 11),
(51.498853256628955, -0.1300018096705632, 'London', 'The England One Or Monocle Wearing One', 'https://lh5.googleusercontent.com/p/AF1QipOGaw6tXgMSz2VwifyPJ2enTn59j6gN7CRUe3lN=w408-h544-k-no', 11),
(23.07691331416053, -80.7735031193244, 'La Teja', 'it''s somewhere in cuba and there''s sand', 'https://lh5.googleusercontent.com/p/AF1QipMavmg-RWARDUGwOT0T4-qXaivdPojmO4YTg_3p=w408-h318-k-no', 12),
(43.62144783698434, -79.3961083359115, 'hanlan''s point beach', 'nude people', 'https://lh5.googleusercontent.com/p/AF1QipMhKk1hrP36V2YgYWnTabwMik7Xb-veqLvMfn0D=w408-h271-k-no', 12),
(43.62144783698434, -79.3961083359115, 'hanlan''s point beach', 'not clothed people with a view', 'https://lh5.googleusercontent.com/p/AF1QipMhKk1hrP36V2YgYWnTabwMik7Xb-veqLvMfn0D=w408-h271-k-no', 13),
(43.6409835866911, -79.44133406039191, 'Glory Hole Doughnuts', 'It''s not what you think', 'https://lh5.googleusercontent.com/p/AF1QipO_GPdSBs79F4YLByJcpx9Y2BdKEjiU6l_B63wu=w426-h240-k-no', 14),
(43.64688410919249, -79.39893370272085, 'COPS', 'dont''t go there if you are a criminal', 'https://lh5.googleusercontent.com/p/AF1QipPE7j1wvvCkapZ4bC9_jpGF6vllaTLQphUx11Fh=w408-h544-k-no', 14);



INSERT INTO places (latitude,longitude,title,description,img_url,map_id)
VALUES
(43.6568676, -79.3810074, 'Five Guys', 'Five guys make a burger', 'https://assets3.thrillist.com/v1/image/2835023/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg', 22),
(43.65307758, -79.37534213, 'McDonalds', 'Cheap eats', 'https://static.wikia.nocookie.net/ronaldmcdonald/images/b/b5/Mcdonalds-logo-current-1024x750.png/revision/latest/scale-to-width-down/180?cb=20180730081148', 22),
(43.64867937, -79.37401426, 'The Works', 'Juicy burgers', 'https://www.servcon.ca/wp-content/uploads/2018/07/logo-The-Works.jpg', 22),
(43.64726623, -79.40247221, 'Osmows', 'LOL', 'https://www.vmcdn.ca/f/files/orilliamatters/images/business/2019-10-31-osmows-1.JPG;w=960;h=640;bgcolor=000000', 23),
(43.65682179, -79.40725625, 'Istanbul Shawarma', 'Biggest shawarmas', 'https://i2.wp.com/bakingmischief.com/wp-content/uploads/2016/05/chicken-shawarma-with-yogurt-sauce-photo.jpg', 23),
(43.39376726, -79.82375338, 'Light Wok', 'Wok in the park', 'https://www.thespruceeats.com/thmb/y_UVe4KycpiCMyYDTs56mFmk6P0=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-653331766-5a5412be9802070037dd0491.jpg', 24),
(43.39076773, -79.82256399, 'JF Chen', 'Chicken fried rice', 'https://www.jfchen.ca/wp-content/uploads/2021/07/a-4.jpg', 24),
(43.645220, -79.397410, 'Myth', 'Yummy greek in toronto', 'https://torontolife.com/wp-content/uploads/2021/07/Renee-Suen-TL-June-2021-Myth-MEZE-3.jpg', 25),
(41.853750, 12.478990, 'Illios', 'Greek food in italy', 'https://www.foodies10best.com/wp-content/uploads/2016/06/Ilios-Greek-Restaurant_Rome.jpg', 25),
(43.254480, -79.817930, 'Hayward Fountain', 'Drinking water', 'https://www.siouxfalls.org/-/media/Images/parks/park-locations/hayward/2090-jpg.ashx?h=600&w=800&hash=0F8ABAC5B020891FF149F4EEDF92477B', 26),
(43.656551, -79.451363, 'High Park Fountain', 'Fancy water', 'https://www.highparkzoo.ca/wp-content/uploads/2021/01/HIGH-PARK-ZOO-MAP-BLEED-sm2.jpg', 26);
