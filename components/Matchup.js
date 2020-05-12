import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Picache from "picache";
import { collegeMode } from "../data/script";

const Matchup = ({ leftTeam, rightTeam, day }) => {
  return (
    <View style={styles.child}>
      <View style={{ flex: 1 }}>
        <Text style={styles.textLarge}>{leftTeam.played[day].userScore}</Text>
      </View>
      {collegeMode ? (
            <Text style={[styles.textSmall, {marginRight: 10}]}>
              {leftTeam.seed <= 25 ? `#${leftTeam.seed}` : "  "}
            </Text>
          ) : null}
      <View style={styles.col}>
      <Text style={styles.textSmall}>{''}</Text>
          <Picache style={styles.image} source={{ uri: leftTeam.logoSrc }} />
          <Text style={styles.textSmall}>
            {leftTeam.wins + "-" + leftTeam.losses}
          </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.textSmall}>vs</Text>
      </View>


      <View style={styles.col}>
      <Text style={styles.textSmall}>{''}</Text>
          <Picache style={styles.image} source={{ uri: rightTeam.logoSrc }} />
          <Text style={styles.textSmall}>
            {rightTeam.wins + "-" + rightTeam.losses}
          </Text>
      </View>
      {collegeMode ? (
            <Text style={[styles.textSmall, {marginLeft: 10}]}>
              {rightTeam.seed <= 25 ? `#${rightTeam.seed}` : "  "}
            </Text>
          ) : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.textLarge}>{rightTeam.played[day].userScore}</Text>
      </View>
      </View>

  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderBottomWidth: 0.5,
  },
  child: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 0.5,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    height: 75,
    width: 75,
    margin: 5,
  },
  textSmall: {
    fontFamily: "advent-pro",
    fontSize: 18,
  },
  textLarge: { 
    fontFamily: "advent-pro", 
    fontSize: 30, 
    marginLeft: 20 },
  col: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Matchup;
