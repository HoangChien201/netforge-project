
# NetForge - Social Networking App #
NetForge is a modern social networking application designed to connect people seamlessly. Built with TypeScript and React Native, it provides a smooth and interactive experience across both Android and iOS platforms.
## Feature
- Friend Request & Connections
- Integrated real-time chat functionality
- Create & Share Posts
- Real-time Notification
- Voice & Video Calls
## Installation
### Requirements
- NodeJS 16+
- React Native CLI
- Firebase setup for authencation & notifications
- Android/IOS device or emulator
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Setup Guide
1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/NetForge.git
   cd NetForge
   ```
2. **Install dependencies**
   ```
   npm install
   ```
4. **Set up Firebase**
   - Add ```google-serivces.json```(Android) and ```GoogleService-Info.plist```(IOS) to the project
   - Configure Firebase Authentication & Firestore
5. **Run the app**
    - ##### For Android
   
   ```bash
   # using npm
   npm run android
   
   # OR using Yarn
   yarn android
   ```
   
   - ##### For iOS
   
   ```bash
   # using npm
   npm run ios
   
   # OR using Yarn
   yarn ios
   ```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


## Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
