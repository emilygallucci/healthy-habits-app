import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation, NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';


export default function FoodList() {
  const router = useRouter();
    
  const recipes = [
    { id: "1", recipeName: "Grilled Chicken Salad" },
    { id: "2", recipeName: "Veggie Stir Fry" },
    { id: "3", recipeName: "Oatmeal with Berries" },
  ];
  
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                router.navigate({
                  pathname: '/fooddetail',
                  params: { recipeName: item.recipeName },
                });
              }}
            >
              <Text style={styles.recipename}>{item.recipeName}</Text>
              <Text style={styles.recipedescription}>Tap to view recipe</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  recipename: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: { fontSize: 18 },
});