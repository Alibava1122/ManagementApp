import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import HistoryModal from "../../components/HistoryModal";
import { router } from "expo-router";
import { useChat } from "../../context/ChatContext";

const Chat = () => {
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const { messages, sendMessage , startNewSession, conversations} = useChat();


  useEffect(() => {
    startNewSession();
  }, []);

  const handleSendMessage = async () => {
    
    if (message.trim()) {
      try {
        await sendMessage(message);
        setMessage("");
        Keyboard.dismiss();
      } catch (err) {
        console.error("Message send failed:", err);
      }
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

          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.dropDownsContainer}>
        <DropDowns   items={[
            { label: "Creative", value: "Creative" },
            { label: "Precise", value: "Precise" },
          ]}/>
        </View>
        <View style={styles.dropDownsContainer}>
        <DropDowns  items={[
            { label: "Crypto", value: "Crypto" },
            { label: "Assets", value: "Assets" },
            { label: "Real Estate", value: "RealEstate" },
          ]}/>
        </View> */}

        {/* 2nd dropdown */}

       
      

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageSubContainer,
                item.isFromUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBox,
                  item.isFromUser ? styles.userMessageBox : styles.aiMessageBox,
                ]}
              >
                <Text style={[styles.messageText ,
                item.isFromUser ? styles.userMessageText : styles.aiMessageText,

                ]}>{item.message}</Text>
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
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History Modal */}
      <HistoryModal
        isHistoryModalVisible={isHistoryModalVisible}
        setIsHistoryModalVisible={setIsHistoryModalVisible}
        conversations={conversations}
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
    // backgroundColor:'black',
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 17,
    backgroundColor: "white",
  },
  headerIcons: {
    flexDirection: "row",
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
    alignSelf: "flex-end",
    marginBottom: 5,
    marginTop: 4,
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

  dropDownsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop:7,
    marginBottom:7
   
  },
  messageSubContainer: {
    marginBottom: 5,
    marginTop: 4,
  },
  
  userMessage: {
    alignSelf: "flex-end",
  },
  
  aiMessage: {
    alignSelf: "flex-start",
  },
  
  messageBox: {
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  
  userMessageBox: {
    backgroundColor: "#3e8c89", // green bubble
  },
  
  aiMessageBox: {
    backgroundColor: "#E5E5EA", // iOS-style gray bubble
  },
  
  messageText: {
    color: "black",
    fontSize: 16,
  },
  userMessageText:{
    color:'white'
  },
  aiMessageText:{
    color:'black'
  }
  
 
});
