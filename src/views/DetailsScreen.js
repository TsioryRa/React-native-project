import React, { useEffect, useState } from 'react'
import {ScrollView, StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import * as Animatable from 'react-native-animatable'
const { width, height } = Dimensions.get('screen')

import * as theme from '../config/theme'
import { NavigationHelpersContext } from '@react-navigation/native'

export default function DetailsScreen({ route }) {
  const { product } = route.params

  console.log(product)

  return (
    <View style={theme.styles.container}>
        <Image source={{ uri: product.image_url }} style={{ width: width, height: width/2, marginRight: 12}} resizeMode="cover" />

      <Animatable.View
        animation="fadeInUp"
      >
        <Text style={{ fontSize: 28}}>{product.product_name}</Text>
      </Animatable.View>
      


    </View>
  )
}

DetailsScreen.sharedElements = (route) => {
  const { product } = route.params
  return [`element-${product.sortkey}-image`]
}