import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Chip, ActivityIndicator, IconButton } from 'react-native-paper';
import { wp, hp, fp } from '../../utility/dimensions'; // assuming dimensions utility is already set

// Dummy stock data
const dummyStocks = [
  { id: 1, name: 'Apple', symbol: 'AAPL', currentPrice: 150, earnings: 5000 },
  { id: 2, name: 'Tesla', symbol: 'TSLA', currentPrice: 650, earnings: 12000 },
  { id: 3, name: 'Amazon', symbol: 'AMZN', currentPrice: 3200, earnings: 8000 },
  { id: 4, name: 'Microsoft', symbol: 'MSFT', currentPrice: 290, earnings: 4000 },
];

const FavoriteStocksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStocks(dummyStocks);
      setLoading(false);
    }, 2000); // Simulating a network request
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Favorite Stocks</Text>
      
      {loading ? (
        <ActivityIndicator animating={true} size="large" color="#6200ee" />
      ) : (
        stocks.map((stock) => (
          <Card key={stock.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.stockName}>{stock.name} ({stock.symbol})</Text>
                <IconButton
                  icon="heart"
                  size={20}
                  onPress={() => console.log('Add to favorites')}
                />
              </View>
              <Text style={styles.price}>${stock.currentPrice}</Text>
              <Chip style={styles.earningsChip}>Earnings: ${stock.earnings}</Chip>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4), // padding with responsive width
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: fp(3), // Responsive font size
    fontWeight: '600',
    marginBottom: hp(2), // margin with responsive height
    color: '#333',
  },
  card: {
    marginBottom: hp(2), // margin with responsive height
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockName: {
    fontSize: fp(2.2),
    fontWeight: '500',
  },
  price: {
    fontSize: fp(2),
    fontWeight: '400',
    color: '#6200ee',
    marginTop: hp(1),
  },
  earningsChip: {
    marginTop: hp(1),
    backgroundColor: '#e1bee7',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
});

export default FavoriteStocksScreen;
