import { useSendNotification } from "../../../constant/notify";
import { addMessageAPI, createGroupsHTTP } from "../../../http/ChienHTTP";
import { socket } from "../../../http/SocketHandle";
import { GroupChatType } from "../ListMessageItem";
import { messageType, reactionType } from "../MessageItem";
export class MessageProvider {

    private id: number;
    public state: number;
    public create_at: string;
    public update_at: string;
    public message: string |
    {
        uri: string,
        type: string,
        fileName: string
    };
    public type: string;
    public sender: {
        id: number,
        fullname: string,
        avatar: string
    };
    public reads: Array<{
        "id": number,
        "user": {
            "id": number,
            "fullname": string,
            "avatar": string
        },
        "message": number,
        "read_at": string
    }>;
    public reactions: Array<reactionType>
    public group: number | {
        id: number
    } | undefined;
    public parent: number | {
        sender: {
            "id": number,
            "fullname": string,
            "avatar": string
        },
        id: number,
    } | null


    constructor(message: messageType | any) {
        this.id = !message.id ? Date.now() : message.id,
            this.message = message.message,
            this.create_at = !message.create_at ? new Date().toISOString() : message.create_at,
            this.update_at = !message.update_at ? new Date().toISOString() : message.update_at,
            this.state = !message.state ? 0 : message.state,
            this.type = message.type,
            this.sender = message.sender,
            this.reactions = !message.reactions ? [] : message.reactions,
            this.reads = !message.reads ? [] : message.reads,
            this.parent = message.parent && (typeof message.parent === 'object' ? message.parent : { sender: message.sender, id: message.id })
        this.group = message.group
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
    public async CreateMessageToAPIByGroup(group_id: number) {
        this.group = group_id
        if (this.parent) {
            this.parent = typeof this.parent === 'object' ? this.parent.id : this.parent
        }
        return await addMessageAPI(this)

    }
    public async CreateMessageToAPIByReceiver(sender: number, reveicer: number) {
        try {

            const createGroup = {
                type: 'single',
                members: [sender, reveicer]
            }
            const group: GroupChatType = await createGroupsHTTP(createGroup)

            this.group = group.id
            const messageCreate = await addMessageAPI(this)

            if (messageCreate) {
                this.sendMessage({
                    nameSender: messageCreate.sender.fullname,
                    avatarSender: messageCreate.sender.avatar,
                    sender: messageCreate.sender.id,
                    messId: messageCreate.id,
                    body: '',
                    receiver: reveicer
                }

                )
            }



            return messageCreate
        } catch (error) {
            console.log(error);

            return "Gửi tin nhắn lỗi"
        }


    }
    private sendMessage = ({ nameSender, avatarSender, sender, messId, body, receiver }) => {
        const notificationTemplate = this.createNotificationTemplate();
        const data = {
            ...notificationTemplate,
            type: 6,
            messId,
            title: `${nameSender} đã gửi tin nhắn mới  `,
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
        console.log('Sent notification data:', data);
    };

    private createNotificationTemplate = () => ({
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
    });
}

export class MessageManage {
    public messages: Array<MessageProvider>
    constructor(messages: Array<messageType>) {
        this.messages = messages.map(m => {
            return new MessageProvider(m)
        })
    }

    /**
     * addMessage
     */
    public addMessage(messsage: MessageProvider) {
        this.messages.push(messsage)
    }

    /**
     * deleteMessage
     */
    public deleteMessage(id: number) {
        this.messages.filter((m) => m.getId !== id)
    }
}