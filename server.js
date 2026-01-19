const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const pizzaProductsDB = [
    {
        "product_id": "PZ99281A12",
        "pizza_name": "Margherita",
        "price": 499,
        "is_active": true,
        "description_of_pizza": "Fresh mozzarella, San Marzano tomatoes, fresh basil, and EVOO.",
        "store_id": "3c32fe11"
    },
    {
        "product_id": "PZ88172B23",
        "pizza_name": "Double Pepperoni",
        "price": 649,
        "is_active": false,
        "description_of_pizza": "A double layer of crispy curled pepperoni with extra mozzarella.",
        "store_id": "3c32fe11"
    },
    {
        "product_id": "PZ77653C34",
        "pizza_name": "Garden Veggie",
        "price": 549,
        "is_active": true,
        "description_of_pizza": "Broccoli, corn, red onions, and diced tomatoes.",
        "store_id": "3c32fe11"
    },
    {
        "product_id": "PZ11221D45",
        "pizza_name": "Meat Lovers",
        "price": 899,
        "is_active": true,
        "description_of_pizza": "Pepperoni, Italian sausage, bacon, ham, and ground beef.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ22332E56",
        "pizza_name": "Meatball Parm",
        "price": 749,
        "is_active": false,
        "description_of_pizza": "Homemade meatballs, marinara, and extra mozzarella.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ33443F67",
        "pizza_name": "Salami Sensation",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Three types of Italian salami with red pepper strips.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ44554G78",
        "pizza_name": "Bacon Cheeseburger",
        "price": 725,
        "is_active": true,
        "description_of_pizza": "Ground beef, bacon, cheddar, and pickles.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ55665H89",
        "pizza_name": "Philly Cheesesteak",
        "price": 849,
        "is_active": false,
        "description_of_pizza": "Shaved steak, onions, peppers, and cheese whiz.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ66776I90",
        "pizza_name": "Pulled Pork",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Slow-cooked pork, coleslaw topper, and BBQ sauce.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ77887J01",
        "pizza_name": "Pastrami on Rye",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Pastrami with Swiss cheese and mustard on a dough base.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ88998K12",
        "pizza_name": "The Works",
        "price": 949,
        "is_active": true,
        "description_of_pizza": "Pepperoni, sausage, bell peppers, onions, and black olives.",
        "store_id": "1c07dd73"
    },
    {
        "product_id": "PZ99009L23",
        "pizza_name": "Inferno",
        "price": 699,
        "is_active": false,
        "description_of_pizza": "Habaneros, spicy sausage, and Satan’s Breath chili oil.",
        "store_id": "160c9c26"
    },
    {
        "product_id": "PZ10110M34",
        "pizza_name": "Jalapeño Popper",
        "price": 599,
        "is_active": true,
        "description_of_pizza": "Cream cheese base, jalapeños, bacon, and cheddar.",
        "store_id": "160c9c26"
    },
    {
        "product_id": "PZ21221N45",
        "pizza_name": "Peri-Peri Chicken",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Spicy bird’s eye chili chicken with flame-grilled peppers.",
        "store_id": "160c9c26"
    },
    {
        "product_id": "PZ32332O56",
        "pizza_name": "Spicy Paneer",
        "price": 649,
        "is_active": false,
        "description_of_pizza": "Marinated paneer cubes, capsicum, and spicy red gravy.",
        "store_id": "160c9c26"
    },
    {
        "product_id": "PZ43443P67",
        "pizza_name": "Hot Honey Sopressata",
        "price": 899,
        "is_active": true,
        "description_of_pizza": "Spicy Italian salami drizzled with habanero honey.",
        "store_id": "160c9c26"
    },
    {
        "product_id": "PZ54554Q78",
        "pizza_name": "Garlic Butter Shrimp",
        "price": 999,
        "is_active": true,
        "description_of_pizza": "Shrimp sautéed in garlic and parsley.",
        "store_id": "6b2fe722"
    },
    {
        "product_id": "PZ65665R89",
        "pizza_name": "Clam Pie",
        "price": 1049,
        "is_active": false,
        "description_of_pizza": "Fresh clams, garlic, oregano, and pecorino.",
        "store_id": "6b2fe722"
    },
    {
        "product_id": "PZ76776S90",
        "pizza_name": "Truffle Mushroom",
        "price": 949,
        "is_active": true,
        "description_of_pizza": "Shiitake and portobello mushrooms with truffle oil.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ87887T01",
        "pizza_name": "Spinach & Ricotta",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Sautéed spinach topped with dollops of creamy ricotta.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ98998U12",
        "pizza_name": "Quattro Formaggi",
        "price": 799,
        "is_active": false,
        "description_of_pizza": "A blend of Mozzarella Gorgonzola Parmesan and Fontina.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ09009V23",
        "pizza_name": "Pear & Gorgonzola",
        "price": 849,
        "is_active": true,
        "description_of_pizza": "Sliced pears, blue cheese, and toasted walnuts.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ10120W34",
        "pizza_name": "Brie & Cranberry",
        "price": 899,
        "is_active": true,
        "description_of_pizza": "Melting brie cheese with tart cranberry sauce.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ21231X45",
        "pizza_name": "Camembert Special",
        "price": 949,
        "is_active": false,
        "description_of_pizza": "Camembert slices, caramelized onions, and balsamic.",
        "store_id": "8fcce746"
    },
    {
        "product_id": "PZ32342Y56",
        "pizza_name": "Korean Bulgogi",
        "price": 999,
        "is_active": true,
        "description_of_pizza": "Ribeye beef, kimchi, scallions, and gochujang sauce.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ43453Z67",
        "pizza_name": "Thai Chili",
        "price": 849,
        "is_active": true,
        "description_of_pizza": "Sweet chili sauce, shrimp, scallions, and crushed peanuts.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ54564A78",
        "pizza_name": "Mexican Fiesta",
        "price": 799,
        "is_active": false,
        "description_of_pizza": "Chorizo, corn, jalapeños, and fresh pico de gallo.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ65675B89",
        "pizza_name": "Greek Gyro",
        "price": 849,
        "is_active": true,
        "description_of_pizza": "Lamb meat, tzatziki sauce, tomatoes, and onions.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ76786C90",
        "pizza_name": "Chicken Satay",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Peanut sauce, chicken, and pickled cucumbers.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ87897D01",
        "pizza_name": "Al Pastor",
        "price": 849,
        "is_active": false,
        "description_of_pizza": "Marinated pork, pineapple, and fresh cilantro.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ98908E12",
        "pizza_name": "Peking Duck",
        "price": 1199,
        "is_active": true,
        "description_of_pizza": "Hoisin sauce, duck, and cucumber slivers.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ09019F23",
        "pizza_name": "Banh Mi",
        "price": 899,
        "is_active": true,
        "description_of_pizza": "Pork belly, pickled carrots, daikon, and jalapeños.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ10130G34",
        "pizza_name": "German Bratwurst",
        "price": 749,
        "is_active": false,
        "description_of_pizza": "Sliced bratwurst, sauerkraut, and mustard.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ21241H45",
        "pizza_name": "Chicken Shawarma",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Spiced chicken, tahini drizzle, and pickles.",
        "store_id": "88fa832a"
    },
    {
        "product_id": "PZ32352I56",
        "pizza_name": "BBQ Chicken",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Grilled chicken, red onions, cilantro, and smoky BBQ sauce.",
        "store_id": "9d61ada6"
    },
    {
        "product_id": "PZ43463J67",
        "pizza_name": "Buffalo Chicken",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Spicy buffalo sauce, chicken, and ranch drizzle.",
        "store_id": "9d61ada6"
    },
    {
        "product_id": "PZ54574K78",
        "pizza_name": "Chicken Alfredo",
        "price": 749,
        "is_active": false,
        "description_of_pizza": "Creamy white sauce, grilled chicken, and spinach.",
        "store_id": "9d61ada6"
    },
    {
        "product_id": "PZ65685L89",
        "pizza_name": "Pesto Chicken",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Basil pesto base, chicken, and sun-dried tomatoes.",
        "store_id": "9d61ada6"
    },
    {
        "product_id": "PZ76796M90",
        "pizza_name": "Mediterranean",
        "price": 649,
        "is_active": true,
        "description_of_pizza": "Feta cheese, spinach, olives, and sun-dried tomatoes.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ87807N01",
        "pizza_name": "Roasted Root",
        "price": 699,
        "is_active": false,
        "description_of_pizza": "Roasted sweet potatoes, beets, and goat cheese.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ98918O12",
        "pizza_name": "Zucchini Blossom",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Fresh zucchini flowers and lemon zest on a white base.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ09029P23",
        "pizza_name": "Pumpkin & Sage",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Roasted pumpkin, fried sage, and caramelized onions.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ10140Q34",
        "pizza_name": "The Vegan Greek",
        "price": 799,
        "is_active": false,
        "description_of_pizza": "Vegan feta, olives, onions, and dairy-free mozzarella.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ21251R45",
        "pizza_name": "Artichoke Heart",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Marinated artichokes, garlic, and baby spinach.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ32362S56",
        "pizza_name": "Miso Eggplant",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Miso glaze, roasted eggplant, and nori strips.",
        "store_id": "a7d43f27"
    },
    {
        "product_id": "PZ43473T67",
        "pizza_name": "Nutella & Strawberry",
        "price": 599,
        "is_active": true,
        "description_of_pizza": "Nutella base with fresh berries and powdered sugar.",
        "store_id": "738088a1"
    },
    {
        "product_id": "PZ54584U78",
        "pizza_name": "S’mores",
        "price": 549,
        "is_active": false,
        "description_of_pizza": "Chocolate ganache, marshmallows, and graham crackers.",
        "store_id": "738088a1"
    },
    {
        "product_id": "PZ65695V89",
        "pizza_name": "Apple Pie",
        "price": 549,
        "is_active": true,
        "description_of_pizza": "Spiced apples, cinnamon streusel, and caramel.",
        "store_id": "738088a1"
    },
    {
        "product_id": "PZ76706W90",
        "pizza_name": "Banoffee",
        "price": 649,
        "is_active": true,
        "description_of_pizza": "Banana slices, toffee sauce, and whipped cream.",
        "store_id": "738088a1"
    },
    {
        "product_id": "PZ87817X01",
        "pizza_name": "Tiramisu",
        "price": 699,
        "is_active": false,
        "description_of_pizza": "Coffee-soaked crust with mascarpone and cocoa.",
        "store_id": "738088a1"
    },
    {
        "product_id": "PZ98928Y12",
        "pizza_name": "Smoked Salmon",
        "price": 1199,
        "is_active": true,
        "description_of_pizza": "Cream cheese, capers, onions, and smoked salmon.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ09039Z23",
        "pizza_name": "Lobster Roll Pizza",
        "price": 1899,
        "is_active": true,
        "description_of_pizza": "Butter-poached lobster and chives on a white base.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ10150A34",
        "pizza_name": "Calamari Fritti",
        "price": 949,
        "is_active": false,
        "description_of_pizza": "Lightly fried calamari on a spicy marinara base.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ21261B45",
        "pizza_name": "Seafood Paella",
        "price": 1299,
        "is_active": true,
        "description_of_pizza": "Shrimp, mussels, and saffron-infused sauce.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ32372C56",
        "pizza_name": "Crab Cake Pizza",
        "price": 1199,
        "is_active": true,
        "description_of_pizza": "Lump crab meat, Old Bay seasoning, and lemon.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ43483D67",
        "pizza_name": "Scallop & Bacon",
        "price": 1149,
        "is_active": false,
        "description_of_pizza": "Bay scallops with crispy bacon and cream sauce.",
        "store_id": "ee34f45b"
    },
    {
        "product_id": "PZ54594E78",
        "pizza_name": "Marinara",
        "price": 399,
        "is_active": true,
        "description_of_pizza": "Tomato sauce, garlic, oregano, and olive oil.",
        "store_id": "e074749e"
    },
    {
        "product_id": "PZ65605F89",
        "pizza_name": "Hawaiian",
        "price": 599,
        "is_active": true,
        "description_of_pizza": "The classic ham and pineapple duo.",
        "store_id": "e074749e"
    },
    {
        "product_id": "PZ76716G90",
        "pizza_name": "Five Cheese Explosion",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Mozzarella Cheddar Provolone Monterey Jack and Swiss.",
        "store_id": "fc1bfeee"
    },
    {
        "product_id": "PZ87827H01",
        "pizza_name": "Burrata Bliss",
        "price": 949,
        "is_active": false,
        "description_of_pizza": "A whole burrata ball broken over a fresh Margherita.",
        "store_id": "fc1bfeee"
    },
    {
        "product_id": "PZ98938I12",
        "pizza_name": "Cheesy Garlic Bread Pizza",
        "price": 549,
        "is_active": true,
        "description_of_pizza": "Double-garlic butter base with triple cheese.",
        "store_id": "fc1bfeee"
    },
    {
        "product_id": "PZ09049J23",
        "pizza_name": "Smoked Gouda",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Smoked gouda, roasted red peppers, and onions.",
        "store_id": "fc1bfeee"
    },
    {
        "product_id": "PZ10160K34",
        "pizza_name": "Pecorino Romano",
        "price": 649,
        "is_active": false,
        "description_of_pizza": "Olive oil base with black pepper and Pecorino cheese.",
        "store_id": "fc1bfeee"
    },
    {
        "product_id": "PZ21271L45",
        "pizza_name": "Breakfast Pizza",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Scrambled eggs, bacon, sausage, and hashbrowns.",
        "store_id": "b4ce884a"
    },
    {
        "product_id": "PZ32382M56",
        "pizza_name": "Maple Sausage",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Breakfast sausage with a maple syrup drizzle.",
        "store_id": "b4ce884a"
    },
    {
        "product_id": "PZ43493N67",
        "pizza_name": "Apple & Bacon",
        "price": 749,
        "is_active": false,
        "description_of_pizza": "Thinly sliced apples with smoked bacon.",
        "store_id": "b4ce884a"
    },
    {
        "product_id": "PZ54504O78",
        "pizza_name": "Truffle Mac & Cheese",
        "price": 849,
        "is_active": true,
        "description_of_pizza": "Elbow pasta and cheese sauce with truffle oil.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ65615P89",
        "pizza_name": "Taco Pizza",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Taco beef, lettuce, crushed Doritos, and salsa.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ76726Q90",
        "pizza_name": "Peach & Burrata",
        "price": 899,
        "is_active": false,
        "description_of_pizza": "Seasonal peaches, burrata cheese, and prosciutto.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ87837R01",
        "pizza_name": "Fig & Prosciutto",
        "price": 949,
        "is_active": true,
        "description_of_pizza": "Fresh figs, prosciutto di Parma, and balsamic glaze.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ98948S12",
        "pizza_name": "Mango Tango",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Spicy chicken and fresh mango chunks with red onion.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ09059T23",
        "pizza_name": "Honey & Goat Cheese",
        "price": 849,
        "is_active": false,
        "description_of_pizza": "Creamy goat cheese topped with wild honey and rosemary.",
        "store_id": "c4589666"
    },
    {
        "product_id": "PZ10170U34",
        "pizza_name": "Nashville Hot",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Fried chicken tossed in hot oil with pickle chips.",
        "store_id": "47d6eed8"
    },
    {
        "product_id": "PZ21281V45",
        "pizza_name": "Cajun Chicken",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Blackened chicken, andouille sausage, and peppers.",
        "store_id": "47d6eed8"
    },
    {
        "product_id": "PZ32392W56",
        "pizza_name": "Chili Con Carne",
        "price": 699,
        "is_active": false,
        "description_of_pizza": "Hearty beef chili, onions, and sharp cheddar.",
        "store_id": "47d6eed8"
    },
    {
        "product_id": "PZ43403X67",
        "pizza_name": "Angry Shrimp",
        "price": 949,
        "is_active": true,
        "description_of_pizza": "Chili-marinated shrimp, garlic, and pepper flakes.",
        "store_id": "47d6eed8"
    },
    {
        "product_id": "PZ54514Y78",
        "pizza_name": "Napoletana",
        "price": 649,
        "is_active": true,
        "description_of_pizza": "Anchovies, capers, and black olives.",
        "store_id": "1952f231"
    },
    {
        "product_id": "PZ65625Z67",
        "pizza_name": "Capricciosa",
        "price": 799,
        "is_active": false,
        "description_of_pizza": "Ham, mushrooms, artichokes, and olives.",
        "store_id": "1952f231"
    },
    {
        "product_id": "PZ76736A78",
        "pizza_name": "Prosciutto e Funghi",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Cooked ham and earthy button mushrooms.",
        "store_id": "1952f231"
    },
    {
        "product_id": "PZ87847B89",
        "pizza_name": "Diavola",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Spicy salami, chili flakes, and hot honey.",
        "store_id": "1952f231"
    },
    {
        "product_id": "PZ98958C90",
        "pizza_name": "Eggplant Parm",
        "price": 649,
        "is_active": false,
        "description_of_pizza": "Fried eggplant, parmesan, and extra tomato sauce.",
        "store_id": "1952f231"
    },
    {
        "product_id": "PZ09069D01",
        "pizza_name": "Duck L’Orange",
        "price": 1199,
        "is_active": true,
        "description_of_pizza": "Roasted duck, orange zest, and scallions.",
        "store_id": "8f5eb989"
    },
    {
        "product_id": "PZ10180E12",
        "pizza_name": "Doner Kebab",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Kebab meat, garlic sauce, and shredded lettuce.",
        "store_id": "8f5eb989"
    },
    {
        "product_id": "PZ21291F23",
        "pizza_name": "Cubano",
        "price": 849,
        "is_active": false,
        "description_of_pizza": "Roast pork, ham, Swiss cheese, and pickles.",
        "store_id": "8f5eb989"
    },
    {
        "product_id": "PZ32302G34",
        "pizza_name": "Tropical Heat",
        "price": 649,
        "is_active": true,
        "description_of_pizza": "Bacon, pineapple, and spicy jalapeños.",
        "store_id": "2b8b72d2"
    },
    {
        "product_id": "PZ43413H45",
        "pizza_name": "Pear & Gorgonzola V2",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Sliced pears with blue cheese and toasted walnuts.",
        "store_id": "2b8b72d2"
    },
    {
        "product_id": "PZ54524I56",
        "pizza_name": "Gorgonzola & Walnut",
        "price": 699,
        "is_active": false,
        "description_of_pizza": "Strong blue cheese balanced with honey and nuts.",
        "store_id": "2b8b72d2"
    },
    {
        "product_id": "PZ65635J67",
        "pizza_name": "Blueberry Lemon",
        "price": 599,
        "is_active": true,
        "description_of_pizza": "Blueberry compote with lemon mascarpone.",
        "store_id": "2b8b72d2"
    },
    {
        "product_id": "PZ76746K78",
        "pizza_name": "Cookies & Cream",
        "price": 549,
        "is_active": true,
        "description_of_pizza": "White chocolate and crushed Oreo pieces.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ87857L89",
        "pizza_name": "Birthday Cake",
        "price": 549,
        "is_active": false,
        "description_of_pizza": "Frosting base with rainbow sprinkles and cake bits.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ98968M90",
        "pizza_name": "Rocky Road",
        "price": 549,
        "is_active": true,
        "description_of_pizza": "Chocolate, nuts, and marshmallows.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ09079N01",
        "pizza_name": "PB & J",
        "price": 449,
        "is_active": true,
        "description_of_pizza": "Peanut butter base with grape jelly swirls.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ10190O12",
        "pizza_name": "Chicken Bacon Ranch",
        "price": 749,
        "is_active": false,
        "description_of_pizza": "Roast chicken, crispy bacon, and creamy ranch.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ21201P23",
        "pizza_name": "Butter Chicken",
        "price": 799,
        "is_active": true,
        "description_of_pizza": "Creamy makhani sauce, chicken, and coriander.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ32312Q34",
        "pizza_name": "Teriyaki Chicken",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Sweet soy-glaze chicken, pineapple, and sesame.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ43423R45",
        "pizza_name": "Tandoori Chicken",
        "price": 749,
        "is_active": true,
        "description_of_pizza": "Spiced tandoori chicken, green chilies, and mint.",
        "store_id": "02a5f6c7"
    },
    {
        "product_id": "PZ54534S56",
        "pizza_name": "Anchovy Blast",
        "price": 549,
        "is_active": false,
        "description_of_pizza": "Extra salty anchovies with garlic and olives.",
        "store_id": "4d650d59"
    },
    {
        "product_id": "PZ65645T67",
        "pizza_name": "Tuna & Onion",
        "price": 649,
        "is_active": true,
        "description_of_pizza": "Tuna chunks and red onions on a red base.",
        "store_id": "4d650d59"
    },
    {
        "product_id": "PZ76756U78",
        "pizza_name": "Feta & Mint",
        "price": 599,
        "is_active": true,
        "description_of_pizza": "Refreshing feta cheese with fresh mint and cucumbers.",
        "store_id": "4d650d59"
    },
    {
        "product_id": "PZ87867V89",
        "pizza_name": "Parmesan Crusted",
        "price": 699,
        "is_active": true,
        "description_of_pizza": "Crust baked in a layer of parmesan cheese.",
        "store_id": "4d650d59"
    }
]

// Define a simple GET route
app.get('/api/greeting', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.get('/api/pizzas', (req, res) => {
    const { store_id, is_available } = req.query;

    // Mandatory validation
    if (!store_id) {
        return res.status(400).json({
            status : 'failure',     
            error: 'store_id is mandatory'
        });
    }

    // Fetch from "DB"
    let products = pizzaProductsDB.filter(
        (pizza) => pizza.store_id === store_id
    );

    // Optional filter
    if (is_available !== undefined) {
        const availability = is_available === 'true';
        products = products.filter(
            (pizza) => pizza.is_active === availability
        );
    }

    res.json({
        status : 'success',        
        store_id,
        count: products.length,
        products
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
