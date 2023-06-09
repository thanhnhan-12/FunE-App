import React, { createContext, useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartApi } from "../clients/cart_api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState([]);
    const [dataPost, setDataPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [lengthCart, setLengthCart] = useState(0);

    const register = async (firstName, lastName, email, password, birthday) => {
        setIsLoading(true);
        await axios.post(`${BASE_URL}/register`, { firstName, lastName, email, password, birthday })
            .then(res => {
                // let userInfo = res.data;
                // setUserInfo(userInfo);
                // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
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
                setUserInfo(userInfo.user.user);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            }).catch(e => {
                console.log(`register error: ${e}`);
                setIsLoading(false)
            })
    }

    const logout = () => {
        setIsLoading(true);

        if (userInfo !== null) {
            setUserInfo([]);
            setIsLoading(false);
        } else {
            setUserInfo([]);
            setIsLoading(false);
        }
    };

    const transmissionPropsPost = (data) => {
        setDataPost({});
        setDataPost(data);
    }

    const countLengthCart = (data) => {
        setLengthCart(data);
    }

    const addToCart = async (data) => {
        await cartApi.create(data);
        // setCartItems([...cartItems, product]);
    };

    return (
        <AuthContext.Provider
            value={{ register, login, logout, transmissionPropsPost, setUserInfo, addToCart, countLengthCart, isLoading, userInfo, dataPost, lengthCart }}
        >
            {children}
        </AuthContext.Provider>
    );
}