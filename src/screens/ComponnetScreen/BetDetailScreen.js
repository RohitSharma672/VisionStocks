import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { 
  Card, 
  Chip, 
  IconButton, 
  Button, 
  ProgressBar,
  Dialog,
  Portal,
  Appbar,
  DefaultTheme
} from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { fp, hp, wp } from '../../utility/dimensions';
import { colors } from '../../utility/colors';

const BetDetailScreen = ({ route, navigation }) => {
  const { betDetails } = route.params;
  const [showShareDialog, setShowShareDialog] = useState(false);
// Create a custom theme
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.maincolor, // Custom blue color for header
      surface: '#007bff', // Header background color
      accent: 'white', // Color for back button and text
    },
  };
  // Calculate bet performance
  const calculatePerformance = () => {
    const { selectedRange, actualMovement } = betDetails;
    if (actualMovement >= selectedRange.min && actualMovement <= selectedRange.max) {
      return 'win';
    }
    return 'loss';
  };

  // Stock price chart data (mock data)
  const chartData = {
    labels: ['Start', 'Mid', 'End'],
    datasets: [
      {
        data: [
          betDetails.targetPriceRange.lower,
          betDetails.currentStockPrice,
          betDetails.targetPriceRange.upper
        ],
        color: (opacity = 1) => calculatePerformance() === 'win' ? 
          `rgba(76, 175, 80, ${opacity})` : 
          `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  // Render status chip
  const renderStatusChip = () => {
    const performance = calculatePerformance();
    const statusStyles = {
      win: { 
        color: '#4CAF50', 
        icon: 'arrow-up-bold',
        text: 'Won' 
      },
      loss: { 
        color: '#F44336', 
        icon: 'arrow-down-bold',
        text: 'Lost' 
      }
    };

    return (
      <Chip 
        icon={statusStyles[performance].icon}
        style={{ 
          backgroundColor: statusStyles[performance].color,
          alignSelf: 'flex-end'
        }}
      >
        {statusStyles[performance].text}
      </Chip>
    );
  };

  // Render performance details
  const renderPerformanceDetails = () => {
    const performance = calculatePerformance();
    
    return (
      <View style={styles.performanceContainer}>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Performance</Text>
          <Text style={[
            styles.performanceValue,
            { 
              color: performance === 'win' ? '#4CAF50' : '#F44336'
            }
          ]}>
            {performance === 'win' ? 'Target Achieved' : 'Target Missed'}
          </Text>
        </View>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Actual Movement</Text>
          <Text style={[
            styles.performanceValue,
            { 
              color: betDetails.actualMovement > 0 ? '#4CAF50' : '#F44336'
            }
          ]}>
            {betDetails.actualMovement}%
          </Text>
        </View>
      </View>
    );
  };

  // Render bet range visualization
  const renderBetRangeVisualization = () => {
    const { selectedRange, actualMovement } = betDetails;
    const progress = Math.abs(actualMovement / selectedRange.max);

    return (
      <View style={styles.rangeVisualizationContainer}>
        <Text style={styles.rangeLabel}>Bet Range Visualization</Text>
        <View style={styles.rangeProgressContainer}>
          <Text style={styles.rangeProgressLabel}>{selectedRange.min}%</Text>
          <View style={styles.progressBarContainer}>
            <ProgressBar 
              progress={progress}
              color={
                actualMovement >= selectedRange.min && 
                actualMovement <= selectedRange.max 
                  ? '#4CAF50' 
                  : '#F44336'
              }
              style={styles.progressBar}
            />
          </View>
          <Text style={styles.rangeProgressLabel}>{selectedRange.max}%</Text>
        </View>
      </View>
    );
  };

  // Share bet details
  const shareBetDetails = () => {
    // Implement share functionality
    setShowShareDialog(true);
  };

  return (

<>

<SafeAreaView >

<Appbar.Header 
     style={{ 
       backgroundColor: theme.colors.primary, // Explicitly set background color
     }}
   >
     <Appbar.BackAction 
       onPress={() => navigation.goBack()} 
       color={theme.colors.accent} // White color for back button
     />
     <Appbar.Content 
       title="Bet Details" 
       titleStyle={[styles.headerTitle, { color: theme.colors.accent }]}
     />
   </Appbar.Header>
   </SafeAreaView>





    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
   
      <View style={styles.headerContainer}>
        <View style={styles.stockHeaderInfo}>
          <Text style={styles.stockName}>{betDetails.stockName}</Text>
          <Text style={styles.stockSymbol}>{betDetails.symbol}</Text>
        </View>
        {renderStatusChip()}
      </View>

      {/* Stock Price Chart */}
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Stock Price Movement</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - wp(10)}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </Card>

      {/* Performance Details */}
      <Card style={styles.detailCard}>
        {renderPerformanceDetails()}
      </Card>

      {/* Bet Range Visualization */}
      <Card style={styles.detailCard}>
        {renderBetRangeVisualization()}
      </Card>

      {/* Bet Details */}
      <Card style={styles.detailCard}>
        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bet Amount</Text>
            <Text style={styles.detailValue}>₹{betDetails.betAmount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Stock Price</Text>
            <Text style={styles.detailValue}>
              ₹{betDetails.currentStockPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bet Range</Text>
            <Text style={styles.detailValue}>
              {betDetails.selectedRange.min}% to {betDetails.selectedRange.max}%
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Target Price Range</Text>
            <Text style={styles.detailValue}>
              ₹{betDetails.targetPriceRange.lower.toFixed(2)} - 
              ₹{betDetails.targetPriceRange.upper.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bet Timestamp</Text>
            <Text style={styles.detailValue}>{betDetails.betTimestamp}</Text>
          </View>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <Button 
          mode="contained" 
          onPress={shareBetDetails}
          style={styles.actionButton}
        >
          Share Bet Details
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.actionButton}
        >
          Back to History
        </Button>
      </View>

      {/* Share Dialog */}
      <Portal>
        <Dialog 
          visible={showShareDialog}
          onDismiss={() => setShowShareDialog(false)}
        >
          <Dialog.Title>Share Bet Details</Dialog.Title>
          <Dialog.Content>
            <Text>Sharing functionality to be implemented</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowShareDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
      },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  contentContainer: {
    padding: wp(4),
    paddingBottom: hp(10)
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2)
  },
  stockHeaderInfo: {
    flexDirection: 'column'
  },
  stockName: {
    fontSize: fp(3),
    fontWeight: '600',
    color: '#333'
  },
  stockSymbol: {
    fontSize: fp(2),
    color: '#666'
  },
  chartCard: {
    marginBottom: hp(2),
    padding: wp(2),
    backgroundColor: "rgb(255, 251, 255)",

  },
  chartTitle: {
    fontSize: fp(2.2),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(1)
  },
  detailCard: {
    marginBottom: hp(2),
    padding: wp(3),
    backgroundColor: "rgb(255, 251, 255)",

  },
  performanceContainer: {
    flexDirection: 'column'
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1)
  },
  performanceLabel: {
    fontSize: fp(2),
    color: '#666'
  },
  performanceValue: {
    fontSize: fp(2.2),
    fontWeight: '600'
  },
  rangeVisualizationContainer: {
    marginTop: hp(1)
  },
  rangeLabel: {
    fontSize: fp(2),
    fontWeight: '600',
    marginBottom: hp(1)
  },
  rangeProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rangeProgressLabel: {
    fontSize: fp(1.8),
    color: '#666'
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: wp(2)
  },
  progressBar: {
    height: hp(1)
  },
  detailSection: {
    marginTop: hp(1)
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
    paddingBottom: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  detailLabel: {
    fontSize: fp(2),
    color: '#666'
  },
  detailValue: {
    fontSize: fp(2.2),
    fontWeight: '600'
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    marginTop: hp(2)
  },
  actionButton: {
    marginBottom: hp(1)
  }
});

export default BetDetailScreen;