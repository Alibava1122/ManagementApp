import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";





const posts = [
  { id: "1", title: "Crypto Hipes in 2024", content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum", image: require("../../assets/images/crypto.png") , image2: require("../../assets/images/profilepic.png")},
  { id: "2", title: "Tesla Shares down the markets", content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like", image: require("../../assets/images/tesla.jpg") , image2: require("../../assets/images/profilepic.png") },
  { id: "3", title: "Unique Properties hipes", content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a", image: require("../../assets/images/property.jpeg") , image2: require("../../assets/images/profilepic.png")},
  { id: "4", title: "Shares of Assests in market", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ", image: require("../../assets/images/assetsnew.jpg") , image2: require("../../assets/images/profilepic.png") },
];

export default function community() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Posts</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postBox}
           
            onPress={() =>
              router.push({
                pathname: "(main)/postDetailsScreen",
                params: {
                  id: item.id,
                  title: item.title,
                  content: item.content,
                  image:item.image,
                  image2:item.image2
                 
                },
              })
            }
          >
              <View style={styles.imageContainer}>
               
             <Image source={item.image} style={styles.postImage} resizeMode="cover" />
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.postContent}>
              {item.content}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  postBox: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 14,
    color: "gray",
    marginBottom:5,
    marginTop:5
  },
  imageContainer: {
    width: "100%",
    height: 160,
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
