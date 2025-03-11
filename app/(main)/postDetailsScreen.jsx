import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image  , ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";




export default function postDetailsScreen() {
    const params = useLocalSearchParams(); 


  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

 

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
               
               <Image source={params.image} style={styles.postImage} resizeMode="cover" />
              </View>
      <Text style={styles.postTitle}>{params.title}</Text>
      <Text style={styles.postContent}>{params.content}</Text>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Display Comments */}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.commentBox}>
            <Image 
            source={params.image2}
              style={styles.avatar} 
            />
            <View style={styles.commentContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text>{item}</Text>
            </View>
          </View>
        )}
      />
      <View style={{height:30}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,

  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  commentButton: {
    backgroundColor: "#3e8c89",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  commentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'grey',
    borderRadius:15,
    marginTop:14,
    backgroundColor:'#E8E8E8'
    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  commentContent: {
    flex: 1
  },
  name: {
    fontWeight: 'bold'
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 190,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden", 
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
});
