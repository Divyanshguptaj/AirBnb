import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Listings from '@/components/Listings';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
  listings: any[];
  category: string;
}

// Simple wrapper that shows our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    setRefresh(refresh + 1);
  };

  return (
    <View style={styles.container}>
      <Listings listings={listings} refresh={refresh} category={category} />
      <View style={styles.absoluteView}>
        <TouchableOpacity onPress={onShowMap} style={styles.btn}>
          <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
          <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
});

export default ListingsBottomSheet;
