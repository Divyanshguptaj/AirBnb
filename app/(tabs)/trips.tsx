import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Trip {
  id: string;
  location: string;
  dates: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  image?: string;
}

const Page = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const [trips] = useState<Trip[]>([
    // Sample data - in a real app, this would come from an API
    // { id: '1', location: 'Paris, France', dates: 'Dec 15-20, 2024', status: 'upcoming' },
  ]);

  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const pastTrips = trips.filter(trip => trip.status !== 'upcoming');

  const renderTripCard = (trip: Trip) => (
    <TouchableOpacity key={trip.id} style={styles.tripCard}>
      <View style={styles.tripImage}>
        <Ionicons name="home" size={32} color="#fff" />
      </View>
      <View style={styles.tripInfo}>
        <Text style={styles.tripLocation}>{trip.location}</Text>
        <Text style={styles.tripDates}>{trip.dates}</Text>
        <View style={[styles.statusBadge, { backgroundColor: trip.status === 'upcoming' ? Colors.primary : '#ccc' }]}>
          <Text style={styles.statusText}>
            {trip.status === 'upcoming' ? 'Upcoming' : trip.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Trips</Text>
      </View>

      {/* Tab selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past trips
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'upcoming' ? (
          upcomingTrips.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="airplane-outline" size={64} color="#ccc" />
              <Text style={styles.title}>No upcoming trips</Text>
              <Text style={styles.subtitle}>
                When you book a trip, it will appear here.
              </Text>
            </View>
          ) : (
            <View style={styles.tripsContainer}>
              {upcomingTrips.map(renderTripCard)}
            </View>
          )
        ) : (
          pastTrips.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="time-outline" size={64} color="#ccc" />
              <Text style={styles.title}>No past trips</Text>
              <Text style={styles.subtitle}>
                Your trip history will appear here.
              </Text>
            </View>
          ) : (
            <View style={styles.tripsContainer}>
              {pastTrips.map(renderTripCard)}
            </View>
          )
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'mon',
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
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
  tripsContainer: {
    padding: 24,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
    marginLeft: 16,
  },
  tripLocation: {
    fontFamily: 'mon-b',
    fontSize: 16,
    marginBottom: 4,
  },
  tripDates: {
    fontFamily: 'mon',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'mon-sb',
    fontSize: 12,
    color: '#fff',
  },
});

export default Page;
