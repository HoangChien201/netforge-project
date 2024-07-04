import HistorySceen from '../user-histories/Body'
import PostsDetail from "../../screens/posts/PostsDetail";

export enum HisrotyRootStackEnum {
    HistorySceen='HistorySceen',
    PostsDetail='PostsDetail'
}

export type HistoryRootStackParams={
    HistorySceen:undefined,
    PostsDetail:undefined
}

export const HistoryRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: HisrotyRootStackEnum.HistorySceen,
        component: HistorySceen,
        options: {
            headerShown: false,
            // headerLeft: () => null,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: HisrotyRootStackEnum.PostsDetail,
        component: PostsDetail,
        options: {
            headerShown: false,
            // headerLeft: () => null,
        }
    },
    
]
