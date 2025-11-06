import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Message {
  id: string;
  hostName: string;
  propertyName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
}

const Page = () => {
  const [messages] = useState<Message[]>([
    // Sample data - in a real app, this would come from an API
    // {
    //   id: '1',
    //   hostName: 'John Doe',
    //   propertyName: 'Cozy Apartment in Paris',
    //   lastMessage: 'Thank you for your interest! When would you like to check in?',
    //   timestamp: '2 hours ago',
    //   unread: true,
    // }
  ]);

  const renderMessageCard = (message: Message) => (
    <TouchableOpacity key={message.id} style={styles.messageCard}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="#fff" />
      </View>
      <View style={styles.messageInfo}>
        <View style={styles.messageHeader}>
          <Text style={styles.hostName}>{message.hostName}</Text>
          <Text style={styles.timestamp}>{message.timestamp}</Text>
        </View>
        <Text style={styles.propertyName} numberOfLines={1}>
          {message.propertyName}
        </Text>
        <Text style={[styles.lastMessage, message.unread && styles.unreadMessage]} numberOfLines={2}>
          {message.lastMessage}
        </Text>
      </View>
      {message.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Inbox</Text>
      </View>

      <ScrollView style={styles.content}>
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-outline" size={64} color="#ccc" />
            <Text style={styles.title}>No messages yet</Text>
            <Text style={styles.subtitle}>
              When you contact a host or send a reservation request, you'll see your messages here.
            </Text>
          </View>
        ) : (
          <View style={styles.messagesContainer}>
            {messages.map(renderMessageCard)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontFamily: 'mon-b',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'mon',
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  messagesContainer: {
    padding: 24,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInfo: {
    flex: 1,
    marginLeft: 16,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  hostName: {
    fontFamily: 'mon-b',
    fontSize: 16,
  },
  timestamp: {
    fontFamily: 'mon',
    fontSize: 12,
    color: '#666',
  },
  propertyName: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 4,
  },
  lastMessage: {
    fontFamily: 'mon',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadMessage: {
    color: '#000',
    fontFamily: 'mon-sb',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});

export default Page;
