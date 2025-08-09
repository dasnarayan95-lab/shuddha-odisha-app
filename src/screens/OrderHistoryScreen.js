import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Chip,
  Button,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OrderHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Delivered', 'Pending', 'Cancelled'];

  const orders = [
    {
      id: 'ORD001',
      date: '2024-08-09',
      status: 'Delivered',
      items: [
        {name: 'Fresh Cow Milk', quantity: 2, unit: 'L', price: 54},
        {name: 'Dahi', quantity: 1, unit: 'kg', price: 70},
      ],
      total: 178,
      deliveryTime: '6:15 AM',
    },
    {
      id: 'ORD002',
      date: '2024-08-08',
      status: 'Delivered',
      items: [
        {name: 'Buffalo Milk', quantity: 1, unit: 'L', price: 62},
      ],
      total: 62,
      deliveryTime: '6:30 AM',
    },
    {
      id: 'ORD003',
      date: '2024-08-10',
      status: 'Pending',
      items: [
        {name: 'Fresh Cow Milk', quantity: 1, unit: 'L', price: 54},
        {name: 'Paneer', quantity: 0.5, unit: 'kg', price: 240},
      ],
      total: 174,
      deliveryTime: 'Tomorrow 6:00 AM',
    },
    {
      id: 'ORD004',
      date: '2024-08-07',
      status: 'Cancelled',
      items: [
        {name: 'Toned Milk', quantity: 1, unit: 'L', price: 48},
      ],
      total: 48,
      deliveryTime: 'Cancelled',
    },
  ];

  const filteredOrders = orders.filter(order => 
    selectedFilter === 'All' || order.status === selectedFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#2e9b51';
      case 'Pending':
        return '#f05a28';
      case 'Cancelled':
        return '#d32f2f';
      default:
        return '#6b6b6b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return 'check-circle';
      case 'Pending':
        return 'schedule';
      case 'Cancelled':
        return 'cancel';
      default:
        return 'help';
    }
  };

  return (
    <View style={styles.container}>
      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filters.map(filter => (
          <Chip
            key={filter}
            mode={selectedFilter === filter ? 'flat' : 'outlined'}
            selected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
            style={styles.filterChip}
          >
            {filter}
          </Chip>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView style={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'All' 
                ? 'You haven\'t placed any orders yet'
                : `No ${selectedFilter.toLowerCase()} orders found`
              }
            </Text>
          </View>
        ) : (
          filteredOrders.map(order => (
            <Card key={order.id} style={styles.orderCard}>
              <Card.Content>
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <Icon 
                      name={getStatusIcon(order.status)} 
                      size={20} 
                      color={getStatusColor(order.status)} 
                    />
                    <Text style={[styles.orderStatus, {color: getStatusColor(order.status)}]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                {/* Order Items */}
                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.itemName}>
                        {item.name} ({item.quantity}{item.unit})
                      </Text>
                      <Text style={styles.itemPrice}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>

                <Divider style={styles.divider} />

                {/* Order Footer */}
                <View style={styles.orderFooter}>
                  <View style={styles.deliveryInfo}>
                    <Icon name="schedule" size={16} color="#6b6b6b" />
                    <Text style={styles.deliveryTime}>{order.deliveryTime}</Text>
                  </View>
                  <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  {order.status === 'Delivered' && (
                    <Button 
                      mode="outlined" 
                      compact
                      style={styles.actionButton}
                    >
                      Reorder
                    </Button>
                  )}
                  {order.status === 'Pending' && (
                    <Button 
                      mode="outlined" 
                      compact
                      style={[styles.actionButton, styles.cancelButton]}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    mode="text" 
                    compact
                    style={styles.actionButton}
                  >
                    View Details
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    marginRight: 8,
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b6b6b',
    textAlign: 'center',
  },
  orderCard: {
    marginBottom: 12,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  orderDate: {
    fontSize: 14,
    color: '#6b6b6b',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  divider: {
    marginVertical: 12,
  },
  orderItems: {
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  itemName: {
    fontSize: 14,
    color: '#222',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1070d6',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#6b6b6b',
    marginLeft: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1070d6',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    marginLeft: 8,
  },
  cancelButton: {
    borderColor: '#f05a28',
  },
});