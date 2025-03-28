import { useSendNotification } from "../../../constant/notify";
import { addMessageAPI, createGroupsHTTP, MessageCreateRes } from "../../../http/ChienHTTP";
import { socket } from "../../../http/SocketHandle";
import { GroupChatType } from "../ListMessageItem";
import { messageType, reactionType } from "../MessageItem";

type userInfoType = {
    id?: number,
    fullname?: string,
    avatar?: string
}
type msgInfoType = {
    id?: number;
    state?: number;
    create_at?: string;
    update_at?: string;
    message?: string |
    {
        uri?: string,
        type?: string,
        fileName?: string
    };
    type?: string;
    reads?: Array<{
        id?: number,
        user?: {
            id?: number,
            fullname?: string,
            avatar?: string
        },
        message?: number,
        read_at?: string
    }>;
    reactions?: Array<reactionType>
    group?: number | {
        id?: number
    } | undefined;
    parent?: number | {
        sender?: {
            id?: number,
            fullname?: string,
            avatar?: string
        },
        id?: number,
    } | null
}

const TYPE_MESSAGE_IMAGE = 'image'
const TYPE_MESSAGE_TEXT = 'text'
const TYPE_MESSAGE_VIDEO = 'video'
const TYPE_MESSAGE_VIDEO_CALL = 'videocall'
const TYPE_MESSAGE_AUDIO_CALL = 'audiocall'

export class Message {

    private id: number;
    public state: number;
    public create_at?: string;
    public update_at?: string;
    public message?: string |
    {
        uri?: string,
        type?: string,
        fileName?: string
    };
    public type?: string;
    public sender?: {
        id?: number,
        fullname?: string,
        avatar?: string
    };
    public reads?: Array<{
        id?: number,
        user?: {
            id?: number,
            fullname?: string,
            avatar?: string
        },
        message?: number,
        read_at?: string
    }>;
    public reactions?: Array<reactionType>
    public group?: number | {
        id?: number
    } | undefined;
    public parent?: number | {
        sender?: {
            id?: number,
            fullname?: string,
            avatar?: string
        },
        id?: number,
    } | null


    constructor(userInfo: userInfoType, msgInfo: msgInfoType) {
        this.id = !msgInfo.id ? Date.now() : msgInfo.id,
            this.message = msgInfo.message,
            this.create_at = !msgInfo.create_at ? new Date().toISOString() : msgInfo.create_at,
            this.update_at = !msgInfo.update_at ? new Date().toISOString() : msgInfo.update_at,
            this.state = !msgInfo.state ? 0 : msgInfo.state,
            this.type = msgInfo.type,
            this.sender = userInfo,
            this.reactions = !msgInfo.reactions ? [] : msgInfo.reactions,
            this.reads = !msgInfo.reads ? [] : msgInfo.reads,
            this.parent = msgInfo.parent && (typeof msgInfo.parent === 'object' ? msgInfo.parent : { sender: userInfo, id: msgInfo.id })
        this.group = msgInfo.group
    }


    public get getId(): number {
        return this.id
    }

    public get getState(): number {
        return this.state
    }

    /**
     * CreateMessageToAPI
     */
    // public async CreateMessageToAPIByGroup(group_id: number) {
    //     this.group = group_id
    //     if (this.parent) {
    //         this.parent = typeof this.parent === 'object' ? this.parent.id : this.parent
    //     }
    //     return await addMessageAPI(this)

    // }
    public async PostMessage(data:{group?:number,sender:number,receiver?:number}) {
        try {
            
            const {group,sender,receiver}= data
            
            if(!group){

                const createGroup = {
                    type: 'single',
                    members: [sender, receiver]
                }
                const group: GroupChatType = await createGroupsHTTP(createGroup)
                
                this.group = group.id
            }
            else {

                this.group=group
            }
            const parentId=typeof this.parent === 'object' ? this.parent?.id : this.parent 
            const msgRes:MessageCreateRes = await addMessageAPI({...this,parent:parentId})

            if (msgRes) {
                const {msg,receivers}=msgRes
                const title=msg.group.type ==='group' ? `nhóm ${msg.group.name} `: 'mới'
                
                receivers.forEach(receiver => {
                    sendNotification({
                        nameSender: msg.sender.fullname,
                        avatarSender: msg.sender.avatar,
                        sender: msg.sender.id,
                        messId: msg.id,
                        title:title,
                        body: msg.type === 'text' ? msg.message  : 'file',
                        receiver: receiver
                    })
                });
                
            }
            return msgRes.msg
        } catch (error) {
            console.log('error',error);

            return "Gửi tin nhắn lỗi"
        }
    }

    public UpdateReaction(reaction){
        this.reactions=reaction
    }
}

export class MessageFactory {
    static newMessageText(userInfo: userInfoType, msgInfo: msgInfoType) {
        msgInfo.type = TYPE_MESSAGE_TEXT
        return new Message(userInfo, msgInfo)
    }

    static newMessageImage(userInfo: userInfoType, msgInfo: msgInfoType) {
        msgInfo.type = TYPE_MESSAGE_IMAGE
        return new Message(userInfo, msgInfo)
    }

    static newMessageVideo(userInfo: userInfoType, msgInfo: msgInfoType) {
        msgInfo.type = TYPE_MESSAGE_VIDEO
        return new Message(userInfo, msgInfo)
    }

    static newMessageVideoCall(userInfo: userInfoType, msgInfo: msgInfoType) {
        msgInfo.type = TYPE_MESSAGE_VIDEO_CALL
        return new Message(userInfo, msgInfo)
    }

    static newMessageAudioCall(userInfo: userInfoType, msgInfo: msgInfoType) {
        msgInfo.type = TYPE_MESSAGE_AUDIO_CALL
        return new Message(userInfo, msgInfo)
    }
}

export class MessageManage {
    public messages: Array<Message>
    constructor(messages: Array<messageType>) {
        this.messages = messages.map(m => {
            const {sender:userInfo,...msgInfo}=m
            
            return new Message(userInfo,msgInfo)
        })
    }

    /**
     * addMessage
     */
    public addMessage(messsage: Message) {
        this.messages.push(messsage)
    }

    /**
     * deleteMessage
     */
    public deleteMessage(id: number) {
        this.messages.filter((m) => m.getId !== id)
    }
}

function sendNotification ({ nameSender, avatarSender, sender, messId, body, receiver,title }) {
    const notificationTemplate = createNotificationTemplate();
    const data = {
        ...notificationTemplate,
        type: 6,
        messId,
        title: `${nameSender} đã gửi tin nhắn ${title}  `,
        body,
        userInfo: {
            receiver,
            sender,
            fullname: nameSender,
            avatar: avatarSender,

        },
        navigate: {
            screen: 'ListMessageScreen',
        },

    };
    socket.emit('notification', data);
};

function createNotificationTemplate() {
    return {

        id: new Date().toISOString(),
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
    }

};