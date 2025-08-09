# Shuddha Odisha - Fresh Milk Delivery App

A React Native mobile application for **Shuddha Odisha**, providing fresh milk delivery services in Cuttack, Paradeep, and nearby areas in Odisha.

## 🥛 About Shuddha Odisha

Shuddha Odisha (ଶୁଦ୍ଧ ଓଡ଼ିଶା) brings farm-fresh, quality-tested milk directly from local farmers to your doorstep. We support local dairy farmers while ensuring customers receive pure, chilled milk daily.

## 📱 App Features

### Core Functionality
- **Home Dashboard** - Real-time delivery status and quick actions
- **Product Catalog** - Browse fresh milk, dairy products with search & filtering
- **Subscription Management** - Daily, alternate day, and weekly delivery plans
- **Shopping Cart** - Add items, apply promo codes, calculate totals
- **Order History** - Track past orders with status filtering
- **User Profile** - Manage account settings and subscription details

### Key Highlights
- **Bilingual Support** - English and Odia script (ଶୁଦ୍ଧ ଓଡ଼ିଶା)
- **Material Design UI** - Clean, intuitive interface with React Native Paper
- **Real-time Updates** - Live delivery tracking and notifications
- **Quality Assurance** - FSSAI licensed, quality tested products
- **Local Focus** - Supporting Odisha farmers and communities

## 🛠️ Tech Stack

- **React Native** 0.72.6
- **React Navigation** - Tab and stack navigation
- **React Native Paper** - Material Design components
- **React Native Vector Icons** - Icon library
- **AsyncStorage** - Local data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dasnarayan95-lab/shuddha-odisha-app.git
   cd shuddha-odisha-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   
   For Android:
   ```bash
   npx react-native run-android
   ```
   
   For iOS:
   ```bash
   npx react-native run-ios
   ```

## 📁 Project Structure

```
src/
├── screens/
│   ├── HomeScreen.js          # Dashboard with quick actions
│   ├── ProductsScreen.js      # Product catalog with cart
│   ├── SubscriptionScreen.js  # Subscription plans & signup
│   ├── ProfileScreen.js       # User profile & settings
│   ├── CartScreen.js          # Shopping cart & checkout
│   └── OrderHistoryScreen.js  # Order tracking & history
├── components/               # Reusable UI components
├── navigation/              # Navigation configuration
├── services/               # API services
├── utils/                  # Helper functions
└── assets/                # Images, fonts, icons
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#1070d6` - Brand color, headers, CTAs
- **Accent Green**: `#2e9b51` - Success states, quality badges
- **Orange**: `#f05a28` - Alerts, pending states
- **Gray**: `#6b6b6b` - Secondary text, placeholders

### Typography
- **Odia Script**: Noto Sans Oriya for ଶୁଦ୍ଧ ଓଡ଼ିଶା branding
- **English**: Noto Sans for clean, readable interface

## 🔧 Configuration

### Environment Setup
1. Configure React Native development environment
2. Set up Android/iOS simulators
3. Install required fonts for Odia script support

### Additional Setup Required
- **Push Notifications** - Firebase Cloud Messaging
- **Payment Gateway** - Razorpay/Stripe integration
- **Maps Integration** - Google Maps for delivery tracking
- **Analytics** - Firebase Analytics for user insights
- **Crash Reporting** - Firebase Crashlytics

## 📦 Build & Deployment

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace ShuddhaOdisha.xcworkspace -scheme ShuddhaOdisha archive
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Shuddha Odisha**
- Phone: +91 90000 00000
- Email: hello@shuddhaodisha.com
- Address: Cuttack, Odisha

**Developer**
- GitHub: [@dasnarayan95-lab](https://github.com/dasnarayan95-lab)
- Email: das.narayan95@gmail.com

## 🙏 Acknowledgments

- Local dairy farmers of Odisha
- React Native community
- Material Design team
- Noto Fonts project for Odia script support

---

**ଶୁଦ୍ଧ ଓଡ଼ିଶା** - Pure & Fresh Milk from the Heart of Odisha 🥛