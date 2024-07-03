import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupChatType } from "../component/message/ListMessageItem";
import { messageType, reactionType } from "../component/message/MessageItem";
import AxiosInstance from "./AxiosInstance";

export const getGroupsAPI = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = '/group-chat/get-by-user';
    const respone:Array<GroupChatType>= await AxiosInstance().get(url,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    );
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getMessageByGroupAPI = async (group_id:number) => {
  try {
    const url = '/message/get-by-group/'+group_id;
    const respone:Array<messageType>= await AxiosInstance().get(url);
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const addMessageAPI = async (message:any) => {
  try {
    const url = '/message';
    const respone:messageType= await AxiosInstance().post(url,message);
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteMessageAPI = async (message_id:number) => {
  try {
   
    const url = '/message/delete/'+message_id;
    const respone= await AxiosInstance().delete(url);
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateMessageAPI = async (message:any) => {
  try {
    const url = '/message/update/'+message.id;
    const respone:messageType= await AxiosInstance().put(url,message);
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const getReactionByMessageHTTP = async (message:any) => {
  try {
    const url = '/like-message/get-by-message/'+message;
    const respone:Array<reactionType>= await AxiosInstance().get(url);
    return respone
  } catch (error) {
    console.log(error);
    throw error;
  }
}