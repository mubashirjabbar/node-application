const express = require("express");
const mongoose = require('mongoose');

// Define schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String
});

// Create a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb+srv://mubashirjabbar97:Mubashir@node-testing-cluster.sux8rcd.mongodb.net/')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const recipesRouter = require('./routers/recipes');

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});

// Create a new recipe
app.post('/api/v1/recipes', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    console.log({title});
    console.log({ingredients});
    console.log({instructions});
    // let title = "Baryani";
    // let ingredients = 'msala';
    // let instructions = ' no';
    const recipe = new Recipe({ title, ingredients, instructions });
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).send('Error saving recipe');
  }
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
