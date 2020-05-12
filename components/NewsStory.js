import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CachedImage from "../components/CachedImage";

const NewsStory = ({ newsStory }) => {
  return (
    <View style={styles.article}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flex: 1,
        }}
      >
        <CachedImage style={styles.img} uri={newsStory.image1} />
        {
            newsStory.image2 ? (
                <CachedImage style={styles.img} uri={newsStory.image2} />
            ) : null
}
{

            newsStory.image3 ? (
              <CachedImage style={styles.img} uri={newsStory.image3} />
          ) : null
}
{

          newsStory.image4 ? (
            <CachedImage style={styles.img} uri={newsStory.image4} />
        ) : null
}

      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{newsStory.title}</Text>
        <Text style={styles.story}>{newsStory.story}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    flexDirection: "column",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    padding: 10
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    color: "black",
    fontFamily: "advent-pro",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    fontFamily: "advent-pro",
  },
  story: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    fontFamily: "advent-pro",
  },
  img: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    height: 75,
    width: 75,
    margin: 5,
  },
});

export default NewsStory;
