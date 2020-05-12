import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Button = ({title, color, onPress, textColor, style}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[{backgroundColor: color, padding: 10}, style]}>
            <Text style={{color: textColor, fontFamily:'advent-pro', fontSize:20, textAlign:'center'}}>{title}</Text>
        </View>

        </TouchableOpacity>
    )
}

export default Button
