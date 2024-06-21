import { PermissionsAndroid } from "react-native";

export async function PermissionCamera() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Quyền sử dụng máy ảnh',
                message:
                    'Ứng dụng cần quyền truy cập máy ảnh của bạn ',
                buttonNeutral: 'Hỏi tôi sau',
                buttonNegative: 'Không cho',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.warn(err);
    }
}
