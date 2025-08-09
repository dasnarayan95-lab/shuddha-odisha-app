import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Button, IconButton, Chip, Searchbar} from 'react-native-paper';

export default function ProductsScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Milk', 'Dairy', 'Fresh'];

  const products = [
    {
      id: 1,
      name: 'Fresh Cow Milk',
      category: 'Milk',
      price: 54,
      unit: 'L',
      description: '500ml, 1L pouches available',
      emoji: '🥛',
      inStock: true,
      fat: '3.5%',
      protein: '3.2%',
    },
    {
      id: 2,
      name: 'Buffalo Milk',
      category: 'Milk',
      price: 62,
      unit: 'L',
      description: 'Higher fat content, rich taste',
      emoji: '🐃',
      inStock: true,
      fat: '6.5%',
      protein: '4.1%',
    },
    {
      id: 3,
      name: 'Dahi (Curd)',
      category: 'Dairy',
      price: 70,
      unit: 'kg',
      description: 'Prepared fresh daily',
      emoji: '🥛',
      inStock: true,
      fat: '4.0%',
      protein: '3.5%',
    },
    {
      id: 4,
      name: 'Fresh Paneer',
      category: 'Dairy',
      price: 240,
      unit: 'kg',
      description: 'Handmade, soft texture',
      emoji: '🧀',
      inStock: true,
      fat: '20%',
      protein: '18%',
    },
    {
      id: 5,
      name: 'Toned Milk',
      category: 'Milk',
      price: 48,
      unit: 'L',
      description: 'Low fat, healthy option',
      emoji: '🥛',
      inStock: true,
      fat: '1.5%',
      protein: '3.0%',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    Alert.alert('Added to Cart', `${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = {...prev};
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Searchbar
        placeholder="Search products..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map(category => (
          <Chip
            key={category}
            mode={selectedCategory === category ? 'flat' : 'outlined'}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      {/* Products List */}
      <ScrollView style={styles.productsList}>
        {filteredProducts.map(product => (
          <Card key={product.id} style={styles.productCard}>
            <Card.Content>
              <View style={styles.productContent}>
                <Text style={styles.productEmoji}>{product.emoji}</Text>
                
                <View style={styles.productInfo}>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{product.name}</Text>
                    {!product.inStock && (
                      <Chip mode="outlined" textStyle={{color: '#f05a28'}}>
                        Out of Stock
                      </Chip>
                    )}
                  </View>
                  
                  <Text style={styles.productDescription}>
                    {product.description}
                  </Text>
                  
                  <View style={styles.nutritionInfo}>
                    <Text style={styles.nutritionText}>
                      Fat: {product.fat} • Protein: {product.protein}
                    </Text>
                  </View>
                  
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>
                      ₹{product.price}/{product.unit}
                    </Text>
                    
                    {cart[product.id] ? (
                      <View style={styles.quantityControls}>
                        <IconButton
                          icon="remove"
                          size={20}
                          onPress={() => removeFromCart(product.id)}
                        />
                        <Text style={styles.quantity}>{cart[product.id]}</Text>
                        <IconButton
                          icon="add"
                          size={20}
                          onPress={() => addToCart(product)}
                        />
                      </View>
                    ) : (
                      <Button
                        mode="contained"
                        onPress={() => addToCart(product)}
                        disabled={!product.inStock}
                        style={styles.addButton}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Cart Summary */}
      {getCartItemCount() > 0 && (
        <Card style={styles.cartSummary}>
          <Card.Content>
            <View style={styles.cartSummaryContent}>
              <View>
                <Text style={styles.cartItems}>
                  {getCartItemCount()} items in cart
                </Text>
                <Text style={styles.cartTotal}>
                  Total: ₹{getCartTotal()}
                </Text>
              </View>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Cart')}
                style={styles.viewCartButton}
              >
                View Cart
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productCard: {
    marginBottom: 12,
    elevation: 2,
  },
  productContent: {
    flexDirection: 'row',
  },
  productEmoji: {
    fontSize: 40,
    marginRight: 16,
    alignSelf: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  productDescription: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 4,
  },
  nutritionInfo: {
    marginBottom: 8,
  },
  nutritionText: {
    fontSize: 12,
    color: '#2e9b51',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  addButton: {
    paddingHorizontal: 8,
  },
  cartSummary: {
    margin: 16,
    elevation: 4,
  },
  cartSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItems: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  viewCartButton: {
    paddingHorizontal: 16,
  },
});