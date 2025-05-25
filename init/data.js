// added 20 review succesfully 
// will assign user and review to listing
import mongoose from "mongoose";
import Listing from "../models/listing.js";
// const Listing = require("../models/listing");
import Review from "../models/review.js";
// const Review = require("../models/review");
import User from "../models/user.js";
import review from "../models/review.js";
// const User = require("../models/user");

mongoose
  .connect(
    "mongodb+srv://pajaynar:205airbnb@cluster0.phu7vfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// for user uncomment line 17 to 42
// const users = [
//   {
//     username: "Jay",
//     email: "jay@gmail.com",
//     password: "Jay",
//   },
//   {
//     username: "Katyayani",
//     email: "kat@gmail.com",
//     password: "Kat",
//   },
//   {
//     username: "Jiya",
//     email: "captain@gmail.com",
//     password: "Jiya",
//   },
// ]
// async function addUsersToDB(users) {
// for (let user of users) {
//   await User.register( new User({
//     email: user.email,
//     username: user.username
//   }), user.password);
// }
// }
// addUsersToDB(users);

//for review uncomment line 48 to 158
// const sampleReview = [
//   {
//     comment:
//       "Amazing stay! The place was spotless and the host was very helpful.",
//     rating: 5,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment: "Good value for money. The neighborhood was peaceful.",
//     rating: 4,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "It was okay, but the bathroom could have been cleaner.",
//     rating: 3,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Fantastic location! Walking distance to everything we needed.",
//     rating: 5,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment:
//       "The host was unresponsive at times. Not ideal for business trips.",
//     rating: 2,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "Beautiful decor and very cozy space. Would stay again!",
//     rating: 5,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Basic amenities provided, nothing too special.",
//     rating: 3,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment:
//       "Had an issue with the check-in process, but it was resolved quickly.",
//     rating: 4,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "Lovely patio and garden area. Very relaxing stay.",
//     rating: 5,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Wi-Fi was weak and spotty throughout our stay.",
//     rating: 2,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment: "Host provided great recommendations for local restaurants!",
//     rating: 4,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "Very noisy at night due to nearby traffic.",
//     rating: 2,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Perfect for a weekend getaway. Would book again.",
//     rating: 5,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment: "The bed was super comfortable and the sheets were fresh.",
//     rating: 4,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "Too many rules and restrictions made it less enjoyable.",
//     rating: 3,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Charming space with a rustic feel. Loved the vibe!",
//     rating: 5,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment: "Not as described in the listing. Disappointed.",
//     rating: 1,
//     author: "682e67707d3686750653728e",
//   },
//   {
//     comment: "Clean, quiet, and exactly what we needed.",
//     rating: 4,
//     author: "682e67727d36867506537291",
//   },
//   {
//     comment: "Had a lovely time! The host went above and beyond.",
//     rating: 5,
//     author: "682e67687d36867506537289",
//   },
//   {
//     comment: "Check-out was a bit of a hassle, but overall good stay.",
//     rating: 3,
//     author: "682e67707d3686750653728e",
//   },
// ];
// async function addReviewsToDB(reviews) {
//   reviews.forEach((review) => {
//     Review.create(review);
//   });
// }
// await addReviewsToDB(sampleReview);

// const reviews = await Review.find({});
// const reviewIds = reviews.map((review) => review._id);
// console.log(reviewIds);

// const sampleListings = await Listing.find({});
// console.log(sampleListings);

// const sampleListings = [
//   {
//     title: "Cozy Cabin in the Woods",
//     description: "Escape to this peaceful and rustic log cabin surrounded by nature.",
//     price: 120,
//     location: "Canmore",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/cabin_cozy",
//       url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
//     },
//     geometry: { type: "Point", coordinates: [-115.3545, 51.0891] },
//     reviews: ["682f90b47ed8674a5abbc250", "682f90b47ed8674a5abbc251", "682f90b47ed8674a5abbc253"],
//     owner: "682e67687d36867506537289"
//   },
//   {
//     title: "Modern Downtown Apartment",
//     description: "A sleek and stylish apartment in the heart of Toronto.",
//     price: 200,
//     location: "Toronto",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/downtown_apt",
//       url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
//     },
//     geometry: { type: "Point", coordinates: [-79.3832, 43.6532] },
//     reviews: ["682f90b47ed8674a5abbc24c", "682f90b47ed8674a5abbc259"],
//     owner: "682e67707d3686750653728e"
//   },
//   {
//     title: "Lakeside Cottage Retreat",
//     description: "Charming lakeside cottage perfect for family getaways.",
//     price: 175,
//     location: "Muskoka",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/lakeside_cottage",
//       url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
//     },
//     geometry: { type: "Point", coordinates: [-79.3087, 45.0735] },
//     reviews: ["682f90b47ed8674a5abbc24f", "682f90b47ed8674a5abbc24e", "682f90b47ed8674a5abbc254"],
//     owner: "682e67727d36867506537291"
//   },
//   {
//     title: "Stylish Loft with City Views",
//     description: "Enjoy the city skyline from this modern open-concept loft.",
//     price: 210,
//     location: "Vancouver",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/loft_views",
//       url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
//     },
//     geometry: { type: "Point", coordinates: [-123.1207, 49.2827] },
//     reviews: ["682f90b47ed8674a5abbc258", "682f90b47ed8674a5abbc252"],
//     owner: "682e67687d36867506537289"
//   },
//   {
//     title: "Charming Victorian Home",
//     description: "Step back in time in this restored Victorian-era house.",
//     price: 190,
//     location: "Ottawa",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/victorian_home",
//       url: "https://images.unsplash.com/photo-1600585152906-e5c4e093f2a7"
//     },
//     geometry: { type: "Point", coordinates: [-75.6972, 45.4215] },
//     reviews: ["682f90b47ed8674a5abbc257", "682f90b47ed8674a5abbc25b", "682f4592f38fbb778906b6f1"],
//     owner: "682e67707d3686750653728e"
//   },
//   {
//     title: "Mountain View Chalet",
//     description: "Luxury chalet with stunning views of the Rockies.",
//     price: 350,
//     location: "Banff",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/mountain_chalet",
//       url: "https://images.unsplash.com/photo-1596558458922-9dc3dc581a54"
//     },
//     geometry: { type: "Point", coordinates: [-115.5708, 51.1784] },
//     reviews: ["682f90b47ed8674a5abbc25a", "682f90b47ed8674a5abbc253"],
//     owner: "682e67727d36867506537291"
//   },
//   {
//     title: "Seaside Escape",
//     description: "Relax by the sea in this beautifully designed beach house.",
//     price: 275,
//     location: "Tofino",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/seaside_escape",
//       url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
//     },
//     geometry: { type: "Point", coordinates: [-125.9037, 49.1534] },
//     reviews: ["682f90b47ed8674a5abbc25c"],
//     owner: "682e67687d36867506537289"
//   },
//   {
//     title: "Urban Studio",
//     description: "Compact and cozy studio in the center of the city.",
//     price: 110,
//     location: "Montreal",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/urban_studio",
//       url: "https://images.unsplash.com/photo-1600585153756-0c0cae69ea3c"
//     },
//     geometry: { type: "Point", coordinates: [-73.5673, 45.5017] },
//     reviews: ["682f90b47ed8674a5abbc254", "682f41266eca24cf89772a72"],
//     owner: "682e67707d3686750653728e"
//   },
//   {
//     title: "Eco-Friendly Treehouse",
//     description: "Live among the trees in this unique sustainable treehouse.",
//     price: 130,
//     location: "Nelson",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/treehouse",
//       url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc"
//     },
//     geometry: { type: "Point", coordinates: [-117.2948, 49.4967] },
//     reviews: ["682f90b47ed8674a5abbc24a", "682f90b47ed8674a5abbc24b", "682f90b47ed8674a5abbc256"],
//     owner: "682e67727d36867506537291"
//   },
//   {
//     title: "Historic Farmhouse",
//     description: "Enjoy country living in this renovated historic farmhouse.",
//     price: 145,
//     location: "Stratford",
//     country: "Canada",
//     image: {
//       filename: "Wanderlust_DEV/farmhouse",
//       url: "https://images.unsplash.com/photo-1600585154303-49663f61a136"
//     },
//     geometry: { type: "Point", coordinates: [-80.9497, 43.3700] },
//     reviews: ["682f90b47ed8674a5abbc255", "682f90b47ed8674a5abbc258"],
//     owner: "682e67687d36867506537289"
//   }
// ]


// async function addListingsToDB(listings) {
//   for (let listing of listings) {
//     const newListing = new Listing(listing);
//     console.log(await newListing.save());
//   }
// }

// await addListingsToDB(sampleListings);
