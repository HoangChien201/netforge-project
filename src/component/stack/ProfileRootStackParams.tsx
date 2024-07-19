import ProfileScreen from "../../screens/ProfileScreen";
import EditProfileScreen from "../../screens/EditProfileScreen";
import SettingScreen from "../../screens/profile/SettingScreen";
import HistoryActivityScreen from "../../screens/profile/HistoryActivityScreen";
import HelpScreen from "../../screens/profile/HelpScreen";
import FriendScreen from "../../screens/profile/FriendScreen";
import MenuScreen from "../../screens/MenuScreen";
import NaviStack from "../../component/stack/NaviStack"
import ChangePassword from "../../screens/ChangePassword";
import QRcodeScreen from "../../screens/QRcodeScreen";
import Scanner from "../../screens/Scanner";
import HistoryStack from "./HistoryStack";
import HomeScreen from "../../screens/HomeScreen";
import LiveStack from "./LiveStack";
import FriendProfile from "../profile/FriendProfile";
import Friends from "../../screens/profile/friendScreen/Friends";

export enum ProfileRootStackEnum {
    ProfileScreen = 'ProfileScreen',
    EditProfileScreen = 'EditProfileScreen',
    FollowingScreen = 'FollowingScreen',
    SettingScreen = 'SettingScreen',
    HistoryActivityScreen = 'HistoryActivityScreen',
    HelpScreen = 'HelpScreen',
    NaviStack = 'NaviStack',
    MenuScreen = 'MenuScreen',
    ChangePassword = 'ChangePassword',
    QRcodeScreen = 'QRcodeScreen',
    Scanner = 'Scanner',
    FriendScreen = 'FriendScreen',
    HistoryStack = 'HistoryStack',
    HomeScreen = 'HomeScreen',
    LiveStack = 'LiveStack',
    FriendProfile = 'FriendProfile',
    Friends = 'Friends',
}

export type ProfileRootStackParams={
    ProfileScreen : undefined;
    EditProfileScreen: undefined;
    SettingScreen : undefined;
    HistoryActivityScreen : undefined;
    HelpScreen : undefined;
    NaviStack :undefined,
    MenuScreen:undefined;
    ChangePassword: undefined;
    QRcodeScreen: undefined;
    Scanner: undefined;
    FriendScreen: undefined;
    HistoryStack:undefined;
    HomeScreen: undefined;
    LiveStack: undefined;
    FriendProfile:undefined;
    FollowingScreen:undefined;
    Friends: undefined;

}

export const ProfileRootStackScreens=[
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.MenuScreen,
        component: MenuScreen,
        options: {
            headerShown: false,
            // headerLeft: () => null,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.ProfileScreen,
        component: ProfileScreen,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"Trang cá nhân",
            headerTitleAlign:'center'
            
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.EditProfileScreen,
        component: EditProfileScreen,
        options: {
            headerShown: false,
            // headerLeft: () => (
            //     // <CustomBackButton onPress={handleBackPress} />
            // ),
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.SettingScreen,
        component: SettingScreen,
        options: {
            title:"Cài đặt",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.HistoryStack,
        component: HistoryStack,
        options: {
            title:"Lịch sử hoạt động",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.HelpScreen,
        component: HelpScreen,
        options: {
            title:"Giúp đỡ",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.FriendScreen,
        component: FriendScreen,
        options: {
            title:"Bạn bè",
            headerTitleAlign:'center',
            animationTypeForReplace: 'push',
            animationEnabled: true,
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.ChangePassword,
        component: ChangePassword,
        options: {
            title:"Đổi mật khẩu",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.QRcodeScreen,
        component: QRcodeScreen,
        options: {
            title:"Mã QR của tôi",
            headerTitleAlign:'center'
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.HomeScreen,
        component: HomeScreen,
        options: {
            headerShown: false
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.LiveStack,
        component: LiveStack,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
        
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.FriendProfile,
        component: FriendProfile,
        options: {
            headerShown: true,
            // headerLeft: () => null,
            title:"",
            headerTitleAlign:'center'
            
        }
    },
    {
        id: Math.random() + "" + Date,
        name: ProfileRootStackEnum.Friends,
        component: Friends,
        options: {
            headerShown: true,
            tabBarShowLabel: false,
            title:"Bạn bè",
            headerTitleAlign:'center'
        }
    },
    
]
