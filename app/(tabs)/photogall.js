import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { storage } from '../../firebase';
import { getAuth } from 'firebase/auth';

export default function PhotoScreen() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [localImage, setLocalImage] = useState(null);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      fetchImages();
    } else {
      console.log('User not logged in');
    }
  }, [user]);
  //console.log('Current images:', images);

  const fetchImages = async () => {
    if (!user) {
      console.log('User not logged in');
      return;
    }
  
  try {
    const imagesRef = ref(storage, `gallery/${user.uid}`);
    const result = await listAll(imagesRef);

    const imageUrls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef))
        );

    setImages(imageUrls); // Set images to state
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }

  //console.log('Fetched images:', urls);
};


  const uploadImage = async () => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      console.log('Image selection canceled');
      return;
    }

    //if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImage(uri);

      const response = await fetch(uri);
      const blob = await response.blob();

      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `gallery/${user.uid}/${filename}`);
      
      await uploadBytes(imageRef, blob);
      //fetchImages();
      try {
        //await uploadBytes(imageRef, blob);
        console.log('Image uploaded successfully!');

        const downloadURL = await getDownloadURL(imageRef);
        console.log('Download URL:', downloadURL);

        setImages((prevImages) => [...prevImages, downloadURL]);
        //fetchImages(); // Refresh images after upload
      } catch (error) {
        console.error('Upload failed:', error);
      }
    //} else {
    //  console.log('Image selection canceled');
    //}
    
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')}>
              <Text style={styles.backButton}>← Back to Home</Text>
            </TouchableOpacity>
      
      <Text style={styles.title}>My Photo Gallery</Text>
      <Button title="Add Photo" onPress={uploadImage} />
      {localImage && <Image source={{ uri: localImage }} style={styles.image} /> } 
    
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
  image: {
    width: '48%',
    height: 180,
    borderRadius: 10,
  }
});