import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAlarmContext } from '../hooks/alarm';

interface IBoxContainerProps {
  title: string;
}

const BoxContainer: React.FC<IBoxContainerProps> = ({ title, children }) => {
  const { updateHistory } = useAlarmContext();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.boxContainer}>
      <View style={styles.boxTitleContainer}>
        <View style={styles.boxTitleTopContainer}>
          <View style={styles.boxTitleImageContainer} />
          <View style={{ flex: 1 }}>
            <Text style={styles.boxTitleText}>{title}:</Text>
          </View>
          {title === 'Histórico' ? (
            <TouchableOpacity
              style={styles.boxTitleImageContainer}
              onPress={async () => {
                setLoading(true);
                await updateHistory();
                setLoading(false);
              }}>
              <Image
                source={require('../assets/reload.png')}
                style={styles.reloadImage}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.boxTitleImageContainer} />
          )}
        </View>
        <View style={styles.boxSeparationBar} />
      </View>
      {loading ? <ActivityIndicator size="small" color="#eaeaea" /> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#1B1B1B',
    borderRadius: 8,
    marginTop: 30,
    padding: 15,
  },
  boxTitleContainer: {
    justifyContent: 'center',
  },
  boxTitleText: {
    fontSize: 18,
    color: '#eaeaea',
    textAlign: 'center',
    fontWeight: '500',
  },
  boxSeparationBar: {
    height: 1,
    backgroundColor: '#787878',
    width: '100%',
    marginVertical: 15,
  },
  boxTitleTopContainer: {
    flexDirection: 'row',
    paddingLeft: 0,
  },
  boxTitleImageContainer: {
    height: 22,
    width: 22,
  },
  reloadImage: {
    height: 22,
    width: 22,
  },
  boxTitleClearImageContainer: {
    height: 22,
    width: 22,
  },
  clearImage: {
    height: 22,
    width: 22,
  },
});

export default BoxContainer;
