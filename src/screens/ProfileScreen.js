import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  Button,
  List,
  Switch,
  Avatar,
  Divider,
} from 'react-native-paper';

export default function ProfileScreen({navigation}) {
  const [notifications, setNotifications] = useState(true);
  const [autoRenewal, setAutoRenewal] = useState(true);

  const userInfo = {
    name: 'Narayan Das',
    phone: '+91 90000 00000',
    email: 'das.narayan95@gmail.com',
    address: 'Cuttack, Odisha',
    memberSince: 'January 2024',
  };

  const subscriptionInfo = {
    plan: 'Daily Plan',
    product: 'Fresh Cow Milk',
    quantity: '1L',
    nextDelivery: 'Tomorrow 6:00 AM',
    status: 'Active',
  };

  const menuItems = [
    {
      title: 'Order History',
      icon: 'history',
      onPress: () => navigation.navigate('OrderHistory'),
    },
    {
      title: 'Subscription Details',
      icon: 'subscriptions',
      onPress: () => navigation.navigate('Subscribe'),
    },
    {
      title: 'Delivery Address',
      icon: 'location-on',
      onPress: () => Alert.alert('Address', 'Update delivery address'),
    },
    {
      title: 'Payment Methods',
      icon: 'payment',
      onPress: () => Alert.alert('Payment', 'Manage payment methods'),
    },
    {
      title: 'Help & Support',
      icon: 'help',
      onPress: () => Alert.alert('Support', 'Call +91 90000 00000'),
    },
    {
      title: 'About Shuddha Odisha',
      icon: 'info',
      onPress: () => Alert.alert('About', 'Farm fresh milk from Odisha'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text 
              size={64} 
              label={userInfo.name.split(' ').map(n => n[0]).join('')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
              <Text style={styles.memberSince}>
                Member since {userInfo.memberSince}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Current Subscription */}
      <Card style={styles.subscriptionCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Current Subscription</Text>
          <View style={styles.subscriptionDetails}>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>Plan:</Text>
              <Text style={styles.subscriptionValue}>{subscriptionInfo.plan}</Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>Product:</Text>
              <Text style={styles.subscriptionValue}>{subscriptionInfo.product}</Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>Quantity:</Text>
              <Text style={styles.subscriptionValue}>{subscriptionInfo.quantity}</Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>Next Delivery:</Text>
              <Text style={styles.subscriptionValue}>{subscriptionInfo.nextDelivery}</Text>
            </View>
            <View style={styles.subscriptionRow}>
              <Text style={styles.subscriptionLabel}>Status:</Text>
              <Text style={[styles.subscriptionValue, styles.activeStatus]}>
                {subscriptionInfo.status}
              </Text>
            </View>
          </View>
          <Button 
            mode="outlined" 
            style={styles.manageButton}
            onPress={() => navigation.navigate('Subscribe')}
          >
            Manage Subscription
          </Button>
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Delivery Notifications</Text>
              <Text style={styles.settingSubtitle}>
                Get notified about delivery updates
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto Renewal</Text>
              <Text style={styles.settingSubtitle}>
                Automatically renew subscription
              </Text>
            </View>
            <Switch
              value={autoRenewal}
              onValueChange={setAutoRenewal}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Menu Items */}
      <Card style={styles.menuCard}>
        <Card.Content>
          {menuItems.map((item, index) => (
            <View key={index}>
              <List.Item
                title={item.title}
                left={(props) => <List.Icon {...props} icon={item.icon} />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={item.onPress}
                style={styles.menuItem}
              />
              {index < menuItems.length - 1 && <Divider />}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  profileCard: {
    margin: 16,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#1070d6',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  userPhone: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#2e9b51',
    marginTop: 4,
    fontWeight: '600',
  },
  subscriptionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  subscriptionDetails: {
    marginBottom: 16,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  subscriptionLabel: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  subscriptionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  activeStatus: {
    color: '#2e9b51',
  },
  manageButton: {
    borderColor: '#1070d6',
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 2,
  },
  divider: {
    marginVertical: 8,
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 4,
  },
  logoutButton: {
    margin: 16,
    borderColor: '#f05a28',
  },
});