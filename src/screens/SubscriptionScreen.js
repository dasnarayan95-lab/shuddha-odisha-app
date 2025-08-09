import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  RadioButton,
  Chip,
  Divider,
} from 'react-native-paper';

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState('daily');
  const [selectedProduct, setSelectedProduct] = useState('cow-milk');
  const [quantity, setQuantity] = useState('1');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    startDate: '',
  });

  const plans = [
    {
      id: 'daily',
      title: 'Daily Plan',
      description: 'Delivered every morning',
      price: 54,
      savings: 0,
      popular: true,
    },
    {
      id: 'alternate',
      title: 'Alternate Day',
      description: 'Delivery on alternate days',
      price: 56,
      savings: 0,
    },
    {
      id: 'weekly',
      title: 'Weekly Bulk',
      description: 'Once a week delivery',
      price: 52,
      savings: 8,
    },
  ];

  const products = [
    {
      id: 'cow-milk',
      name: 'Fresh Cow Milk',
      basePrice: 54,
      unit: 'L',
    },
    {
      id: 'buffalo-milk',
      name: 'Buffalo Milk',
      basePrice: 62,
      unit: 'L',
    },
    {
      id: 'toned-milk',
      name: 'Toned Milk',
      basePrice: 48,
      unit: 'L',
    },
  ];

  const getCurrentPlan = () => plans.find(p => p.id === selectedPlan);
  const getCurrentProduct = () => products.find(p => p.id === selectedProduct);

  const calculateMonthlyTotal = () => {
    const plan = getCurrentPlan();
    const product = getCurrentProduct();
    const dailyPrice = product.basePrice * parseInt(quantity);
    
    let deliveriesPerMonth;
    switch (selectedPlan) {
      case 'daily':
        deliveriesPerMonth = 30;
        break;
      case 'alternate':
        deliveriesPerMonth = 15;
        break;
      case 'weekly':
        deliveriesPerMonth = 4;
        break;
      default:
        deliveriesPerMonth = 30;
    }
    
    return dailyPrice * deliveriesPerMonth;
  };

  const handleSubscribe = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }

    const plan = getCurrentPlan();
    const product = getCurrentProduct();
    const monthlyTotal = calculateMonthlyTotal();

    Alert.alert(
      'Subscription Confirmed!',
      `Plan: ${plan.title}\nProduct: ${product.name}\nQuantity: ${quantity}${product.unit}\nMonthly Total: ₹${monthlyTotal}\n\nWe will call you to confirm delivery details.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowSubscribeModal(false);
            setCustomerInfo({name: '', phone: '', address: '', startDate: ''});
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.headerTitle}>Choose Your Subscription</Text>
          <Text style={styles.headerSubtitle}>
            Fresh milk delivered to your doorstep daily
          </Text>
        </Card.Content>
      </Card>

      {/* Plan Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Plan</Text>
        {plans.map(plan => (
          <Card 
            key={plan.id} 
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlanCard
            ]}
          >
            <Card.Content>
              <View style={styles.planHeader}>
                <RadioButton
                  value={plan.id}
                  status={selectedPlan === plan.id ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedPlan(plan.id)}
                />
                <View style={styles.planInfo}>
                  <View style={styles.planTitleRow}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    {plan.popular && (
                      <Chip mode="flat" style={styles.popularChip}>
                        Popular
                      </Chip>
                    )}
                  </View>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                  <View style={styles.planPricing}>
                    <Text style={styles.planPrice}>₹{plan.price}/L</Text>
                    {plan.savings > 0 && (
                      <Text style={styles.savings}>Save ₹{plan.savings}/L</Text>
                    )}
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Product Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Product</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map(product => (
            <Card 
              key={product.id}
              style={[
                styles.productCard,
                selectedProduct === product.id && styles.selectedProductCard
              ]}
              onPress={() => setSelectedProduct(product.id)}
            >
              <Card.Content>
                <RadioButton
                  value={product.id}
                  status={selectedProduct === product.id ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedProduct(product.id)}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>₹{product.basePrice}/{product.unit}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Quantity Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Quantity</Text>
        <View style={styles.quantityContainer}>
          {['0.5', '1', '2', '3'].map(qty => (
            <Chip
              key={qty}
              mode={quantity === qty ? 'flat' : 'outlined'}
              selected={quantity === qty}
              onPress={() => setQuantity(qty)}
              style={styles.quantityChip}
            >
              {qty}L
            </Chip>
          ))}
        </View>
      </View>

      {/* Subscription Summary */}
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.summaryTitle}>Subscription Summary</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan:</Text>
            <Text style={styles.summaryValue}>{getCurrentPlan()?.title}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Product:</Text>
            <Text style={styles.summaryValue}>{getCurrentProduct()?.name}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Daily Quantity:</Text>
            <Text style={styles.summaryValue}>{quantity}L</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Daily Cost:</Text>
            <Text style={styles.summaryValue}>
              ₹{(getCurrentProduct()?.basePrice * parseInt(quantity)).toFixed(2)}
            </Text>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Monthly Total:</Text>
            <Text style={styles.summaryTotalValue}>₹{calculateMonthlyTotal()}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Subscribe Button */}
      <Button
        mode="contained"
        style={styles.subscribeButton}
        onPress={() => setShowSubscribeModal(true)}
      >
        Start Subscription
      </Button>

      {/* Subscription Modal */}
      <Modal
        visible={showSubscribeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSubscribeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text style={styles.modalTitle}>Complete Your Subscription</Text>
              
              <TextInput
                label="Full Name *"
                value={customerInfo.name}
                onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
                style={styles.input}
                mode="outlined"
              />
              
              <TextInput
                label="Phone / WhatsApp *"
                value={customerInfo.phone}
                onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
              />
              
              <TextInput
                label="Delivery Address *"
                value={customerInfo.address}
                onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
                style={styles.input}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
              
              <TextInput
                label="Preferred Start Date"
                value={customerInfo.startDate}
                onChangeText={(text) => setCustomerInfo({...customerInfo, startDate: text})}
                style={styles.input}
                mode="outlined"
                placeholder="Tomorrow / DD/MM/YYYY"
              />
              
              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setShowSubscribeModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubscribe}
                  style={styles.confirmButton}
                >
                  Confirm & Pay
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e9b51',
    marginBottom: 12,
  },
  planCard: {
    marginBottom: 8,
    elevation: 2,
  },
  selectedPlanCard: {
    borderColor: '#1070d6',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planInfo: {
    flex: 1,
    marginLeft: 8,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  popularChip: {
    backgroundColor: '#2e9b51',
  },
  planDescription: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 2,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  savings: {
    fontSize: 12,
    color: '#2e9b51',
    marginLeft: 8,
    fontWeight: '600',
  },
  productCard: {
    width: 120,
    marginRight: 8,
    elevation: 2,
  },
  selectedProductCard: {
    borderColor: '#1070d6',
    borderWidth: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 12,
    color: '#1070d6',
    textAlign: 'center',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quantityChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  summaryCard: {
    margin: 16,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  subscribeButton: {
    margin: 16,
    paddingVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1070d6',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
});