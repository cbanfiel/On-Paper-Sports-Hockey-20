import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import CachedImage from "./CachedImage";

// img


const CardButton = ({
  onPress,
  text1,
  uri1,
  text2,
  uri2,
  subtitle,
  title,
  variation,
  left,
  right
}) => {
  switch (variation) {
    case 0:
      return (
        <TouchableOpacity style={left? styles.leftCardContainer : right? styles.rightCardContainer : { width: "100%" }} onPress={onPress}>
          <Card containerStyle={left? styles.dualContainer : right? styles.dualContainer : styles.normalCardContainer}>
            <View style={styles.row}>
              <CachedImage style={styles.img} uri={uri1} />
            </View>
            <Divider style={styles.divider}></Divider>
            <Text style={styles.title}>{title}</Text>
          </Card>
        </TouchableOpacity>
      );
    case 1:
        return(
        <TouchableOpacity style={{ width: '100%' }} onPress={onPress}>
        <Card
          containerStyle={styles.smallCardContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{title}</Text>
        </Card>
      </TouchableOpacity>
        )
    case 2:
      return null;
    case 3:
      return null;
    case 4:
      return null;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  normalCardContainer: {
    width: "95%",
    backgroundColor: "rgba(255,255,255,0)",
    alignSelf: "center",
    borderColor: "rgba(0,0,0,0.9)",
  },
  leftOpacity:{
    width: '97%', flex: 1, marginRight: '1.25%' 
  },
  rightOpacity: {
    width: '97%', flex: 1, marginLeft: '1.25%' 
  },
  dualContainer:{
    width: '100%', backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'black',
    alignSelf: 'center'
  },
  smallCardContainer: {
    width: '95%', backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black',
    alignSelf: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    height: 75,
    width: 75,
    margin: 5,
  },
  divider: {
    backgroundColor: "black",
    height: 1,
    margin: 5,
  },
  textSmall: {},
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    fontFamily: "advent-pro",
  },
  textLarge: {},
});

export default CardButton;
