// src/screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleChooseImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.uri) {
        setImageUri(response.uri);
      }
    });
  };

  const handleCreatePost = async () => {
    let imageUrl = '';
    if (imageUri) {
      const imageRef = storage().ref(`posts/${Date.now()}.jpg`);
      await imageRef.putFile(imageUri);
      imageUrl = await imageRef.getDownloadURL();
    }

    await firestore().collection('posts').add({
      text,
      imageUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
      author: auth().currentUser.email,
    });

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
