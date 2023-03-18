import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, isLoading } = useContext(AuthContext);

    const formValidation = () => {
        setSuccess("")
        // input validation
        if (password == null) {
            setError("Password is required feild");
        } else if (password !== confirmPassword) {
            setError("Passwoad and confirm password should be same.");
        }
        else {
            setError("");
            let birthday = dobLabel;
            try {
                register(firstName, lastName, email, password, birthday);
                setSuccess("Register Succeed!");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }
            catch (e) {
                setError("Register Error!");
            }

        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <RegistrationSVG
                        height={300}
                        width={300}
                        style={{ transform: [{ rotate: '-5deg' }] }}
                    />
                </View>

                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Register
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <GoogleSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <FacebookSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <TwitterSVG height={24} width={24} />
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                    Or, register with email ...
                </Text>
                {
                    error != null ?
                        (
                            <Text style={{ textAlign: 'center', color: 'red' }}>
                                {error}
                            </Text>
                        )
                        :
                        ''
                }

                {
                    success != null ?
                        (
                            <Text style={{ textAlign: 'center', color: '#AD40AF' }}>
                                {success}
                            </Text>
                        )
                        :
                        ''
                }

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                        gap: 10
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            paddingBottom: 8,

                        }}
                    >
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5, marginTop: 10 }}
                        />
                        <TextInput
                            placeholder="Last Name"
                            width="55%"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            paddingBottom: 8,
                        }}
                    >
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5, marginTop: 10 }}
                        />
                        <TextInput
                            placeholder="First Name"
                            width="45%"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                        />
                    </View>

                </View>

                <InputField
                    value={email}
                    onChangeText={text => setEmail(text)}
                    label={'Email ID'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                />

                <InputField
                    onChangeText={text => setPassword(text)}
                    value={password}
                    label={'Password'}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                />

                <InputField
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    label={'Confirm Password'}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                />

                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30,
                    }}>
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>
                            {dobLabel}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={'date'}
                    maximumDate={new Date('2005-01-01')}
                    minimumDate={new Date('1980-01-01')}
                    onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                        setDobLabel(date.toDateString());
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                <CustomButton
                    label={'Register'}
                    onPress={() => {
                        formValidation()
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;