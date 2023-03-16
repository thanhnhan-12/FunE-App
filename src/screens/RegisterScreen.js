import React, { useState, useContext } from "react";
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { register, isLoading } = useContext(AuthContext);

    return (

        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    placeholder="Enter first name"
                    onChangeText={text => setFirstName(text)}
                />

                <TextInput
                    style={styles.input}
                    value={lastName}
                    placeholder="Enter last name"
                    onChangeText={text => setLastName(text)}
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter email"
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />

                <Button
                    title="Register"
                    onPress={() => {
                        register(firstName, lastName, email, password)
                    }}
                />

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        wrapper: {
            width: '80%'
        },
        input: {
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#bbb',
            borderRadius: 5,
            paddingHorizontal: 14,
        },
        link: {
            color: 'blue',
        }
    }
)

export default RegisterScreen;