import React, { useEffect, useState } from 'react'
import {SafeAreaView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

export default function AddProduct ({navigation}) {

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
   
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: false
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#CCC', marginTop: 120}}>

      <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
        
        <Text style={{flex:6, fontSize: 26}}>Ajouter un produit</Text>
        <Pressable 
          onPress={() => navigation.goBack()}
          style={{flex:1}}
        >
          <Ionicons name="close-circle-sharp" size={24} color="black" />
        </Pressable>
      </View>

      <View style={{flex:4}}>
        <Pressable
          onPress={pickImage} 
          style={{ borderWidth: 4, borderColor: 'white', width: 80, height: 80, borderRadius: 50, alignItems: 'center', justifyContent:'center', marginBottom: 60 }}>
          <Ionicons name="camera" size={42} color="white" />
        </Pressable>
      </View>
    
    </SafeAreaView>
  )
}