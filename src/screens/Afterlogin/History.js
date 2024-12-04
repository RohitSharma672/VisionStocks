import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Card, Chip, ActivityIndicator, IconButton } from 'react-native-paper';
import { fp, hp, wp } from '../../utility/dimensions';
import { useNavigation } from '@react-navigation/native';
const dummyBettingHistory = [
    {
      id: '1',
      stockName: 'Reliance Industries',
      symbol: 'RELIANCE',
      betAmount: 1200,
      currentStockPrice: 2350,
      selectedRange: {
        min: -3,
        max: 4
      },
      targetPriceRange: {
        lower: 2278,
        upper: 2468
      },
      status: 'win',
      betTimestamp: '2024-02-15 14:30:45',
      actualMovement: 4,
      points: 75,
      netProfit: 2300
    },
    {
      id: '2',
      stockName: 'HDFC Bank',
      symbol: 'HDFCBANK',
      betAmount: 800,
      currentStockPrice: 1525,
      selectedRange: {
        min: -2,
        max: 4
      },
      targetPriceRange: {
        lower: 1495,
        upper: 1586
      },
      status: 'loss',
      betTimestamp: '2024-02-14 11:15:22',
      actualMovement: -3,
      points: -40,
      netProfit: -800
    }, {
        id: '1',
        stockName: 'Reliance Industries',
        symbol: 'RELIANCE',
        betAmount: 1200,
        currentStockPrice: 2350,
        selectedRange: {
          min: -3,
          max: 5
        },
        targetPriceRange: {
          lower: 2278,
          upper: 2468
        },
        status: 'pending',
        betTimestamp: '2024-02-15 14:30:45',
        actualMovement: 4,
        points: 75,
        netProfit: 2400
      },
      {
        id: '2',
        stockName: 'HDFC Bank',
        symbol: 'HDFCBANK',
        betAmount: 800,
        currentStockPrice: 1525,
        selectedRange: {
          min: -2,
          max: 4
        },
        targetPriceRange: {
          lower: 1495,
          upper: 1586
        },
        status: 'loss',
        betTimestamp: '2024-02-14 11:15:22',
        actualMovement: -3,
        points: -40,
        netProfit: -800
      },
      {
        id: '1',
        stockName: 'Reliance Industries',
        symbol: 'RELIANCE',
        betAmount: 1200,
        currentStockPrice: 2350,
        selectedRange: {
          min: -3,
          max: 5
        },
        targetPriceRange: {
          lower: 2278,
          upper: 2468
        },
        status: 'win',
        betTimestamp: '2024-02-15 14:30:45',
        actualMovement: 4,
        points: 75,
        netProfit: 2400
      },
      {
        id: '2',
        stockName: 'HDFC Bank',
        symbol: 'HDFCBANK',
        betAmount: 800,
        currentStockPrice: 1525,
        selectedRange: {
          min: -2,
          max: 4
        },
        targetPriceRange: {
          lower: 1495,
          upper: 1586
        },
        status: 'pending',
        betTimestamp: '2024-02-14 11:15:22',
        actualMovement: -3,
        points: -40,
        netProfit: -800
      },
      {
        id: '2',
        stockName: 'HDFC Bank',
        symbol: 'HDFCBANK',
        betAmount: 800,
        currentStockPrice: 1525,
        selectedRange: {
          min: -2,
          max: 4
        },
        targetPriceRange: {
          lower: 1495,
          upper: 1586
        },
        status: 'loss',
        betTimestamp: '2024-02-14 11:15:22',
        actualMovement: -3,
        points: -40,
        netProfit: -800
      },
      {
        id: '1',
        stockName: 'Reliance Industries',
        symbol: 'RELIANCE',
        betAmount: 1200,
        currentStockPrice: 2350,
        selectedRange: {
          min: -3,
          max: 5
        },
        targetPriceRange: {
          lower: 2278,
          upper: 2468
        },
        status: 'win',
        betTimestamp: '2024-02-15 14:30:45',
        actualMovement: 4,
        points: 75,
        netProfit: 2400
      },
      {
        id: '2',
        stockName: 'HDFC Bank',
        symbol: 'HDFCBANK',
        betAmount: 800,
        currentStockPrice: 1525,
        selectedRange: {
          min: -2,
          max: 4
        },
        targetPriceRange: {
          lower: 1495,
          upper: 1586
        },
        status: 'loss',
        betTimestamp: '2024-02-14 11:15:22',
        actualMovement: -3,
        points: -40,
        netProfit: -800
      }
  ];

const StockBettingHistoryScreen = () => {
    const navigation = useNavigation();
  const getStatusStyle = (status) => {
    switch(status) {
      case 'win':
        return { 
          color: '#4CAF50', 
          icon: 'arrow-up-bold',
          chipColor: 'green'
        };
      case 'loss':
        return { 
          color: '#F44336', 
          icon: 'arrow-down-bold',
          chipColor: 'red'
        };
      case 'pending':
      default:
        return { 
          color: '#FFC107', 
          icon: 'clock-outline',
          chipColor: 'orange'
        };
    }
  };

  const renderBetItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);


    return (
        
      <Card style={styles.betCard}     
      onPress={() => {
        navigation.navigate('BetDetailScreen', { betDetails: item });
      }}
      
      >
        <View style={styles.cardContent}>
          <View style={styles.stockHeader}>
            <Text style={styles.stockName}>{item.stockName}</Text>
            <Chip 
              icon={statusStyle.icon} 
              style={{backgroundColor: statusStyle.chipColor}}
            >
              {item.status.toUpperCase()}
            </Chip>
          </View>
          
          <View style={styles.betDetails}>
        
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Stock Price at Bet:</Text>
              <Text style={styles.valueText}>₹{item.currentStockPrice.toFixed(2)}</Text>
            </View>
           
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Net Profit:</Text>
              <Text style={[
                styles.valueText, 
                { 
                  color: item.netProfit > 0 ? '#4CAF50' : 
                          item.netProfit < 0 ? '#F44336' : '#000' 
                }
              ]}>
                ₹{Math.abs(item.netProfit).toLocaleString()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.labelText}>Bet Time:</Text>
              <Text style={styles.valueText}>{item.betTimestamp}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
const onPressButton = (()=>{
  navigation.navigate('BetDetailScreen', { betDetails: "item" });
})

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Betting History</Text>
        <Button title="Click Me" onPress={onPressButton} />

        <IconButton 
          icon="filter" 
          size={24} 
          onPress={() => {}}
        />
      </View>
      
      <FlatList
        data={dummyBettingHistory}
        renderItem={renderBetItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ActivityIndicator animating={true} />
            <Text style={styles.emptyText}>No betting history found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(1),
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    fontSize: fp(2.2),
    fontWeight: '600',
    left:wp(2.5),
  },
  listContainer: {
    padding: wp(4)
  },
  betCard: {
    marginBottom: hp(2),
    elevation: 3,
    backgroundColor: "rgb(255, 251, 255)",

  },
  cardContent: {
    padding: wp(2)
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5)
  },
  stockName: {
    fontSize: fp(2.2),
    fontWeight: '600'
  },
  betDetails: {
    marginTop: hp(1)
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.5)
  },
  labelText: {
    fontSize: fp(1.8),
    color: '#666'
  },
  valueText: {
    fontSize: fp(2),
    fontWeight: '500'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(20)
  },
  emptyText: {
    marginTop: hp(2),
    fontSize: fp(2)
  }
});

export default StockBettingHistoryScreen;