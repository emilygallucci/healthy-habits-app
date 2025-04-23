import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../firebase';

/*
const habits = [
  { id: '1', title: 'Drink More Water' },
  { id: '2', title: 'Eat More Veggies' },
  { id: '3', title: 'Exercise Daily' },
  { id: '4', title: 'Sleep Earlier' },
]; */

function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/(tabs)/login'); // change path if your login is elsewhere
      }
    });

    return unsubscribe;
  }, []);
}

export default function HomeScreen() {
  useAuthRedirect();
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const name = user.email.split('@')[0];
        setUsername(name);
      }
    }, []);

    /*
    const handlePress = (habit) => {
        router.push({
            pathname: '/habits',
            params: { title: habit.title },
          }); 
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back, {username}!</Text>
      {/* habit button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/habits')}>
        <Text style={styles.buttonText}>My Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/food')}>
        <Text style={styles.buttonText}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/photogall')}>
        <Text style={styles.buttonText}>Photo Gallery</Text>
      </TouchableOpacity>

      {/*
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      /> */}
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
  button: {
    backgroundColor: 'pink',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});