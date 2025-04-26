import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function RecipeDetail({ route, navigation }) {

    const { recipeName } = route.params;
    
    const recipeData = {
      "Grilled Chicken Salad": {
        image:
          "https://www.dinneratthezoo.com/wp-content/uploads/2020/12/grilled-chicken-salad-4.jpg",
        ingredients: [
          "1 lb boneless skinless chicken breasts",
          "6 cups romaine lettuce chopped",
          "3/4 cup cherry tomatoes halved",
          "3/4 cup cucumber chopped",
          "1 avocado peeled",
        ],
        directions: [
          "Preheat an outdoor grill or indoor grill to medium high heat. Remove the chicken from the marinade and place on the grill.",
          "Cook for 5-6 minutes per side or until chicken is browned and cook through.",
          "Let the chicken cool for 5 minutes, then slice.",
          "Arrange the lettuce, chicken, tomatoes, cucumber, and avocado in a large bowl.",
        ],
      },

      "Veggie Stir Fry":{
        image:
          "https://healthyfitnessmeals.com/wp-content/uploads/2018/01/mango-black-bean-salad-3.jpg",
        ingredients: [
          "Red bell pepper",
          "Red onion",
          "Jalapeno",
          "Canned Black beans",
          "Mangoes",
          "Corn kernels",
          "Chopped cilantro leaves",
          "Olive oil",
          "Lime juice",
          "Salt and pepper to taste",
          "Ground cumin",
          "Chili powder",
        ],
        directions: [
          "In a bowl add all of the chopped veggies, beans, and chopped mangoes in a bowl.",
          "Add the seasonings over the chopped veggies. You may also mix the seasonings in a small bowl with olive oil and lime juice and pour over the salad.",
          "Add the olive oil and lime over the salad.",
          "Mix well to combine and serve.",
        ],
      },

      "Oatmeal with Berries":{
        image:
          "https://madaboutfood.co/wp-content/uploads/2020/10/Sweet-Potato-Mushroom-and-Wild-Rice-Soup-10-1536x2048.jpg",
        ingredients: [
          "1 leak",
          "6 cloves garlic",
          "2 cups shitake musrooms",
          "4 cups vegetable broth",
          "2 cups water",
          "1 1/2 cups lentils",
          "1 sweet potato",
          "1 bay leaf",
          "1/2 cup basil",
          "dash Black pepper",
          "handful spinach",
        ],
        directions: [
          "In a large pan, stir-fry leek, mushrooms and garlic for 3 to 4 minutes until leeks are soft.",
          "Stir in broth, water, lentils, sweet potato, and bay leaf.",
          "Bring to boil then simmer uncovered until lentils and sweet potatoes are soft, about 30 to 40 minutes.",
          "Remove bay leaf and puree 2 cups of soup until smooth or use an immersion blender; return to pot, stir in basil and pepper to taste.",
          "Just before serving stir in as much as you dare fresh spinach. It will melt in the pot. If you prefer fill individual soup bowls with spinach and spoon hot soup over the spinach. Top with a sprinkle of more fresh basil.",
        ],
      },
    };
  
    const selectedRecipe = recipeData[recipeName];

  if (!selectedRecipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {selectedRecipe.image ? (
        <Image source={{ uri: selectedRecipe.image }} style={styles.image} />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipeName}</Text>

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {selectedRecipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Directions:</Text>
        {selectedRecipe.directions.map((step, index) => (
          <Text key={index} style={styles.text}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});