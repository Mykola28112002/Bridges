// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const postsArray = [];
        querySnapshot.forEach(documentSnapshot => {
          postsArray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setPosts(postsArray);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text>{item.text}</Text>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  postImage: {
    height: 200,
    marginTop: 10,
  },
});
