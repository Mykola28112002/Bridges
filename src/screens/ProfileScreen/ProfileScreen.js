// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen() {
  const [posts, setPosts] = useState([]);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .where('author', '==', currentUser.email)
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
      <Text style={styles.title}>Profile: {currentUser.email}</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
})