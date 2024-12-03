import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Image 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Utility imports
import { colors } from '../../utility/colors';
import { fp, hp, wp } from '../../utility/dimensions';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthContext from '../../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [userCredentials, setUserCredentials] = useState(null);

  // Fetch user credentials on screen load
  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const storedCredentials = await AsyncStorage.getItem('userCredentials');
        if (storedCredentials) {
          setUserCredentials(JSON.parse(storedCredentials));
        }
      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    };

    fetchUserCredentials();
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout();
    // Navigation will be handled by AppNavigator based on isLoggedIn state
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color={colors.BLACK} />
        </TouchableOpacity>
      </View>

      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require("../../assets/images/one.jpg")} 
            style={styles.avatar} 
          />
        </View>
        <Text style={styles.userName}>
          {userCredentials?.email || userCredentials?.phone || 'User'}
        </Text>
        <Text style={styles.userSubtitle}>
          {userCredentials?.loginType === 'phone' 
            ? 'Phone Login' 
            : 'Email Login'}
        </Text>
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="person-outline" size={24} color={colors.maincolor} />
          <Text style={styles.actionButtonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={24} color={colors.maincolor} />
          <Text style={styles.actionButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.maincolor} />
          <Text style={styles.actionButtonText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard Sections */}
      <View style={styles.dashboardContainer}>
        <Text style={styles.sectionTitle}>Quick Overview</Text>
        
        <View style={styles.dashboardCard}>
          <View style={styles.cardContent}>
            <Ionicons name="analytics-outline" size={24} color={colors.maincolor} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Your Activity</Text>
              <Text style={styles.cardSubtitle}>View your recent interactions</Text>
            </View>
          </View>
        </View>

        <View style={styles.dashboardCard}>
          <View style={styles.cardContent}>
            <Ionicons name="wallet-outline" size={24} color={colors.maincolor} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Account Details</Text>
              <Text style={styles.cardSubtitle}>Check your account status</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: colors.WHITE,
  },
  headerTitle: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  logoutButton: {
    padding: wp(2),
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: hp(3),
    backgroundColor: colors.WHITE,
  },
  avatarContainer: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  avatar: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
  },
  userName: {
    fontSize: fp(2.2),
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  userSubtitle: {
    fontSize: fp(1.8),
    color: colors.DARK_GRAY,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(2),
    backgroundColor: colors.WHITE,
    marginTop: hp(2),
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: fp(1.6),
    color: colors.BLACK,
    marginTop: hp(1),
  },
  dashboardContainer: {
    padding: wp(4),
  },
  sectionTitle: {
    fontSize: fp(2),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: colors.BLACK,
  },
  dashboardCard: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    marginLeft: wp(3),
  },
  cardTitle: {
    fontSize: fp(1.8),
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  cardSubtitle: {
    fontSize: fp(1.6),
    color: colors.DARK_GRAY,
  },
});

export default ProfileScreen;