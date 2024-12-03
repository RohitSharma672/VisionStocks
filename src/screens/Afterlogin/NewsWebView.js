import React from 'react';
import { Platform, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Appbar, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { colors } from '../../utility/colors';

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

const NewsWebViewScreen = ({ route, navigation }) => {
  const { url, title } = route.params;
  
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
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
            title="News Article" 
            subtitle={title ? title : 'Loading...'} 
            titleStyle={[styles.headerTitle, { color: theme.colors.accent }]}
            subtitleStyle={{ color: theme.colors.accent }}
          />
        </Appbar.Header>
        
        {Platform.OS !== 'web' ? (
          <WebView 
            source={{ uri: url }} 
            style={styles.webview}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            renderError={(errorName) => (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading webpage: {errorName}</Text>
              </View>
            )}
          />
        ) : (
          <Text>WebView not supported on this platform</Text>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default NewsWebViewScreen;