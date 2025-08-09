import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {Card, Button, Chip, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDeliveryTime = () => {
    const hour = currentTime.getHours();
    return hour >= 5 && hour <= 7;
  };

  const quickActions = [
    {
      title: 'Order Milk',
      icon: 'local-drink',
      color: '#1070d6',
      action: () => navigation.navigate('Products'),
    },
    {
      title: 'Subscribe',
      icon: 'subscriptions',
      color: '#2e9b51',
      action: () => navigation.navigate('Subscribe'),
    },
    {
      title: 'Track Order',
      icon: 'local-shipping',
      color: '#f05a28',
      action: () => navigation.navigate('OrderHistory'),
    },
    {
      title: 'Support',
      icon: 'support-agent',
      color: '#6b6b6b',
      action: () => Alert.alert('Support', 'Call +91 90000 00000'),
    },
  ];

  const todaysProducts = [
    {
      name: 'Fresh Cow Milk',
      price: '₹54/L',
      available: true,
    },
    {
      name: 'Buffalo Milk',
      price: '₹62/L',
      available: true,
    },
    {
      name: 'Fresh Dahi',
      price: '₹70/kg',
      available: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.brandOdia}>ଶୁଦ୍ଧ ଓଡ଼ିଶା</Text>
              <Text style={styles.brandEng}>SHUDDHA ODISHA</Text>
              <Text style={styles.tagline}>Pure & Fresh Milk</Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🥛</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Delivery Status */}
      <Card style={styles.statusCard}>
        <Card.Content>
          <View style={styles.statusContent}>
            <Icon 
              name={isDeliveryTime() ? 'local-shipping' : 'schedule'} 
              size={24} 
              color={isDeliveryTime() ? '#2e9b51' : '#f05a28'} 
            />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>
                {isDeliveryTime() ? 'Delivery in Progress' : 'Next Delivery'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {isDeliveryTime() 
                  ? 'Your milk is on the way!' 
                  : 'Tomorrow 5:00-7:30 AM'
                }
              </Text>
            </View>
            <Chip 
              mode="outlined" 
              textStyle={{color: isDeliveryTime() ? '#2e9b51' : '#f05a28'}}
            >
              {isDeliveryTime() ? 'Live' : 'Scheduled'}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.actionCard, {borderColor: action.color}]}
              onPress={action.action}
            >
              <Icon name={action.icon} size={32} color={action.color} />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Fresh Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Fresh Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {todaysProducts.map((product, index) => (
            <Card key={index} style={styles.productCard}>
              <Card.Content>
                <Text style={styles.productEmoji}>🥛</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Button 
                  mode="contained" 
                  compact 
                  style={styles.addButton}
                  onPress={() => navigation.navigate('Products')}
                >
                  Add to Cart
                </Button>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Quality Assurance */}
      <Card style={styles.qualityCard}>
        <Card.Content>
          <Text style={styles.qualityTitle}>Quality Assurance</Text>
          <View style={styles.qualityFeatures}>
            <View style={styles.qualityItem}>
              <Icon name="verified" size={20} color="#2e9b51" />
              <Text style={styles.qualityText}>FSSAI Licensed</Text>
            </View>
            <View style={styles.qualityItem}>
              <Icon name="science" size={20} color="#2e9b51" />
              <Text style={styles.qualityText}>Quality Tested</Text>
            </View>
            <View style={styles.qualityItem}>
              <Icon name="ac-unit" size={20} color="#2e9b51" />
              <Text style={styles.qualityText}>Chilled Transport</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="phone"
        onPress={() => Alert.alert('Call Support', '+91 90000 00000')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  headerCard: {
    margin: 16,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  brandOdia: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1070d6',
    marginTop: 4,
  },
  brandEng: {
    fontSize: 12,
    color: '#2e9b51',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 4,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
  },
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e9b51',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  productCard: {
    width: 140,
    marginRight: 12,
    elevation: 2,
  },
  productEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#1070d6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  addButton: {
    marginTop: 4,
  },
  qualityCard: {
    margin: 16,
    elevation: 2,
  },
  qualityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  qualityFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  qualityItem: {
    alignItems: 'center',
  },
  qualityText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2e9b51',
  },
});