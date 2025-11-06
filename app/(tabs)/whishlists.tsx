import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Wishlist {
  id: string;
  name: string;
  count: number;
  image?: string;
}

const Page = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([
    { id: '1', name: 'Favorites', count: 0 },
  ]);

  const createNewWishlist = () => {
    const newWishlist: Wishlist = {
      id: Date.now().toString(),
      name: `Wishlist ${wishlists.length + 1}`,
      count: 0,
    };
    setWishlists([...wishlists, newWishlist]);
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Wishlists</Text>
        <TouchableOpacity onPress={createNewWishlist}>
          <Ionicons name="add-circle" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {wishlists.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.title}>Create your first wishlist</Text>
            <Text style={styles.subtitle}>
              As you search, tap the heart icon to save your favorite places to a wishlist.
            </Text>
          </View>
        ) : (
          <View style={styles.wishlistsContainer}>
            {wishlists.map((wishlist) => (
              <TouchableOpacity key={wishlist.id} style={styles.wishlistCard}>
                <View style={styles.wishlistImage}>
                  <Ionicons name="heart" size={32} color="#fff" />
                </View>
                <View style={styles.wishlistInfo}>
                  <Text style={styles.wishlistName}>{wishlist.name}</Text>
                  <Text style={styles.wishlistCount}>
                    {wishlist.count} {wishlist.count === 1 ? 'place' : 'places'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  wishlistsContainer: {
    padding: 24,
  },
  wishlistCard: {
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
  wishlistImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  wishlistName: {
    fontFamily: 'mon-b',
    fontSize: 16,
    marginBottom: 4,
  },
  wishlistCount: {
    fontFamily: 'mon',
    fontSize: 14,
    color: '#666',
  },
});

export default Page;
