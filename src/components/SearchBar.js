
import React from 'react'
import { View, TextInput } from 'react-native'

export default  function SearchBar() {
  return (
    <View>
      <TextInput 
        placeholder="search" 
        style={{ height: 40, borderWidth: 1, width: 250, padding: 5}}
      />
    </View>
  )
}

