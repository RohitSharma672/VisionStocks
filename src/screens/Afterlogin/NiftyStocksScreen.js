import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { colors } from '../../utility/colors';

const STORAGE_KEY = '@nifty_stocks_data';
const API_EXPIRATION_TIME = 50 * 60 * 1000; // 5 minutes

const NiftyStocksScreen = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const fetchAndStoreStocks = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      if (!forceRefresh) {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (Date.now() - parsedData.timestamp < API_EXPIRATION_TIME) {
            setStocks(parsedData.stocks);
            setLastUpdated(new Date(parsedData.timestamp).toLocaleString());
            setIsLoading(false);
            return;
          }
        }
      }
      const response = await axios.get('https://latest-stock-price.p.rapidapi.com/any', {
        headers: {
          'x-rapidapi-key': 'fc5b3e0a04msh7fb9f7579806607p12d714jsn371348c3a98f',
          'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com'
        }
      });
      const stocksData = Object.keys(response.data)
        .filter(key => typeof response.data[key] === 'object' && response.data[key].identifier)
        .map(key => ({
          ...response.data[key],
          meta: response.data[key].meta
        }));
      const dataToStore = {
        stocks: stocksData,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      setStocks(stocksData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
    
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAndStoreStocks();
  }, []);
  const renderStockItem = ({ item }) => (
    <View style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockName}>{item?.meta?.companyName  ? item?.meta?.companyName : item.identifier}</Text>
        <Text style={styles.updateTime}>
          Updated: {item.lastUpdateTime}
        </Text>
      </View>
      <View style={styles.stockPriceContainer}>
        <Text style={styles.stockPrice}>
          ₹{item.lastPrice.toFixed(2)}
        </Text>
        <Text style={[
          styles.stockChange, 
          { color: item.change >= 0 ? 'green' : 'red' }
        ]}>
          {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} 
          ({item.pChange.toFixed(2)}%)
        </Text>
        <View style={styles.stockDetails}>
          <Text style={styles.detailText}>Day High: ₹{item.dayHigh.toFixed(2)}</Text>
          <Text style={styles.detailText}>Day Low: ₹{item.dayLow.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.maincolor} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading stocks: {error.message}</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={() => fetchAndStoreStocks(true)}
        >
          <Text style={styles.refreshButtonText}>Retry Fetch</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.lastUpdatedText}>
          Last Updated: {lastUpdated || 'Never'}
        </Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={() => fetchAndStoreStocks(true)}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={stocks}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.symbol}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stockInfo: {
    flex: 1,
    marginRight: 10,
  },
  stockSymbol: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  stockName: {
    color: '#666',
    fontSize: 14,
  },
  updateTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  stockPriceContainer: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  stockChange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stockDetails: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default NiftyStocksScreen;