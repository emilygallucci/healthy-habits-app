import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';


export default function FoodList({ navigation }) {
    
  const recipes = [
    { id: "1", recipeName: "Grilled Chicken Salad" },
    { id: "2", recipeName: "Veggie Stir Fry" },
    { id: "3", recipeName: "Oatmeal with Berries" },
  ];
  
  return (
  <View style={{paddingTop: 0}}>
  <FlatList
    data={recipes}
    renderItem={({item}) => <View style={{borderColor:'silver', borderBottomWidth: 4}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Recipe",{recipeName: item.recipeName})}}>
          <Text style={styles.recipename}>{item.recipeName}</Text>
          <Text style={styles.recipedescription}>{item.recipeDescription}</Text>
      </TouchableOpacity>
    </View>}
  /> 
</View>
 
);
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  recipename: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: { fontSize: 18 },
});