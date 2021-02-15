import React, { useEffect, useState } from 'react'
import {SafeAreaView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SharedElement } from 'react-navigation-shared-element'

//import products from '../../assets/data/products.json'
import * as theme from '../config/theme'
import productIcon from '../../assets/icons/new-product.png'


export default function HomeScreen({ navigation }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
  },[])

  const productIconURI = Image.resolveAssetSource(productIcon)


  const getProducts = () => {
    fetch('https://fr-en.openfoodfacts.org/category/pizzas/1.json')
    .then((response) => response.json())
    .then((json) => setProducts(json.products))
    .catch((error) => console.error(error))
    //.finally(() => setLoading(false));
  }

  const HeaderComponent = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 20}}>
        <Image source={{ uri: productIconURI.uri }} style={{width: 30, height: 30}} />
        <Text style={{ fontSize: 24, padding: 20}}>Mes produits</Text>
      </View>
      
    )
  }

  const ProductItem = ({product}) => {
    return (
      <Pressable onPress={() => navigation.navigate('Details', { product: product })}>
        <View style={styles.productLine}>
          <SharedElement id={`element-${product.sortkey}-image`}>
            <Image source={{ uri: product.image_url }} style={{ width: 50, height: 50, marginRight: 12}} />
          </SharedElement>
          <View>
      
              <Text style={theme.styles.listTitle}>{product.product_name}</Text>
    
            <Text style={{ color: 'gray'}}>{product.nutriscore_score}</Text>
          </View>
        </View>
      </Pressable>
      
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <Pressable 
          style={{position: 'absolute', bottom: 20, right: 20, zIndex:2}}
          onPress={() => navigation.navigate('AddProduct')}
        >
        <Ionicons name="add-circle" size={64} color="black" />
      </Pressable>
      <FlatList 
        data={products}
        keyExtractor={item => `product-${item.sortkey}`}
        renderItem={({item}) => <ProductItem product={item} />}
        ListHeaderComponent={<HeaderComponent />}
      />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  productLine: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    flex: 1, 
    flexDirection: 'row'
  }
})