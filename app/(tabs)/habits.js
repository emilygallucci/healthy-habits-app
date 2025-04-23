import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useLocalSearchParams } from 'expo-router';
import { storage } from '../../firebase';
import { getAuth } from 'firebase/auth';


/*
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
  }; */

export default function HabitScreen() {
  /*const { title } = useLocalSearchParams();
  const steps = habitDetails[title] || ['No steps found for this habit']; */
  const [images, setImages] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    if (!user) return;
    const listRef = ref(storage, `gallery/${user.uid}/`);
    const result = await listAll(listRef);
    const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
    setImages(urls);
  };

  const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const filename = `gallery/${user.uid}/${Date.now()}.jpg`;
      const imageRef = ref(storage, filename);
      await uploadBytes(imageRef, blob);
      fetchImages();
    }
  };

  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Steps to get started:</Text>
      {steps.map((step, index) => (
        <Text key={index}>✅ {step}</Text>
      ))} */}
      <Text style={styles.title}>My Goal Gallery</Text>
      <Button title="Add Photo" onPress={uploadImage} />
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
});