import React, { useEffect, useState, useContext } from 'react';
import {
  Image, SafeAreaView,
  ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Alert
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { MEDIA_URL } from '../config';
import { cartApi } from '../clients/cart_api';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const route = useRoute();
  const { addToCart, userInfo, countLengthCart } = useContext(AuthContext);
  const getIPFSLink = (hash) => {
    return MEDIA_URL + hash;
  };

  const id_user = userInfo.id;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  async function fetchData() {
    setProduct(route.params.data);
    const item = await cartApi.gets({ id_user });
    setCart(item.data);
  }
  const handleAddCart = () => {
    const idProduct = product.id;
    const idUser = id_user;
    addToCart({ idProduct, idUser, quantity });
    Alert.alert("Add item to cart successfully!");
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <Header
        trueCart
        trueHear
        trueCoin
        navigation={navigation}
        trueReturn
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ padding: 15 }}>

          <View>
            <View style={{
              width: '100%',
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: 20
            }}>
              <View style={{
                flex: 1,
                width: '100%',
                height: 200,
                opacity: 1,
              }}>
                <ImageBackground source={{ uri: getIPFSLink(product.media) }} resizeMode="cover" style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderRadius: 10,
                }} imageStyle={{ borderRadius: 10 }}>
                  <View style={{ height: '100%', justifyContent: 'flex-end' }}>
                    <View style={{
                      backgroundColor: '#D62965',
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                      <View>
                        <Text style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>${product.pricing}</Text>
                        <Text style={{ fontSize: 13, fontWeight: 700, color: '#ccc' }}>{product.description}</Text>
                      </View>
                      <View
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          borderRadius: 10,
                          marginBottom: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{
                          flexDirection: 'row',
                          fontSize: 20

                        }}>
                          <TouchableOpacity onPress={() => handleDecreaseQuantity()}>
                            <Ionicons
                              style={{ fontSize: 22 }}
                              name='ios-remove-circle-sharp'
                              color='white'
                            />
                          </TouchableOpacity>
                          <Text style={{
                            fontSize: 16,
                            paddingLeft: 10,
                            paddingRight: 10,
                            color: 'white'
                          }}>{quantity || 1}</Text>
                          <TouchableOpacity onPress={() => handleIncreaseQuantity()}>
                            <Ionicons
                              style={{ fontSize: 22 }}
                              name='add-circle'
                              color='white'
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>

            </View>
          </View>

          <View>
            <Text style={styles.detail}>Details</Text>
            <View style={{
              marginTop: 15,
              padding: 15,
              backgroundColor: "white",
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: { width: 20, height: 20 },
              shadowOpacity: 0.8,
              shadowRadius: 5,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc'

            }}>
              <Text style={styles.item}>{product.name}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.detail}>Review</Text>
            <View>
              <View style={{
                flexDirection: 'row', alignItems: 'center', flex: 1, flexWrap: 'wrap', marginBottom: 10
              }}>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Product as is
                  </Text>

                </View>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Seller responsive
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Delivery timing
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Package protection
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Correct order
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 20 }}>
                  <Octicons
                    name="dot-fill"
                    size={20}
                    color="green"
                  />
                  <Text style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Medium',
                    color: 'black',
                    marginLeft: 5
                  }}>
                    Buying experience
                  </Text>
                </View>
              </View>
            </View>
          </View>


          <Text style={styles.detail}>You may also like</Text>

        </ScrollView>
        <View>
          <View style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20
          }}>

            <TouchableOpacity>
              <Text style={styles.buyNow}>BUY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text onPress={() => handleAddCart()} style={styles.addCart}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    </>
  )
}
const styles = StyleSheet.create({
  iconCart: {
    marginLeft: 10,
    fontSize: 28,
    color: 'black'
  },
  countLike: {
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
    fontWeight: 700,
    fontSize: 18,
    color: 'black',
    marginTop: 8
  },
  item: {
    color: 'black',
  },
  buyNow: {
    color: '#fff',
    backgroundColor: '#169227',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 38,
    paddingRight: 38,
    borderRadius: 10
  },
  addCart: {
    color: '#fff',
    backgroundColor: '#F63D69',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 38,
    paddingRight: 38,
    borderRadius: 10,
  }
})

export default ProductDetail;