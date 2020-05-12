import React from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import {
  selectedTeam,
  leaugeLeaders,
  setSelectedTeam2,
  franchise,
  collegeMode,
} from "../data/script";
import Background from "../components/background";
import CachedImage from "../components/CachedImage";

const DualButton = ({
  leftImage,
  leftTitle,
  rightImage,
  rightTitle,
  leftOnPress,
  rightOnPress,
  leftNotification
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "95%",
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={{ width: "97%", flex: 1, marginRight: "1.25%" }}
        onPress={leftOnPress}
      >
        <Card
          containerStyle={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0)",
            alignSelf: "center",
            borderColor: "rgba(0,0,0,0.9)",
          }}
        >
          {leftImage ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CachedImage
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    resizeMode: "contain",
                    height: 75,
                    width: 75,
                    margin: 5,
                  }}
                  uri={leftImage}
                />
              </View>
              <Divider
                style={{ backgroundColor: "black", height: 1, margin: 5 }}
              ></Divider>
            </View>
          ) : null}
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "black",
              fontFamily: "advent-pro",
            }}
          >
            {leftTitle}
          </Text>

          {leftNotification ? (
              <View style={{width: 25, height: 25, borderRadius:25/2, backgroundColor:'#e53935', justifyContent:'center', alignItems:'center',
              position:'absolute', top:0, right:0
              }}>
                <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "white",
                      fontFamily: "advent-pro",
                      textAlign:'center'
                    }}>{leftNotification}</Text>
              </View>
            ) : null}

        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: "97%", flex: 1, marginLeft: "1.25%" }}
        onPress={rightOnPress}
      >
        <Card
          containerStyle={{
            width: "100%",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "black",
            alignSelf: "center",
          }}
        >
          {rightImage ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CachedImage
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    resizeMode: "contain",
                    height: 75,
                    width: 75,
                    margin: 5,
                  }}
                  uri={rightImage}
                />
              </View>
              <Divider
                style={{ backgroundColor: "black", height: 1, margin: 5 }}
              ></Divider>
            </View>
          ) : null}

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "black",
              fontFamily: "advent-pro",
            }}
          >
            {rightTitle}
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default DualButton;
