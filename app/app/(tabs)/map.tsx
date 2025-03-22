import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React ,{useState}from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const map = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location.LocationObjectCoords | null>(null);

    const handleMapPress = async (event: any) => {
      const { coordinate } = event.nativeEvent;
      setSelectedLocation(coordinate);
  
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync(coordinate);
        if (reverseGeocode.length > 0) {
          const address = `${reverseGeocode[0].name}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}`;
        //   onAddressSelect(address);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
    return (
        <View className='flex-1'>
            <StatusBar barStyle={'dark-content'} />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                    />
                )}
            </MapView>
        </View>
    )
}

export default map

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      mapContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
      },
      map: {
        flex: 1,
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
      },
      closeButtonText: {
        color: '#2b367a',
        fontWeight: 'bold',
      },
})