import HomeScreen from "../../screens/HomeScreen";
import LiveStack from "./LiveStack";
import CreatePostScreen from "../../screens/CreatePostScreen";
import HostScreen from "../../screens/live/HostScreen";


export enum CreatePostStackEnum {
    HomeScreen = 'HomeScreen',
    LiveStack = 'LiveStack',
    CreatePostScreen= 'CreatePostScreen',
    HostScreen = 'HostScreen',
}

export type CreatePostStackParams={
    HomeScreen: undefined;
    LiveStack: undefined;
    CreatePostScreen: undefined;
    HostScreen: undefined;
}

export const CreatePostRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: CreatePostStackEnum.CreatePostScreen,
        component: CreatePostScreen,
        options: {
            headerShown: false,
            tabBarShowLabel: false,
        
        }
    },
    {
        id: Math.random() + "" + Date,
        name: CreatePostStackEnum.HomeScreen,
        component: HomeScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: CreatePostStackEnum.LiveStack,
        component: LiveStack,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
            title:"Phát trực tiếp",
            headerTitleAlign:'center'
        
        }
    },
    {
        id: Math.random() + "" + Date,
        name: CreatePostStackEnum.HostScreen,
        component: HostScreen,
        options: {
            headerShown: false,
            tabBarShowLabel: false,
        }
    },
    
]
