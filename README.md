# PokeApp - Pokemon Information Mobile Application

## Prerequisites
- Node.js (v18)
- React Native CLI
- Android Studio (for Android simulation)
- Xcode (for iOS simulation, Mac only)

## Setup Instructions

1. Install React Native CLI globally
```bash
npm install -g react-native-cli
```

2. For Android Simulation:
   a. Install Android Studio
   b. Create a new Android Virtual Device (AVD) in Android Studio
   c. Start the Android Virtual Device

3. For iOS Simulation (Mac only):
   a. Install Xcode from App Store
   b. Install Xcode Command Line Tools
   ```bash
   xcode-select --install
   ```

## Running the App

### For Android
```bash
# Ensure Android Virtual Device is running
cd PokeApp
npx react-native run-android
```

### For iOS (Mac only)
```bash
cd PokeApp
npx react-native run-ios
```

## Troubleshooting
- Ensure all dependencies are installed: `npm install`
- If Metro bundler fails, try: `npx react-native start --reset-cache`
- For Android, ensure ANDROID_HOME environment variable is set
- For iOS, ensure you have the latest Xcode and Command Line Tools

## Features
- Pokemon List with infinite scrolling
- Detailed Pokemon Information
- Pokemon Comparison
- Bottom Navigation

## API
Uses PokeAPI (https://pokeapi.co/docs/v2) for Pokemon data

## Author
Naufal Ihsan
