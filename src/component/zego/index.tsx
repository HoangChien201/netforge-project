// @ts-ignore
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'

export function EventZego(){
    // Xử lý sự kiện kết nối
    ZegoUIKitPrebuiltCallService.on('connectionStateUpdate', (state, reason) => {
        console.log('Connection lost, auto logging out...');
        // if (state === ZegoConnectionStateDisconnected) {
        //     // Xử lý khi kết nối bị ngắt
        // }
    });
}

// // Xử lý sự kiện kết nối lại
// ZegoUIKitPrebuiltCallService.on('connectionStateUpdate', (state, reason) => {
//     console.log('Reconnected to the server');
//     // if (state === ZegoConnectionStateReconnected) {
//     //     // Kết nối lại thành công
//     // }
// });