import React, { createContext, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        await axios.post(`${BASE_URL}/register`, { firstName, lastName, email, password })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log(userInfo);
            }).catch(e => {
                console.log(`register error: ${e}`);
                setIsLoading(false)
            })
    }

    const login = async (email, password) => {
        setIsLoading(true)

        await axios.post(`${BASE_URL}/login`, { email, password })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log(userInfo);
            }).catch(e => {
                console.log(`register error: ${e}`);
                setIsLoading(false)
            })
    }

    const logout = () => {
        setIsLoading(true);

        if (userInfo) {
            setUserInfo({});
            setIsLoading(false);
        } else {
            setUserInfo({});
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ register, login, logout, isLoading, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
}