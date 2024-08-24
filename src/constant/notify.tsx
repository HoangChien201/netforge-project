import uuid from 'react-native-uuid';
import { socket } from '../http/SocketHandle';
import { useSelector } from 'react-redux';
import { RootState } from '../component/store/store';

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
  navigate: {
    screen: null,
    params: null
  },
  timestamp: new Date().toISOString()
});


export const useSendNotification = () => {
  const user = useSelector((state:RootState)=>state.user?.value)

  const sendNCommentPost = ({ postId, body, receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 2,
      postId:postId,
      title: `${user?.fullname} đã bình luận bài viết`,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId)
      },
    };
    if(receiver != user?.id){
      socket.emit('notification', data);
      console.log('sendNCommentPost');
      
    }else{
      console.log('receiver: ', receiver + ' và user: ', user?.id);
      
    }
  };
  const sendNRepComment = ({ postId1, body, commentId, receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 2,
      postId1:postId1,
      commentId,
      title: `${user?.fullname} đã trả lời bình luận `,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId1)
      },
    };
    if(receiver != user?.id){
      socket.emit('notification', data);
      console.log('sendNRepComment');
      
    }else{
      console.log('receiver: ', receiver + ' và user: ', user?.id);
      
    }

    
  };
  const sendNReaction = ({ postId, receiver, reactionType }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 1,
      postId:postId,
      title: `${user?.fullname} bày tỏ cảm xúc với bài viết `,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      reaction: {
        type: reactionType
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId)
      },
    };
    if(receiver != user?.id){
      socket.emit('notification', data);
    }else{
      console.log('receiver: ', receiver + ' và user: ', user?.id);
      
    }
    
  };
  const sendNReactionComment = ({ postId1, commentId, body, receiver, reactionType }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 10,
      postId1:postId1,
      commentId,
      title: `${user?.fullname} đã bày tỏ cảm xúc với bình luận `,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      reaction: {
        type: reactionType
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId1)
      },
    };
    if(receiver != user?.id){
      socket.emit('notification', data);
    }else{
      console.log('receiver: ', receiver + ' và user: ', user?.id);
      
    }
    
  };
  const sendNCreateNewPostHistory = ({ postId, body, }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 4,
      postId:postId,
      title: `${user?.fullname} đã tạo bài viết mới `,
      body,
      userInfo: {
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
        multiple: true
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId)
      },
    };
    socket.emit('notification', data);
    
  };
  // gửi kết bạn
  const sendNRequestFriend = ({ receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 3,
      friendId: user?.id,
      title: `${user?.fullname} đã gửi lời mời kết bạn `,
      body: 'Kết bạn với nhau nào!',
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      navigate: {
        screen: 'NotificationScreen',
        params: null
      },
    };
    socket.emit('notification', data);
    
  };
  const sendNMessage = ({ messId, body, receiver }) => {

    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 6,
      messId,
      title: `${user?.fullname} đã gửi tin nhắn mới  `,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,

      },
      navigate: {
        screen: 'ListMessageScreen',
      },

    };
    if(receiver != user?.id){
      socket.emit('notification', data);
    }
    
  };
  const sendNSharePost = ({ postId, body, receiver }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 5,
      postId:postId,
      title: `${user?.fullname} đã chia sẻ bài viết `,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,

      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId)
      },

    };
    if(receiver != user?.id){
      socket.emit('notification', data);
    }
    
  };
  const sendBirthDay = ({ friendId, fullname, avatar }) => {
    const notificationTemplate = createNotificationTemplate();    
    const data = {
      ...notificationTemplate,
      type: 7,
      friendId,
      title: `Hôm nay là sinh nhật của ${fullname}`,
      userInfo: {
        receiver: user?.id,
        avatar,
        fullname
      },
      navigate: {
        screen: 'NotificationScreen',
        params: null
      },
    };
    socket.emit('notification', data);                            
    
  };
  const sendAcceptFriend = ({ friendId }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 8,
      friendId:user?.id,
      title: `${user?.fullname} đã chấp nhận lời mời kết bạn!`,
      body: "",
      userInfo: {
        receiver: friendId,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      navigate: {
        screen: 'FriendScreen',
        params: user?.id
      },
    };
    socket.emit('notification', data);
    
  };
  const sendTagFriend = ({ postId, receiver, body }) => {
    const notificationTemplate = createNotificationTemplate();
    const data = {
      ...notificationTemplate,
      type: 9,
      postId,
      title: `${user?.fullname} đã gắn thẻ bạn trong một bài viết`,
      body,
      userInfo: {
        receiver,
        sender: user?.id,
        fullname: user?.fullname,
        avatar: user?.avatar,
      },
      navigate: {
        screen: 'CommentsScreen',
        params: Number(postId)
      },
    };
    socket.emit('notification', data);
    
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
  // ${user?.fullname} đã gửi tin nhắn mới 
  // ${user?.fullname} đã gửi lời mời kết bạn 
  // ${user?.fullname} đã trả lời bình luận 
  // ${user?.fullname} đã chia sẻ bài viết
  // ${user?.fullname} đã tạo bài viết mới 
  // ${user?.fullname} đã bình luận bài viết
  // ${user?.fullname} đã bày tỏ cảm xúc với bài viết 
  // ${user?.fullname} đã bày tỏ cảm xúc với bình luận
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
