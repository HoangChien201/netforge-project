export function FilterIconCall(sender:boolean,type:"audio" | 'video'){
    const icons=[
        require('../../../media/icon-message/call-in.png'),
        require('../../../media/icon-message/outgoing-call.png'),
        require('../../../media/icon-message/video-camera.png'),

    ]

    if(type === 'audio'){
        if(sender){
            return icons[1]
        }
        return icons[0]
    }

    if(type === 'video'){
        return icons[2]
    }

}