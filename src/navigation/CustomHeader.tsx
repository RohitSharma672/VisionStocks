import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../utility/colors';
import Icon from '../utility/icon';
import { fp } from '../utility/dimensions';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  onProfilePress: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  onProfilePress,
}) => {

  const navigation = useNavigation()
  const onNotificationPress =()=>{
    navigation.navigate("Notification")
  }
const onAddPress =()=>{
  navigation.navigate("WalletScreen")
}
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={colors.maincolor}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <View style={styles.userContainer}>
        <TouchableOpacity
              onPress={onProfilePress}
              style={styles.container2}>
              <Image
                source={require('../assets/images/one.jpg')}
                style={styles.circleImage}
              />
              
            </TouchableOpacity>
        </View>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={onNotificationPress}
              style={styles.container2}>
          <Icon
              type={'MaterialIcons'}
              size={fp(3)}
              name={'notifications-active'}
              color={colors.white}
            />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onAddPress}  style={[styles.container2,{marginLeft:wp(1.5)}]}>
          <Icon
              type={'Ionicons'}
              size={fp(3)}
              name={'wallet-sharp'}
              color={colors.white}
            />
           
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    position: 'absolute',
    width: Platform.OS === 'ios' ? 18 : 22,
    height: Platform.OS === 'ios' ? 18 : 22,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 10 : 12,
  },
  rotate45: {
    top: -7,
    right: -7,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingTop: Platform.OS === 'android' ? hp('0%') : hp('7%'),
    backgroundColor: colors.maincolor,
    borderBottomColor: '#CCCCCC',
    padding:hp(1.3)
  },
  leftContainer: {
    flexDirection: 'row',
    padding: wp('1%'),
    justifyContent: 'space-around',
  },
  iconContainer: {
    marginHorizontal: wp('2%'),
  },
  tileImage: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('8%'),
    margin: 2,
  },
  userName: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#0A2948',
    flexWrap: 'wrap',
  },
  userContainer: {
    flex: 1,
  },

  circleImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('8%'),
  },

  container2: {
    position: 'relative',
  },
});

export default CustomHeader;
