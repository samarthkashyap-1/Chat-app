import axios from "axios";
const baseUrl = "http://localhost:3000";

export const registerUser = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

export const getUserbyId = async (id) => {
  const response = await axios.get(`${baseUrl}/user/${id}`);
  return response.data;
};

export const getAlluser = async () => {
    const response = await axios.get(`${baseUrl}/alluser`);
    return response.data;
    }


// Path: client/src/Pages/Chat.jsx

export const getChats = async (user) => {
    const response = await axios.get(`${baseUrl}/chat/${user.id}`);
    return response.data;
    };

    export const createChat = async (chat) => {
        const response = await axios.post(`${baseUrl}/chat`, chat);
        return response.data;
    }


    export const getMessages = async (chatId) => {
        const response = await axios.get(`${baseUrl}/message/${chatId}`);
        return response.data;
    }

    export const sendMessage = async (message) => {
        const response = await axios.post(`${baseUrl}/message`, message);
        return response.data;
    }



    // Path: client/src/Pages/GroupChat.jsx

    export const createGroupChat = async (chat) => {
        const response = await axios.post(`${baseUrl}/chat/group`, chat);
        return response.data;
    }

    export const getGroupChats = async (groupId) => {
      const response = await axios.get(`${baseUrl}/chat/group/${groupId}`);
      return response.data;
    };

    export const getGroupMessages = async (groupId) => {
        const response = await axios.get(
          `${baseUrl}/message/group/${groupId}`
        );
        return response.data;
    }

    export const sendGroupMessage = async (message) => {
        const response = await axios.post(
          `${baseUrl}/message/group`,
          message
        );
        return response.data;
    }

    export const getGroupChatById = async (groupId) => {
        const response = await axios.get(`${baseUrl}/chat/group/id/${groupId}`);
        return response.data;
    }

    // path: files

    export const uploadFile = async (file) => {
        const response = await axios.post(`${baseUrl}/file`, file);
        return response.data;
    }

    export const getFiles = async (chatId) => {
        const response = await axios.get(`${baseUrl}/file/${chatId}`);
        return response.data;
    }

    export const getGroupFiles = async (groupId) => {
        const response = await axios.get(`${baseUrl}/file/group/${groupId}`);
        return response.data;
    }

    // Path: client/src/Pages/multipleMessage

    export const sendMessagetoMultipleUsers = async (message) => {
        const response = await axios.post(`${baseUrl}/message/multiple`, message);
        return response.data;
    }
    