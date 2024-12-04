import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Dialog, 
  Portal, 
  TextInput,
  Chip,
  Appbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fp, hp, wp } from '../../utility/dimensions';
import { colors } from '../../utility/colors';
import { useNavigation } from '@react-navigation/native';

const WalletScreen = () => {
  const navigation = useNavigation()

  const [balance, setBalance] = useState(50000);
  const [availableBalance, setAvailableBalance] = useState(45000);
  const [margin, setMargin] = useState(5000);
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountNumber: '****3456',
      type: 'Savings',
      balance: 100000
    },
    {
      id: '2',
      bankName: 'SBI Bank',
      accountNumber: '****7890',
      type: 'Current',
      balance: 250000
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: '1',
      type: 'deposit',
      amount: 10000,
      date: '2024-02-15',
      status: 'Completed',
      method: 'Bank Transfer'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 5000,
      date: '2024-02-10',
      status: 'Processing',
      method: 'UPI'
    },
    {
      id: '3',
      type: 'trading',
      amount: -2500,
      date: '2024-02-05',
      status: 'Completed',
      tradeDetails: 'AAPL Stock Purchase'
    }
  ]);

  const [investmentSummary, setInvestmentSummary] = useState({
    totalInvested: 25000,
    currentValue: 28750,
    profitLoss: 3750
  });

  const renderBankAccountCard = (account) => (
    <Card key={account.id} style={styles.bankAccountCard}>
      <Card.Content style={styles.bankAccountContent}>
        <View style={styles.bankAccountHeader}>
          <Icon name="account-balance" size={24} color="#2196F3" />
          <Text variant="titleMedium" style={styles.bankName}>
            {account.bankName}
          </Text>
        </View>
        <View style={styles.bankAccountDetails}>
           <Text variant="bodyMedium" style={styles.text}>
            {account.type} Account
          </Text>
           <Text variant="bodyMedium" style={styles.text}>
            {account.accountNumber}
          </Text>
          <Text variant="titleMedium" style={styles.bankBalance}>
            ₹{account.balance.toLocaleString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderTransactionItem = (transaction) => {
    const getTransactionIcon = () => {
      switch(transaction.type) {
        case 'deposit': return <Icon name="trending-up" color="green" size={24} />;
        case 'withdrawal': return <Icon name="trending-down" color="red" size={24} />;
        case 'trading': return <Icon name="credit-card" color="#FF9800" size={24} />;
        default: return null;
      }
    };

    return (
      <Card key={transaction.id} style={styles.transactionCard}>
        <Card.Content style={styles.transactionContent}>
          <View style={styles.transactionIconContainer}>
            {getTransactionIcon()}
          </View>
          <View style={styles.transactionDetails}>
            <Text variant="titleMedium" style={styles.text}>
              {transaction.type === 'trading' 
                ? transaction.tradeDetails 
                : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </Text>
             <Text variant="bodyMedium" style={styles.text}>{transaction.date}</Text>
          </View>
          <View style={styles.transactionAmountContainer}>
            <Text 
              variant="titleMedium"
              style={[
                styles.transactionAmount,
                { 
                  color: transaction.amount >= 0 
                    ? 'green' 
                    : 'red' 
                }
              ]}
            >
              {transaction.amount >= 0 ? '+' : ''} 
              ₹{Math.abs(transaction.amount).toLocaleString()}
            </Text>
            <Chip 
              mode="outlined"
              style={[
                styles.statusChip,
                transaction.status === 'Completed' 
                  ? styles.completedStatus 
                  : styles.processingStatus
              ]}
              textStyle={styles.statusChipText}
            >
              {transaction.status}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <>
     <Appbar.Header 
          style={{ 
            backgroundColor: colors.maincolor, // Explicitly set background color
          }}
        >
          <Appbar.BackAction 
            onPress={() => navigation.goBack()} 
            color={"white"} // White color for back button
          />
          <Appbar.Content 
            title="Wallet Information " 
            titleStyle={[styles.headerTitle, { color:"white" }]}
          />
        </Appbar.Header>
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
   
        
      <Card style={styles.balanceCard}>
        <Card.Content>
          <View style={styles.balanceHeaderContainer}>
             <Text variant="bodyMedium" style={styles.text}>Wallet Overview</Text>
            <TouchableOpacity>
              <Icon name="refresh" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceDetailsContainer}>
            <View style={styles.balanceDetail}>
               <Text variant="bodyMedium" style={styles.text}>Total Balance</Text>
               <Text variant="bodyMedium" style={styles.text}   >₹{balance.toLocaleString()}</Text>
            </View>
            <View style={styles.balanceDetail}>
               <Text variant="bodyMedium" style={styles.text}>Available Balance</Text>
               <Text variant="bodyMedium" style={styles.text}>₹{availableBalance.toLocaleString()}</Text>
            </View>
            <View style={styles.balanceDetail}>
               <Text variant="bodyMedium" style={styles.text}>Margin</Text>
               <Text variant="bodyMedium" style={styles.text}>₹{margin.toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <Button 
              mode="contained" 
              onPress={() => {}}
              style={styles.actionButton}
              icon={() => <Icon name="add-circle" size={20} color="white" />}
            >
              Add Funds
            </Button>
            <Button 
              mode="outlined" 
              onPress={() => {}}
              style={styles.actionButton}
              icon={() => <Icon name="arrow-downward" size={20} color="#2196F3" />}
            >
              Withdraw
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Investment Summary */}
      <Card style={styles.investmentCard}>
        <Card.Content>
           <Text variant="bodyMedium" style={styles.sectionTitle}>
            Investment Summary
          </Text>
          <View style={styles.investmentDetailsContainer}>
            <View style={styles.investmentDetail}>
               <Text variant="bodyMedium" style={styles.text}>Total Invested</Text>
              <Text variant="titleMedium" style={styles.text}>
                ₹{investmentSummary.totalInvested.toLocaleString()}
              </Text>
            </View>
            <View style={styles.investmentDetail}>
               <Text variant="bodyMedium" style={styles.text}>Current Value</Text>
              <Text variant="titleMedium" style={styles.text}>
                ₹{investmentSummary.currentValue.toLocaleString()}
              </Text>
            </View>
            <View style={styles.investmentDetail}>
               <Text variant="bodyMedium" style={styles.text}>Profit/Loss</Text>
              <Text 
                variant="titleMedium"
                style={[
                  styles.profitLossText,
                  investmentSummary.profitLoss >= 0 
                    ? styles.profitText 
                    : styles.lossText
                ]}
              >
                {investmentSummary.profitLoss >= 0 ? '+' : ''}
                ₹{Math.abs(investmentSummary.profitLoss).toLocaleString()}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Bank Accounts */}
      <View style={styles.sectionContainer}>
         <Text variant="bodyMedium" style={styles.sectionTitle}>
          Linked Bank Accounts
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
        >
          {bankAccounts.map(renderBankAccountCard)}
          <TouchableOpacity style={styles.addBankAccountCard}>
            <View style={styles.addBankAccountContent}>
              <Icon name="add-circle" size={36} color="#2196F3" />
               <Text variant="bodyMedium"  style={styles.addBankText}>
                Add Bank
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Recent Transactions */}
      <View style={styles.sectionContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>

     
         <Text variant="bodyMedium"  style={styles.sectionTitle}>
          Recent Transactions
        </Text>

        <Text variant="bodyMedium"  style={[styles.sectionTitle1]}    onPress={() => navigation.navigate("ViewTransaction")}  >
          View All
        </Text>
        </View>
        {transactions.map(renderTransactionItem)}
      </View>
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
    backgroundColor: '#f5f5f5',
    padding: wp(4)
  },
  balanceCard: {
    marginBottom: hp(2),
    elevation: 4,
    backgroundColor: "rgb(255, 251, 255)",
  },
  balanceHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1)
  },
  balanceDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2)
  },
  balanceDetail: {
    alignItems: 'center'
  },
  text:{
    color:colors.BLACK
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButton: {
    width: '48%'
  },
  investmentCard: {
    marginBottom: hp(2),
    elevation: 4,
    backgroundColor: "rgb(255, 251, 255)",
  },
  sectionContainer: {
    marginBottom: hp(2)
  },
  sectionTitle: {
    marginBottom: hp(1),
    textAlign: 'left',
    color:colors.BLACK

  },
  sectionTitle1: {
    marginBottom: hp(1),
    color:colors.BLACK,
    justifyContent:"flex-end",
    textAlign: 'right',
    textDecorationLine: 'underline'
  },
  investmentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  investmentDetail: {
    alignItems: 'center'
  },
  profitLossText: {
    fontWeight: 'bold',
    color:colors.BLACK
  },
  profitText: {
    color: 'green'
  },
  lossText: {
    color: 'red'
  },
  bankAccountCard: {
    width: wp(60),
    marginRight: wp(2),
    elevation: 2,
    backgroundColor: "rgb(255, 251, 255)",
    marginBottom:hp(1)
  },
  bankAccountContent: {
    padding: wp(2)
  },
  bankAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1)
  },
  bankName: {
    marginLeft: wp(2),
    color:colors.BLACK
  },
  bankAccountDetails: {
    alignItems: 'flex-start'
  },
  bankBalance: {
    marginTop: hp(1),
    color: '#2196F3'
  },
  addBankAccountCard: {
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: wp(4),
    marginBottom:hp(1)

  },
  addBankAccountContent: {
    alignItems: 'center'
  },
  addBankText: {
    marginTop: hp(1),
    color: '#2196F3'
  },
  transactionCard: {
    marginBottom: hp(1),
    elevation: 2,
    backgroundColor: "rgb(255, 251, 255)",
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  transactionIconContainer: {
    marginRight: wp(2)
  },
  transactionDetails: {
    flex: 1
  },
  transactionAmountContainer: {
    alignItems: 'flex-end'
  },
  transactionAmount: {
    fontWeight: 'bold',
    color:colors.BLACK
  },
  statusChip: {
    marginTop: hp(0.5)
  },
  statusChipText: {
    fontSize: fp(1.4),
    color:colors.BLACK

  },
  completedStatus: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)'
  },
  processingStatus: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)'
  }
});

export default WalletScreen;