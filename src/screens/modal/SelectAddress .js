import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectAddress = () => {
    const [region, setRegion] = useState(null);
    const [address, setAddress] = useState(null);

    const handleSelectAddress = (data, details) => {
        const { lat, lng } = details.geometry.location;
        setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
        setAddress(data.description);
    };

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder="Enter Address"
                onPress={handleSelectAddress}
                fetchDetails={true}
                query={{
                    key: 'YOUR_GOOGLE_API_KEY',
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        width: '100%',
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
            {region && (
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                    onRegionChangeComplete={setRegion}>
                    <Marker coordinate={region} />
                </MapView>
            )}
            {address && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        padding: 20,
                    }}>
                    <Text>{address}</Text>
                </View>
            )}
        </View>
    );
};

export default SelectAddress;