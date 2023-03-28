import React, { useState } from 'react';
import {
  Dimensions,
  Image, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import CartItem from '../components/CartItem';


const ShoppingCart = ({navigation}) => {
  const [sum, setSum] = useState(20);

  return (
    
    <SafeAreaView style={{ backgroundColor: '#EEEEEE' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 15 }}>

        <TouchableOpacity style={{
          height:50,
          marginTop:10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={()=> navigation.navigate('ProductDetail')}
          >
            <Image
              style={{
                height:30,
                width:30,
              }}
              source={require("../assets/images/arrow_left.png")}
            />
            <Text style={styles.title}>Shopping cart</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View>
            <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={4}/>
            <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={5}/>
            <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={6}/>
            <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={7}/>
            <CartItem name={'Old Book'} description={'Truyện ngắn A.L.Tsekhop'} price={8}/>
        </View>
        
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.btnCheck}>
            <Text>PROCEED TO CHECKOUT</Text>
          </TouchableOpacity>
          <View>
            <Text style={{color:'black', fontWeight:700}}>TOTAL</Text>
            <Text style={{color:'black', fontWeight:700}}>{sum}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  title:{
    color:'black',
    fontSize:20,
    marginLeft:6,
  },
  coins:{
    width:20,
    height:20,
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative',
    bottom:0,
    marginBottom:50,
    marginTop:30,
  },
  btnCheck:{
    backgroundColor:'#F63D69',
    alignItems:'center',
    flexDirection:'row',
    color:'#fff',
    borderRadius:10,
    paddingLeft:80,
    paddingRight:80
  }
})

export default ShoppingCart;