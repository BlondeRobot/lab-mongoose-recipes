const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: "Spaghetti",
      level: "Easy Peasy",
      cuisine: "Italian",
    }).then((myRecipe) => {
      console.log(myRecipe.title);
    });
  })
  .then(() => Recipe.insertMany(data))
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title)
      })
    })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"},
      { duration: 100},
      { new: true}
      );
  })
  .then((durationUpdated) => {
    console.log("updated duration", durationUpdated);
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipeDeleted) => {
    console.log("Carrot Cake deleted", recipeDeleted)
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
