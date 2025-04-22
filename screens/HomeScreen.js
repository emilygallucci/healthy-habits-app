import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const habits = [
  { id: '1', title: 'Drink More Water' },
  { id: '2', title: 'Eat More Veggies' },
  { id: '3', title: 'Exercise Daily' },
  { id: '4', title: 'Sleep Earlier' },
];

export default function HomeScreen() {
    const router = useRouter();
    const handlePress = (habit) => {
        router.push({
            pathname: '/habits',
            params: { title: habit.title },
          });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! Choose a goal:</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardText: { fontSize: 18 },
});