import uuid from 'react-native-uuid';
import { socket } from '../http/SocketHandle';
import { useMyContext } from '../component/navigation/UserContext';
import React from 'react';
import { number } from 'yup';
import Friend from '../component/scanQR-modal/Friend';

const createNotificationTemplate = () => ({
  id: uuid.v4(),
  type: null,
  postId: null,
  postId1: null,
  commentId: null,
  friendId: null,
  messId: null,
  title: '',
  body: '',
  userInfo: {
    receiver: null,
    sender: null,
    fullname: '',
    avatar: '',
    multiple: false
  },
  reaction: {
    type: null
  },
  timestamp: new Date().toISOString()
});

const { user } = useMyContext();
export const useSendNotification = () => {

  const sendNCommentPost = ({ postId, body, receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 2,
      postId,
      title:`${user.fullname} đã bình luận bài viết`,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      }
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNRepComment = ({ postId1, body,commentId, receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 2,
      postId1,
      commentId,
      title:`${user.fullname} đã trả lời bình luận `,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      }
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNReaction = ({ postId, body, receiver,reactionType }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 1,
      postId,
      title:`${user.fullname} bày tỏ cảm xúc với bài viết `,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      },
      reaction: {
        type: reactionType
      },
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNReactionComment = ({ postId1,commentId, body, receiver,reactionType }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 1,
      postId1,
      commentId,
      title:`${user.fullname} đã bày tỏ cảm xúc với bình luận `,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      },
      reaction: {
        type: reactionType
      },
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNCreateNewPostHistory = ({ postId,body, }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 4,
      postId,
      title:`${user.fullname} đã tạo bài viết mới `,
      body,
      userInfo: {
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
        multiple: true
      },

    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNRequestFriend = ({receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 3,
      friendId:user.id,
      title:`${user.fullname} đã gửi lời mời kết bạn `,
      body:'Kết bạn với nhau nào!',
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      },
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNMessage = ({ messId,body, receiver}) => {
    console.log('messId',messId);
    
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 6,
      messId,
      title:`${user.fullname} đã gửi tin nhắn mới  `,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,

      },

    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendNSharePost = ( {postId,body,receiver}) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 5,
      postId,
      title:`${user.fullname} đã chia sẻ bài viết `,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,

      },

    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendBirthDay = ( {friendId,fullname,avatar}) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 7,
      friendId,
      title:`Hôm nay là sinh nhật của ${fullname}`,
      userInfo: {
        receiver:user.id,
        avatar,
      },

    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendAcceptFriend = ( {friendId}) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 8,
      friendId,
      title:`${user.fullname} đã chấp nhận lời mời kết bạn!`,
      body:"",
      userInfo: {
        receiver:friendId,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      },
    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  const sendTagFriend = ( {postId,receiver,body}) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type:9,
      postId,
      title:`${user.fullname} đã gắn thẻ bạn trong một bài viết`,
      body,
      userInfo: {
        receiver,
        sender: user.id,
        fullname: user.fullname,
        avatar: user.avatar,
      },

    };
    socket.emit('notification', data);
    console.log('Sent notification data:', data);
  };
  return {
    sendNCommentPost,
    sendNRepComment,
    sendNReaction,
    sendNReactionComment,
    sendNCreateNewPostHistory,
    sendNRequestFriend,
    sendNMessage,
    sendNSharePost,
    sendTagFriend,
    sendAcceptFriend,
    sendBirthDay
  };
};


type data = {
  id: number, // import uuid from 'react-native-uuid';
  type: Number, // 1 thả cảm xúc - 2 comment - 3 add friend - 4 tạo mới bài viết + history - 5 share bài viết - 6 nhắn tin
  postId: number, // sử dụng cho đăng + thả emoji bài viết/story + share
  postId1: number, // chỉ sử dụng cho thả cảm xúc bình luận
  commentId: number, // sử dụng cho like comment - trả lời comment
  friendId: number, // sử dụng cho kết bạn
  messId: number,// sử dụng cho nhắn tin
  title: string,
  // ${user.fullname} đã gửi tin nhắn mới 
  // ${user.fullname} đã gửi lời mời kết bạn 
  // ${user.fullname} đã trả lời bình luận 
  // ${user.fullname} đã chia sẻ bài viết
  // ${user.fullname} đã tạo bài viết mới 
  // ${user.fullname} đã bình luận bài viết
  // ${user.fullname} đã bày tỏ cảm xúc với bài viết 
  // ${user.fullname} đã bày tỏ cảm xúc với bình luận
  body: string, // nội dung hiển thị trên thông báo 
  // content || message || comment 
  userInfo: {
    receiver: number, // id người nhận
    sender: number, // id người đăng nhập
    fullname: string, // tên người đăng nhập
    avatar: string, // link ảnh người đăng nhập
    mutiple: false // true = gửi cho tất cả bạn bè (dùng trong tạo bài viết + history)
  },
  reaction: {
    type: number 
    // 1 thích - 2 ha ha - 3 thương thương - 4 yêu thích - 5 tức giận
  },
}
