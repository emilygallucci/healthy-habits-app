import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useLocalSearchParams } from 'expo-router';
import { storage } from '../../firebase';
import { getAuth } from 'firebase/auth';



const habitDetails = {
    'Drink More Water': [
      'Start your day with a glass of water',
      'Carry a reusable water bottle',
      'Track your daily water intake',
    ],
    'Eat More Veggies': [
      'Add veggies to every meal',
      'Try a new vegetable each week',
      'Snack on baby carrots or cucumber',
    ],
    'Exercise Daily': [
      'Do a 15-minute workout in the morning',
      'Take a walk after meals',
      'Stretch before bed',
    ],
    'Sleep Earlier': [
      'Set a consistent bedtime',
      'Avoid screens 1 hour before sleep',
      'Create a calming nighttime routine',
    ],
  }; 

export default function HabitScreen() {
  const { title } = useLocalSearchParams();
  const steps = habitDetails[title] || ['No steps found for this habit']; 
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    // For now, we'll just add a dummy goal. You can connect this to a selection screen later.
    const newGoal = {
      id: Date.now().toString(),
      title: `Goal ${goals.length + 1}`,
    };
    setGoals([...goals, newGoal]);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Goals</Text>
      <Text style={styles.subtitle}>Steps to get started:</Text>
      {goals.length === 0 ? (
        <Text style={styles.noGoals}>No goals picked yet.</Text>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>{item.title}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={addGoal}>
        <Text style={styles.addButtonText}>+ Add Goal</Text>
      </TouchableOpacity>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
});