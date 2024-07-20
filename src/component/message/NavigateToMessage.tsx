import { NetworkStackNavigationProp } from "../stack/NetworkRootStackParams"

export function NavigateToMessage(partner:any,navigation:NetworkStackNavigationProp) {
    const {fullname,avatar}=partner
    navigation.navigate('MessageStack',
        {
            screen: "MessageScreen", 
            params:{ 
                    fullname,
                    avatar,
                    members: [
                        {
                            user: partner
                        }
                    ]
                }
        })
}