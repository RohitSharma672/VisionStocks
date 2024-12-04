import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card, Button, Chip, Appbar, Modal, Portal, Divider } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { fp, hp, wp } from '../../utility/dimensions';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Your recent transaction of $570.00 at Flipzapp has been successfully completed.',
      time: 'Today • 2 hrs ago',
      type: 'Transaction',
      showPayButton: true,
    },
    {
      id: '2',
      title: 'John requested a payment of $89.00.',
      time: 'Today • 3 hrs ago',
      type: 'Request',
      showPayButton: true,
    },
    {
      id: '3',
      title: 'Your new credit card ending in 2688 has been successfully activated.',
      time: 'Earlier • April 25, 2024 at 10:40 AM',
      type: 'Card Update',
      showPayButton: false,
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const renderRightActions = (id) => (
    <View style={styles.notificationCard}>

    <Button
      mode="contained"
      color="#FF3B30"
      style={styles.deleteButton}
      onPress={() => handleDeleteNotification(id)}
    >
      Delete
    </Button>
    </View>
  );

  const renderNotificationCard = (notification) => (
    <Swipeable renderRightActions={() => renderRightActions(notification.id)}>
      <Card style={styles.notificationCard}>
        <Card.Title
          title={notification.title}
          subtitle={notification.time}
          left={(props) => (
            <Chip style={styles.chip} textStyle={styles.chipText} {...props}>
              {notification.type}
            </Chip>
          )}
        />
        {notification.showPayButton && (
          <Card.Actions>
            <Button mode="contained" style={styles.payButton}>
              Pay
            </Button>
          </Card.Actions>
        )}
      </Card>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Notifications" />
        <Appbar.Action icon="dots-vertical" onPress={() => setIsModalVisible(true)} />
      </Appbar.Header>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Empty Notification State */}
        {notifications.length === 0 ? (
          <View style={styles.emptyNotification}>
            <Card style={styles.emptyCard}>
              <Card.Content>
                <View style={styles.imagePlaceholder} />
                <Text style={styles.emptyTitle}>No Notification to show</Text>
                <Text style={styles.emptySubtitle}>
                  You currently have no notifications. We will notify you when something happens!
                </Text>
                <Button mode="contained" style={styles.exploreButton}>
                  Explore
                </Button>
              </Card.Content>
            </Card>
          </View>
        ) : (
          // Notifications List
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderNotificationCard(item)}
            contentContainerStyle={styles.notificationsList}
          />
        )}
      </ScrollView>

      {/* Modal */}
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Options</Text>
          <TouchableOpacity style={styles.modalOption} onPress={() => setNotifications([])}>
            <Text style={styles.modalOptionText}>Clear All</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.modalOption}>
            <Text style={styles.modalOptionText}>Mark as Read</Text>
          </TouchableOpacity>
          <Divider />
          <Button mode="outlined" onPress={() => setIsModalVisible(false)} style={styles.modalCancelButton}>
            Cancel
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    padding: wp(4),
  },
  emptyNotification: {
    marginVertical: hp(2),
    alignItems: 'center',
  },
  emptyCard: {
    width: wp(90),
    alignItems: 'center',
    padding: wp(5),
  },
  imagePlaceholder: {
    width: wp(20),
    height: wp(20),
    backgroundColor: '#E0E0E0',
    borderRadius: wp(10),
    marginBottom: hp(2),
  },
  emptyTitle: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  emptySubtitle: {
    fontSize: fp(2),
    color: '#888',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  exploreButton: {
    marginTop: hp(1),
    alignSelf: 'center',
  },
  notificationsList: {
    marginTop: hp(2),
  },
  notificationCard: {
    marginVertical: hp(1),
    padding: wp(3),
  },
  chip: {
    backgroundColor: '#E3F2FD',
    marginRight: wp(2),
  },
  chipText: {
    color: '#007AFF',
  },
  payButton: {
    marginLeft: 'auto',
  },
  deleteButton: {
    justifyContent: 'center',
    height:"100%",
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: wp(5),
    marginHorizontal: wp(5),
    borderRadius: wp(3),
  },
  modalTitle: {
    fontSize: fp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  modalOption: {
    paddingVertical: hp(1.5),
  },
  modalOptionText: {
    fontSize: fp(2),
    color: '#007AFF',
  },
  modalCancelButton: {
    marginTop: hp(2),
    alignSelf: 'center',
  },
});

export default NotificationsScreen;