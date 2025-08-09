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
  IconButton,
  Divider,
  TextInput,
  Chip,
} from 'react-native-paper';

export default function CartScreen({navigation}) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Fresh Cow Milk',
      price: 54,
      quantity: 2,
      unit: 'L',
      emoji: '🥛',
    },
    {
      id: 2,
      name: 'Fresh Dahi',
      price: 70,
      quantity: 1,
      unit: 'kg',
      emoji: '🥛',
    },
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setDiscount(10);
      Alert.alert('Promo Applied!', '10% discount applied');
    } else if (promoCode.toLowerCase() === 'welcome') {
      setDiscount(5);
      Alert.alert('Promo Applied!', '5% discount applied');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code');
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    return (getSubtotal() * discount) / 100;
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 100 ? 0 : 20;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getDeliveryFee();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout');
      return;
    }

    Alert.alert(
      'Order Placed!',
      `Your order of ₹${getTotal()} has been placed successfully. You will receive a confirmation call shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setCartItems([]);
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some fresh products to get started</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Products')}
          style={styles.shopButton}
        >
          Shop Now
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cart Items */}
        <Card style={styles.itemsCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Cart Items</Text>
            {cartItems.map(item => (
              <View key={item.id}>
                <View style={styles.cartItem}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}/{item.unit}</Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <IconButton
                      icon="remove"
                      size={20}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <IconButton
                      icon="add"
                      size={20}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                  </View>
                  <Text style={styles.itemTotal}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <Divider style={styles.divider} />
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Promo Code */}
        <Card style={styles.promoCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Promo Code</Text>
            <View style={styles.promoRow}>
              <TextInput
                label="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
                style={styles.promoInput}
                mode="outlined"
              />
              <Button
                mode="outlined"
                onPress={applyPromoCode}
                style={styles.applyButton}
              >
                Apply
              </Button>
            </View>
            {discount > 0 && (
              <Chip mode="flat" style={styles.discountChip}>
                {discount}% discount applied
              </Chip>
            )}
          </Card.Content>
        </Card>

        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Order Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>₹{getSubtotal().toFixed(2)}</Text>
            </View>
            
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount ({discount}%):</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -₹{getDiscountAmount().toFixed(2)}
                </Text>
              </View>
            )}
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee:</Text>
              <Text style={styles.summaryValue}>
                {getDeliveryFee() === 0 ? 'FREE' : `₹${getDeliveryFee()}`}
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>₹{getTotal().toFixed(2)}</Text>
            </View>
            
            {getSubtotal() < 100 && (
              <Text style={styles.freeDeliveryNote}>
                Add ₹{(100 - getSubtotal()).toFixed(2)} more for free delivery
              </Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Checkout Button */}
      <Card style={styles.checkoutCard}>
        <Card.Content>
          <Button
            mode="contained"
            onPress={handleCheckout}
            style={styles.checkoutButton}
          >
            Place Order - ₹{getTotal().toFixed(2)}
          </Button>
          <Text style={styles.checkoutNote}>
            You will receive a confirmation call
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    paddingHorizontal: 24,
  },
  itemsCard: {
    margin: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  itemPrice: {
    fontSize: 12,
    color: '#6b6b6b',
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1070d6',
    minWidth: 60,
    textAlign: 'right',
  },
  divider: {
    marginVertical: 8,
  },
  promoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    borderColor: '#2e9b51',
  },
  discountChip: {
    backgroundColor: '#2e9b51',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
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
  discountValue: {
    color: '#2e9b51',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  freeDeliveryNote: {
    fontSize: 12,
    color: '#2e9b51',
    marginTop: 8,
    textAlign: 'center',
  },
  checkoutCard: {
    margin: 16,
    elevation: 4,
  },
  checkoutButton: {
    paddingVertical: 8,
  },
  checkoutNote: {
    fontSize: 12,
    color: '#6b6b6b',
    textAlign: 'center',
    marginTop: 8,
  },
});