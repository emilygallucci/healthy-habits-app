import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';


export default function RecipeDetail() {

    const router = useRouter();
    const { recipeName } = useLocalSearchParams();
    
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
          "https://cdn.loveandlemons.com/wp-content/uploads/2025/02/stir-fry.jpg",
        ingredients: [
          "1 red bell pepper, stemmed, seeded, and sliced",
          "8 ounces cremini mushrooms, stemmed and sliced",
          "3 cups small broccoli florets",
          "1 cup sugar snap peas",
          "1 cup thinly sliced carrots",
          "3 green onions, thinly sliced",
          "2 tablespoons extra-virgin olive oil",
          "1 yellow bell pepper, stemmed, seeded, and sliced",
        ],
        directions: [
          "Heat the olive oil in a large skillet or wok over high heat.",
          "Add the red and yellow peppers, mushrooms, broccoli, snap peas, and carrots and toss.",
          "Cook, stirring occasionally, for 3 to 4 minutes, or until the vegetables soften slightly.",
          "Season with sauces and cook for 1-2 minutes more.",
        ],
      },

      "Oatmeal with Berries":{
        image:
          "https://d2t88cihvgacbj.cloudfront.net/manage/wp-content/uploads/2016/02/Triple-Berry-Oatmeal-Breakfast-Bowl-2.jpg?x29814",
        ingredients: [
          "1 cup old fashioned oats",
          "1 cup whole milk",
          "1 cup frozen berries",
          "1/4 teaspoon cinnamon",
          "1/4 teaspoon vanilla extract",
          "1 tablespoon maple syrup (add more for a sweeter oatmeal)",
          "pinch of salt",
          "1 bay leaf",
          "1/2 cup basil",
          "dash Black pepper",
          "handful spinach",
        ],
        directions: [
          "In a small pot, stir oats, milk, berries, cinnamon, vanilla extract, maple syrup, and salt over medium high heat.",
          "When the mixture starts to bubble, crush the berries with the back of the spoon and turn the heat to medium low and cover.",
          "Cook for 3-5 more minutes or until oats are tender to your preference, stirring occasionally.",
          "Pour oatmeal in a bowl, and top with vanilla yogurt, nuts, and additional berries if desired. Serve warm or at room temperature.",
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
    
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity onPress={() => router.replace('/food')}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
      {selectedRecipe.image && (
        <Image source={{ uri: selectedRecipe.image }} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipeName}</Text>

        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {selectedRecipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>• {ingredient}</Text>
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
    backgroundColor: '#fff',
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
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black',
  },
});