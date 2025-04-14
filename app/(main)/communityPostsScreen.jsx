import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  PermissionsAndroid
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePosts } from "../../context/PostsContext";

const CommunityPostsScreen = () => {
  const { createPost, error, loading , posts , refresh} = usePosts();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    refresh();
  }, []);


  const router = useRouter();
  const params = useLocalSearchParams();

  // console.log('post from community screen--->' , posts.likes)


  const handleImageUpload = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setSelectedImage(result?.assets[0].uri);
  };

  const handleAddPost = async (values) => {
    const postData = {
      category: params.title, 
      text: values.description,
      file: selectedImage ? { uri: selectedImage } : null,
    };


    try {
      const response = await createPost(postData);
      console.log('response is here' , response)
      setIsModalVisible(false);  
      setSelectedImage(null);  
    } catch (error) {
      console.log('Error creating post:', error);
      
    }
  };


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerSubContainer1}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{params.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.headerSubContainer2}
        >
          <Text style={styles.buttonText}>Create Posts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.postBox}
              onPress={() =>
                router.push({
                  pathname: "/postDetailsScreen",
                  params: {
                    id: item._id,
                    title: item.category,
                    content: item.text,
                    image: item.file.url,
                    image2: item.user.profilePicture,
                    creator: item.user?.name,
                    PostLikes: item.likes,
                    refresh:refresh
                    
                    
                  },
                })
              }
            >
              {/* Post Image */}
              <View style={styles.imageContainer}>
                <Image
                   source={{ uri: item.file.url }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              </View>

              {/* Post Title & Content */}
              <Text style={styles.postTitle}>{item.category}</Text>
              <Text numberOfLines={2} style={styles.postContent}>
                {item.content}
              </Text>

              <View style={styles.creatorContainer}>
              {item.user?.profilePicture ? (
        <Image
          source={{ uri: item.user.profilePicture }}
          style={styles.creatorImage}
        />
      ) : (
        <Image
          source={require("../../assets/images/profilepic.png")}
          style={styles.creatorImage}
        />
      )}
                <Text style={styles.creatorName}>{item.user?.name || "Unknown"}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.closeContainer}>
                <AntDesign
                  name="close"
                  size={22}
                  color="black"
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <Text style={styles.modalTitle}>Create Post</Text>

              <TouchableOpacity style={styles.uploadContainer} onPress={handleImageUpload}>
                <AntDesign name="plussquareo" size={28} color="black"  />
              </TouchableOpacity>

              <Formik
                initialValues={{ title: '', description: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddPost}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Add Title..."
                      placeholderTextColor="#888"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                    />
                    {touched.title && errors.title && (
                      <Text style={styles.errorText}>{errors.title}</Text>
                    )}

                    <TextInput
                      style={styles.descriptionInput}
                      placeholder="Add description..."
                      placeholderTextColor="#888"
                      textAlignVertical="top"
                      multiline={true}
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}

                    <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CommunityPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    marginTop: 10,
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
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 6,
  },
  creatorImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  creatorName: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#333",
  },
  imageContainer: {
    width: "100%",
    height: 160,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: "gray",
  },
  header: {
    width: "100%",
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "white",
    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerSubContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  headerSubContainer2: {
    width: "33%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a7a8",
  },
  headerText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  descriptionInput: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#00a7a8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeContainer: {
    width: "100%",
    height: 20,
    alignItems: "flex-end",
  },
  uploadContainer: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    marginBottom: 14,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop:-6,
    marginBottom:10
   
  },
});
