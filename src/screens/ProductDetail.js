import React, { useContext, useState } from 'react';
import {
  Image, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';

const ProductDetail = ({navigation}) => {
  const { dataPost } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState(null);
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const handleOnClickLike = () => {
    if (like == true) {
      setLike(false);
      setCountLike(countLike - 1)
    } else {
      setLike(true);
      setCountLike(countLike + 1)
    }
  }
  const handleDecreaseQuantity = () => {
    if(quantity>1){
      setQuantity(quantity - 1)
    }
  }
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  console.log(dataPost);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 15 }}>

        <TouchableOpacity style={{
          height:50,
          marginTop:10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <TouchableOpacity
            onPress={()=> navigation.navigate('SearchScreen')}
          >
            <Image
              style={{
                height:30,
                width:30,
              }}
              source={require("../assets/images/arrow_left.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: 'row',

          }}>
            <TouchableOpacity onPress={() => handleOnClickLike()}>
              {like && like === true ?
                <Ionicons name="heart" size={25} color="#D62965" />
                :
                <Ionicons name="heart-outline" size={25} color="#D62965" />
              }
            </TouchableOpacity>
              <Ionicons onPress={()=>navigation.navigate('ShoppingCart')} name='cart' style={styles.iconCart}/>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity>
          <TouchableOpacity style={{
            width: '100%',
            backgroundColor: '#fff',
            overflow: 'hidden',
            borderRadius: 20
          }}>
            <TouchableOpacity
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                source={require("../assets/images/Altos-Odyssey.jpeg")}
                style={{
                  width: 300,
                  height: 270,
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 20,
                  marginLeft: 20,
                  marginRight: 20
                }}
              />
              <TouchableOpacity
                style={{
                  paddingLeft: 20,
                  paddingRight:20,
                  width: '90%',
                  borderRadius: 10,
                  marginBottom: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >                
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
                    <Text style={{
                      fontSize:16, 
                      paddingLeft:10,
                      paddingRight:10
                    }}>{quantity||1}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity()}>
                      <Ionicons 
                        style={{fontSize:22}} 
                        name='add-circle'
                      />
                    </TouchableOpacity>
                  </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <TouchableOpacity onPress={() => handleOnClickLike()}>
                    {like && like === true ?
                      <Ionicons name="heart" size={25} color="#D62965" />
                      :
                      <Ionicons name="heart-outline" size={25} color="#D62965" />
                    }
                  </TouchableOpacity>
                  <Text
                    style={styles.countLike}>
                    {countLike}
                  </Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>

        <View>
          <Text style={styles.detail}>Details</Text>
          <View>
            <Text style={styles.item}>Name: Jane Austen</Text>
          </View>
          <View>
            <Text style={styles.item}>Description: Jane Austen</Text>
          </View>
          <View>
            <Text style={styles.item}>Price: 1000 USD</Text>
          </View>
        </View>

        <View>
          <Text style={styles.detail}>You may also like</Text>
          <View style={{
            marginTop:20,
            flexDirection:'row',
            justifyContent: 'space-around',
            marginBottom: 38
          }}>

          <TouchableOpacity>
            <Text style={styles.buyNow}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={()=>navigation.navigate('ShoppingCart')} style={styles.addCart}>ADD TO CART</Text>
          </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
  iconCart:{
    marginLeft:10,
    fontSize:28,
    color:'black'
  },
  countLike:{
    backgroundColor: '#CF4071',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    borderRadius: 20,
    marginLeft: 10
  },
  detail: {
    fontWeight :700,
    fontSize: 18,
    color: 'black',
    marginTop: 8
  },
  item: {
    color: 'black',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
  },
  buyNow:{
    color:'#fff',
    backgroundColor:'#169227',
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:38,
    paddingRight:38, 
    borderRadius:10
  },
  addCart:{
    color:'#fff',
    backgroundColor:'#F63D69',
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:38,
    paddingRight:38, 
    borderRadius:10,
  }
})

export default ProductDetail;