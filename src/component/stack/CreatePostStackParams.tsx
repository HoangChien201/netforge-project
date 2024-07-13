import HomeScreen from "../../screens/HomeScreen";
import LiveStack from "./LiveStack";
import CreatePostScreen from "../../screens/CreatePostScreen";
import LiveWithZego from "../../screens/live/LiveWithZego";


export enum CreatePostStackEnum {
    HomeScreen = 'HomeScreen',
    LiveStack = 'LiveStack',
    CreatePostScreen= 'CreatePostScreen',
    LiveWithZego = 'LiveWithZego',
}

export type CreatePostStackParams={
    HomeScreen: undefined;
    LiveStack: undefined;
    CreatePostScreen: undefined;
    LiveWithZego: undefined;
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
        name: CreatePostStackEnum.LiveWithZego,
        component: LiveWithZego,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
            title:"Phát trực tiếp",
            headerTitleAlign:'center'
        }
    },
    
]
