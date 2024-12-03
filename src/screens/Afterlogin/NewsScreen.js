import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, Dimensions, Alert } from 'react-native';
import { Card, Chip, ActivityIndicator, IconButton, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fp, hp, wp } from '../../utility/dimensions';
import { colors } from '../../utility/colors';
const STORAGE_KEY = '@market_news_cache';
const API_KEY = 'fc5b3e0a04msh7fb9f7579806607p12d714jsn371348c3a98f';
const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.maincolor, // Custom blue color for header
      surface: '#007bff', // Header background color
      accent: 'white', // Color for back button and text
    },
  };
const MarketNewsScreen = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketNews = async () => {

      
      // Try to load from AsyncStorage if API fails
      try {
        const cachedNews = await AsyncStorage.getItem(STORAGE_KEY);
        if (cachedNews) {
          setNewsData(JSON.parse(cachedNews));
        }
      } catch (storageError) {
        try {
          setLoading(true);
          const response = await fetch('https://share-market-news-api-india.p.rapidapi.com/marketNews', {
            method: 'GET',
            headers: {
              'x-rapidapi-key': API_KEY,
              'x-rapidapi-host': 'share-market-news-api-india.p.rapidapi.com'
            }
          });
    
          const data = await response.json();
          // Convert object to array and filter out any invalid entries
          const newsArray = Object.values(data)
            .filter(item => item.Title && item.URL && item.Source);
    
          // Save to AsyncStorage
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newsArray));
          
          setNewsData(newsArray);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      }
      setLoading(false);
    
  };
  const fetchMarketNews1 = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://share-market-news-api-india.p.rapidapi.com/marketNews', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'share-market-news-api-india.p.rapidapi.com'
        }
      });

      const data = await response.json();
      // Convert object to array and filter out any invalid entries
      const newsArray = Object.values(data)
        .filter(item => item.Title && item.URL && item.Source);

      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newsArray));
      
      setNewsData(newsArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  
};
  useEffect(() => {
    fetchMarketNews();

  }, []);
  const screenWidth = Dimensions.get('window').width - 30;

  const renderNewsCard = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('NewsWebView', { url: item.URL })}
      style={styles.cardContainer}
    >
        <View style={styles.container1 }>
      <Card
        elevation={4}
        style={[
          styles.card,
          {
            backgroundColor: "rgb(255, 251, 255)",
            width: screenWidth, // Ensure it takes the full width
          },
        ]}
      >
        <Card.Content>
          <Text style={styles.titleText}>{item.Title}</Text>
          <View style={styles.chipContainer}>
            <Chip icon="newspaper" onPress={() => Linking.openURL(item.URL)}  style={{backgroundColor:colors.maincolor}}>
              {item.Source}
            </Chip>
           
          </View>
        </Card.Content>
      </Card>
    </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
     
        <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Trending News</Text>
        <IconButton 
             icon="refresh" 
             size={fp(3)} 
             iconColor={colors.maincolor}
             onPress={fetchMarketNews1}
             style={styles.refreshButton}
        />
      </View>
      
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderNewsCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    left:wp(2.5)
  },
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center', // Center card horizontally if required
  },
  card: {
    marginVertical: 8,
  },
 
  chipContainer: {
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  cardContainer: {
    marginBottom: hp(2.5),
  },
  titleText: {
    fontSize: fp(1.5),
    fontWeight: '600',
    marginBottom: hp(1),
  },
  chipContainer: {
    alignSelf: 'flex-start',
  },
  refreshButton: {
    alignSelf: 'flex-end',
    right:wp(1)
  },
});

export default MarketNewsScreen;