import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import HistoryModal from "../../components/HistoryModal";

const Chat = () => {
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]); 
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsHistoryModalVisible(true)}>
            <AntDesign name="menu-unfold" size={21} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageSubContainer}>
              <View style={styles.messageBox}>
                <Text style={styles.messageText}>{item}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />

        {/* Input Section */}
        <View style={styles.chatcontainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setMessage}
              value={message}
              placeholder="Type a message..."
              placeholderTextColor="#B0B0B0"
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History Modal */}
      <HistoryModal
        isHistoryModalVisible={isHistoryModalVisible}
        setIsHistoryModalVisible={setIsHistoryModalVisible}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subcontainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 17,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageSubContainer: {
    alignSelf:'flex-end',
    marginBottom: 5,
    marginTop:4
  },
  messageBox: {
    backgroundColor: "#3e8c89",
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  chatcontainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 46,
    color: "black",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#3e8c89",
    backgroundColor: "white",
  },
  sendButton: {
    backgroundColor: "#3e8c89",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendText: {
    color: "white",
    fontSize: 16,
    
  },
});
