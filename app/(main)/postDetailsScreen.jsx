import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { usePosts } from "../../context/PostsContext";
import { useAuth } from "../../context/AuthContext";

export default function postDetailsScreen() {
  const params = useLocalSearchParams();
  const { likePost, unlikePost, addComment, removeComment, refresh, posts } = usePosts();

  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    if (params?.id && posts.length > 0) {
      const postId = params.id.trim();
      const found = posts.find((post) => post._id === postId);
      setCurrentPost(found);
    }
  }, [params?.id, posts]);

  const { user } = useAuth();

  useEffect(() => {
    refresh();
  }, [liked]);

  const [liked, setLiked] = useState();

  useEffect(() => {
    setLiked(currentPost?.likes?.includes(user._id) || false);
  }, [currentPost, user._id]);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        const updatedPost = await unlikePost(currentPost?._id);
        setLiked(false);
      } else {
        const updatedPost = await likePost(currentPost?._id);
        setLiked(true);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      await addComment(currentPost._id, comment);
      setComment("");
      refresh(); 
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment(currentPost._id, commentId);
      refresh();
    } catch (error) {
      console.error("Failed to remove comment:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {currentPost?.file.url && (
          <Image
            source={{ uri: currentPost?.file.url }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={styles.postTitle}>{currentPost?.category}</Text>
      <Text style={styles.postContent}>{currentPost?.text}</Text>

      {/* Like Button */}
      <View style={styles.postBottomSection}>
        <View>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Text style={styles.likeButtonText}>
              {liked ? (
                <AntDesign name="like1" size={23} color="blue" />
              ) : (
                <AntDesign name="like2" size={23} color="black" />
              )}{" "}
              ({currentPost?.likes.length})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.creatorContainer}>
          {params.image2 ? (
            <Image source={currentPost?.image2} style={styles.creatorImage} />
          ) : (
            <Image
              source={require("../../assets/images/profilepic.png")}
              style={styles.creatorImage}
            />
          )}
          <Text style={styles.creatorText}>{currentPost?.user?.name}</Text>
        </View>
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Display Comments */}
      <FlatList
        data={currentPost?.comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Image
              source={params.image2 || require("../../assets/images/profilepic.png")}
              style={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.name}>{item?.user?.name}</Text>
              <Text>{item?.text}</Text>
            </View>
            {item?.user === user._id && (
              <TouchableOpacity onPress={() => handleRemoveComment(item._id)}>
                <Feather name="trash-2" size={20} color="red" />
              </TouchableOpacity>
            )}
           
          </View>
        )}
      />
      <View style={{ height: 30 }}></View>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 15,
    marginTop: 14,
    backgroundColor: "#E8E8E8",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
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
  postBottomSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  creatorImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  creatorContainer: {
    flexDirection: "row",
  },
  creatorText: {
    fontSize: 13,
    color: "black",
    fontWeight: "500",
    marginTop: 5,
  },
});
