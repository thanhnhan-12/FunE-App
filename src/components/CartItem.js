import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CartItem({name,description,price}) {
    const [quantity, setQuantity] = useState(1);
    const handleDecreaseQuantity = () => {
        if(quantity>1){
            setQuantity(quantity - 1);
        }
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Image
                        source={require("../assets/images/Altos-Odyssey.jpeg")}
                        style={styles.image}
                    />
                </View>

                <View >
                    <Text style={{color:'black',fontWeight:700}}>{name}</Text>
                    <Text style={{color:'black'}}>{description}</Text>
                    <Text>{`$ ${price}`}</Text>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        width:'64%'
                    }}>
                        <View style={{
                            flexDirection:'row',
                            fontSize:20
                            }}>
                            <TouchableOpacity onPress={() => handleDecreaseQuantity()}>
                                <Ionicons
                                    style={{fontSize:22}} 
                                    name='remove-circle-outline'
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity onPress={() => handleIncreaseQuantity()}>
                                <Ionicons 
                                style={{fontSize:22}} 
                                name='add-circle'
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.priceSum}>{`$ ${price*quantity}`}</Text>
                    </View>
                </View>
            </View>
            <View style={{height:1, width:'100%', backgroundColor:'gray'}}></View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection:'row',
    },
    image:{
        width: 68,
        height: 68,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    quantity:{
        fontSize:16, 
        paddingLeft:10,
        paddingRight:10
    },
    priceSum:{
        color:'#F63D69',

    }
})

export default CartItem;