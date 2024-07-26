import { MessageScreenNavigationProp } from "../../screens/message/MessageScreen"
import { NetworkStackNavigationProp } from "../stack/NetworkRootStackParams"
type PartnerType = {
    id: number,
    fullname: string,
    avatar: string
}
export function NavigateToMessage(partner: PartnerType, navigation: MessageScreenNavigationProp) {
    const { fullname, avatar } = partner
    navigation.navigate('MessageManagementScreen',
        {
            screen: "MessageScreen",
            params: {
                fullname,
                avatar,
                members: [
                    {
                        user: partner
                    }
                ]
            }
        }
    )
}

