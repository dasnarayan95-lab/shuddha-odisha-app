import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CartScreen from './src/screens/CartScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: '#1070d6',
    accent: '#2e9b51',
    background: '#ffffff',
    surface: '#f7f8fa',
    text: '#222222',
    placeholder: '#6b6b6b',
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Products':
              iconName = 'local-grocery-store';
              break;
            case 'Subscribe':
              iconName = 'subscriptions';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{title: 'ଶୁଦ୍ଧ ଓଡ଼ିଶା'}}
      />
      <Tab.Screen 
        name="Products" 
        component={ProductsScreen}
        options={{title: 'Products'}}
      />
      <Tab.Screen 
        name="Subscribe" 
        component={SubscriptionScreen}
        options={{title: 'Subscribe'}}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
            options={{
              title: 'Cart',
              headerStyle: {backgroundColor: theme.colors.primary},
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="OrderHistory" 
            component={OrderHistoryScreen}
            options={{
              title: 'Order History',
              headerStyle: {backgroundColor: theme.colors.primary},
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}