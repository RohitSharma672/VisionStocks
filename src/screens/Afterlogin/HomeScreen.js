import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NiftyStocksScreen from './NiftyStocksScreen';

// Mock stock data (you would replace this with actual API call)
const STOCK_CATEGORIES = [
  'Stocks', 
  'Top Stocks', 
  'Top Gainers', 
  'Top Losers', 
  'Trending Stocks', 
  'Most Active (by Value)'
];

const STOCK_DATA = {
  'Stocks': [
    { 
      symbol: 'INFY', 
      name: 'Infosys', 
      price: '₹1,450.50', 
      change: '+2.5%',
      changeColor: 'green'
    },
    { 
      symbol: 'RELIANCE', 
      name: 'Reliance Industries', 
      price: '₹2,350.75', 
      change: '-1.2%',
      changeColor: 'red'
    },
    // Add more stocks
  ],
  'Top Stocks': [
    { 
      symbol: 'TCS', 
      name: 'Tata Consultancy Services', 
      price: '₹3,200.25', 
      change: '+3.8%',
      changeColor: 'green'
    },
    // Add more top stocks
  ],
  'Top Gainers': [
    { 
      symbol: 'HDFC', 
      name: 'HDFC Bank', 
      price: '₹1,550.90', 
      change: '+4.5%',
      changeColor: 'green'
    },
    // Add more top gainers
  ],
  'Top Losers': [
    { 
      symbol: 'IDEA', 
      name: 'Idea Cellular', 
      price: '₹12.50', 
      change: '-5.2%',
      changeColor: 'red'
    },
    // Add more top losers
  ],
  'Trending Stocks': [
    { 
      symbol: 'BAJAJ', 
      name: 'Bajaj Finance', 
      price: '₹7,200.30', 
      change: '+3.1%',
      changeColor: 'green'
    },
    // Add more trending stocks
  ],
  'Most Active (by Value)': [
    { 
      symbol: 'SBI', 
      name: 'State Bank of India', 
      price: '₹550.75', 
      change: '+1.8%',
      changeColor: 'green'
    },
    // Add more most active stocks
  ]
};

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Stocks');

  return (

    <>    <View style={styles.container}>
      {/* Category Scrollable Bar */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        style={styles.categoriesContainer}
      >
        {STOCK_CATEGORIES.map((category, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip
            ]}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>



      {/* <ScrollView style={styles.stocksList}>
        {STOCK_DATA[selectedCategory].map((stock, index) => (
          <Card key={index} style={styles.stockCard}>
            <View style={styles.stockContent}>
              <View style={styles.stockInfo}>
                <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                <Text style={styles.stockName}>{stock.name}</Text>
              </View>
              <View style={styles.stockPriceInfo}>
                <Text style={styles.stockPrice}>{stock.price}</Text>
                <Text style={[
                  styles.stockChange, 
                  { color: stock.changeColor }
                ]}>
                  {stock.change}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView> */}
    </View>
     {selectedCategory === "Stocks" && <NiftyStocksScreen/> }

     </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedCategoryChip: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stocksList: {
    padding: 10,
  },
  stockCard: {
    marginBottom: 10,
    elevation: 3,
  },
  stockContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 14,
    color: '#666',
  },
  stockPriceInfo: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockChange: {
    fontSize: 14,
  },
});

export default HomeScreen;