import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Button, Chip, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fp, hp, wp } from '../../utility/dimensions';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utility/colors';

const TransactionsScreen = () => {
  const navigation = useNavigation()

  const transactions = [
    {
      date: 'November 20, 2022',
      items: [
        {
          type: 'Buy',
          company: 'ABNB',
          amount: '$207.00',
          shares: '2.9087 Shares',
          time: '09:15 PM',
          icon: 'airbnb',
          color: '#FF5A5F',
        },
        {
          type: 'Sell',
          company: 'AMD',
          amount: '$100.00',
          shares: '1.5200 Shares',
          time: '09:15 PM',
          icon: 'chip',
          color: '#68D391',
        },
      ],
    },
    {
      date: 'November 19, 2022',
      items: [
        {
          type: 'Deposit',
          amount: '+ $567.65',
          time: '12:43 AM',
          icon: 'bank',
          color: '#3CB371',
        },
      ],
    },
    {
      date: 'October 29, 2022',
      items: [
        {
          type: 'Buy',
          company: 'NFLX',
          amount: '$207.00',
          shares: '2.9087 Shares',
          time: '09:15 PM',
          icon: 'netflix',
          color: '#E50914',
        },
        {
          type: 'Exchange',
          amount: '2.4567 Shares',
          details: 'AMZN to AFRM',
          time: '12:43 AM',
          icon: 'swap-horizontal',
          color: '#FFC107',
        },
        {
          type: 'Withdraw',
          amount: '- $1,098.65',
          time: '01:45 PM',
          icon: 'cash-minus',
          color: '#FF0000',
        },
      ],
    },
    {
        date: 'November 20, 2022',
        items: [
          {
            type: 'Buy',
            company: 'ABNB',
            amount: '$207.00',
            shares: '2.9087 Shares',
            time: '09:15 PM',
            icon: 'airbnb',
            color: '#FF5A5F',
          },
          {
            type: 'Sell',
            company: 'AMD',
            amount: '$100.00',
            shares: '1.5200 Shares',
            time: '09:15 PM',
            icon: 'chip',
            color: '#68D391',
          },
        ],
      },
      {
        date: 'November 20, 2022',
        items: [
          {
            type: 'Buy',
            company: 'ABNB',
            amount: '$207.00',
            shares: '2.9087 Shares',
            time: '09:15 PM',
            icon: 'airbnb',
            color: '#FF5A5F',
          },
          {
            type: 'Sell',
            company: 'AMD',
            amount: '$100.00',
            shares: '1.5200 Shares',
            time: '09:15 PM',
            icon: 'chip',
            color: '#68D391',
          },
        ],
      },
      {
        date: 'November 20, 2022',
        items: [
          {
            type: 'Buy',
            company: 'ABNB',
            amount: '$207.00',
            shares: '2.9087 Shares',
            time: '09:15 PM',
            icon: 'airbnb',
            color: '#FF5A5F',
          },
          {
            type: 'Sell',
            company: 'AMD',
            amount: '$100.00',
            shares: '1.5200 Shares',
            time: '09:15 PM',
            icon: 'chip',
            color: '#68D391',
          },
        ],
      },
  ];

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
            title="Transaction" 
            titleStyle={[styles.headerTitle, { color:"white" }]}
          />
          <Appbar.Action icon={"filter"} onPress={() => {}} />
        </Appbar.Header>
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['All', 'Process', 'Completed', 'Unsuccessful',].map((filter, index) => (
          <Chip
            key={index}
            mode={filter === 'All' ? 'contained' : 'outlined'}
            style={[
              styles.chip,
              filter === 'All' && styles.activeChip,
            ]}
            textStyle={{
                color: filter === 'All' ? 'white' : 'black', // Change the color as needed
              }}
          >
            {filter}
          </Chip>
        ))}
      </View>

      {/* Transactions */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {transactions.map((section, sectionIndex) => (
        <View key={sectionIndex}>
          <Text style={styles.dateText}>{section.date}</Text>
          {section.items.map((item, itemIndex) => (
            <Card key={itemIndex} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={wp(6)} color={item.color} />
                </View>
                <View style={styles.details}>
                  <Text style={styles.titleText}>
                    {item.type} {item.company}
                  </Text>
                  <Text style={styles.subtitleText}>{item.time}</Text>
                  {item.shares && <Text style={styles.sharesText}>{item.shares}</Text>}
                  {item.details && <Text style={styles.detailsText}>{item.details}</Text>}
                </View>
                <View style={styles.amountContainer}>
                  <Text style={[styles.amountText, { color: item.color }]}>{item.amount}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      ))}
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  chip: {
    height: hp(4.5),
    justifyContent: 'center',
    backgroundColor:"white",
    textAlign:"center",
  },
  activeChip: {
    backgroundColor:colors.maincolor
  },
  dateText: {
    fontSize: fp(2),
    fontWeight: '500',
    marginVertical: hp(1),
    color: '#333',
  },
  card: {
    marginVertical: hp(0.8),
    borderRadius: wp(2),
    backgroundColor: "rgb(255, 251, 255)",
    marginHorizontal:wp(1)

  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  details: {
    flex: 1,
    marginLeft: wp(4),
  },
  titleText: {
    fontSize: fp(1.8),
    fontWeight: '500',
    color: '#555',

  },
  subtitleText: {
    fontSize: fp(1.6),
    color: '#999',
  },
  sharesText: {
    fontSize: fp(1.6),
    color: '#555',
  },
  detailsText: {
    fontSize: fp(1.6),
    color: '#555',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: fp(1.8),
    fontWeight: '500',
  },
});

export default TransactionsScreen;