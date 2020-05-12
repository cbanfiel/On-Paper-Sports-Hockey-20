import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import { getRosterJSON, exportDraftClassJson } from "../data/script.js";
import CommunityRosterListItem from "../components/CommunityRosterListItem";
var filter = require("leo-profanity");

const GAME = "hockey";
const URL = "https://onpapersports.com/roster/user/hockey/";
const DELETE_URL = "https://onpapersports.com/roster/delete/";

export default class Upload extends Component {
  componentDidMount() {
    this.fetchUsersRosters();
  }

  fetchUsersRosters() {
    fetch(URL + this.props.user._id)
      .then((res) => res.json())
      .then((json) => {
        let slots = this.props.user.uploadsAllowed - json.rosters.length;
        let emptySlots = [];
        for (let i = 0; i < slots; i++) {
          emptySlots.push(i);
        }
        this.setState({
          usersRosters: json.rosters,
          emptySlots,
          loading: false,
          uploadShown: false,
        });
      });
  }

  state = {
    rosterName: "",
    college: false,
    message: "",
    usersRosters: [],
    selectedRoster: null,
    uploadShown: false,
    emptySlots: [],
    rosterName: "",
    loading: true,
    update: false,
    updateRosterId: "",
    sliderType: 'pro'
  };

  setSelectedRoster = (roster) => {
    this.setState({ selectedRoster: roster }, () => Actions.pop());
  };

  requestUploadPrivileges = () => {
    let url =
    "https://onpapersports.com/users/request/" + this.props.user._id;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: this.props.password
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      Alert.alert(json.message);
    })
    .catch((err) => Alert.alert(err.message));
  }

  manageRosterPress = (roster) => {
    Alert.alert(roster.name, "Choose an option", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Update",
        onPress: () => {
          this.update(roster);
        },
      },
      {
        text: "Delete",
        onPress: () => {
          this.delete(roster);
        },
      },
    ]);
  };

  update = (roster) => {
    this.setState({
      rosterName: roster.name,
      update: true,
      updateRosterId: roster._id,
      uploadShown: true,
      sliderType: roster.sliderType ? roster.sliderType : 'pro'
    });
  };

  deleteAccount = () => {
    Alert.alert(
      "Are you sure you want to delete your account?",
      "This will delete all your uploaded rosters as well...",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let url =
              "https://onpapersports.com/users/delete/" + this.props.user._id;
            fetch(url, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: this.props.user._id,
                password: this.props.password,
              }),
            })
              .then((res) => res.json())
              .then((json) => {
                Alert.alert(json.message);
                Actions.pop();
              })
              .catch((err) => Alert.alert(err.message));
          },
        },
      ]
    );
  };

  delete = (roster) => {
    Alert.alert(
      "Are you sure you want to delete " + roster.name + "?",
      "Choose an option",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            this.setState(
              {
                loading: true,
              },
              () => {
                const url = DELETE_URL + roster._id;
                fetch(url, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: this.props.user._id,
                    password: this.props.password,
                  }),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    Alert.alert(json.message);
                    this.fetchUsersRosters();
                  })
                  .catch((err) => console.log(err));
              }
            );
          },
        },
      ]
    );
  };

  upload = () => {
    if (filter.check(this.state.rosterName)) {
      Alert.alert(
        "Watch your mouth",
        "Please do not use bad words in your roster name"
      );
      return;
    }

    if (this.state.rosterName.length < 3) {
      Alert.alert("Roster name must be at least 3 characters");
      return;
    }
    this.setState({ loading: true });

    let data = this.state.selectedRoster
      ? this.state.selectedRoster.type.toLowerCase() == "draftclass"
        ? JSON.parse(exportDraftClassJson())
        : getRosterJSON(this.state.selectedRoster.data)
      : getRosterJSON();

    let url = this.state.update
      ? "https://onpapersports.com/roster/update/" + this.state.updateRosterId
      : "https://onpapersports.com/roster/upload/" + GAME;
    fetch(url, {
      method: this.state.update ? "PATCH" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.rosterName,
        userId: this.props.user._id,
        password: this.props.password,
        type: this.state.selectedRoster
          ? this.state.selectedRoster.type
          : "roster",
        data: data,
        sliderType: this.state.sliderType
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        Alert.alert(json.message);
        this.fetchUsersRosters();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { user } = this.props;
    return (
      <Background>
        {this.state.loading ? (
          <View
            style={{
              height: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"}></ActivityIndicator>
          </View>
        ) : (
          <ScrollView style={{ padding: 20 }}>
            <Image
              style={{
                resizeMode: "contain",
                height: 75,
                alignSelf: "center",
                margin: 5,
              }}
              source={require("../assets/icon.png")}
            />
            <Text
              style={{
                fontFamily: "advent-pro",
                fontSize: 22,
                color: "black",
                textAlign: "center",
              }}
            >{`Welcome back ${user.user},`}</Text>

            <View style={{ padding: 20 }}>
              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 18,
                  color: "black",
                  textAlign: "center",
                }}
              >{`Rosters you have uploaded (${this.state.usersRosters.length}/${this.props.user.uploadsAllowed})`}</Text>
              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 18,
                  color: "black",
                  textAlign: "center",
                }}
              >{`Select a roster slot`}</Text>

              {this.state.usersRosters.map((item, i) => (
                <CommunityRosterListItem
                  titleStyle={{ fontFamily: "advent-pro", color: "black" }}
                  subtitleStyle={{ fontFamily: "advent-pro", color: "black" }}
                  containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
                  onPress={() => {
                    this.manageRosterPress(item);
                  }}
                  title={item.name}
                  subtitle={`Created By: ${item.userName}`}
                  rightTitleStyle={{ fontFamily: "advent-pro" }}
                  rightTitle={`Downloads: ${item.downloads}`}
                  rightSubtitle={`Updates: ${item.updates}`}
                  key={i}
                ></CommunityRosterListItem>
              ))}
              {this.state.emptySlots.map((item, i) => (
                <CommunityRosterListItem
                  titleStyle={{ fontFamily: "advent-pro", color: "black" }}
                  subtitleStyle={{ fontFamily: "advent-pro", color: "black" }}
                  containerStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
                  onPress={() => {
                    this.setState({
                      uploadShown: true,
                      update: false,
                      updateRosterId: "",
                      rosterName: "",
                    });
                  }}
                  title={"Empty Roster Slot " + (i + 1)}
                  rightTitleStyle={{ fontFamily: "advent-pro" }}
                  key={i}
                ></CommunityRosterListItem>
              ))}
            </View>

            {this.state.uploadShown ? (
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 22,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {this.state.update ? "Update Roster" : "Upload A Roster"}
                </Text>

                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#616161",
                    }}
                  >
                    Roster Name
                  </Text>
                  <Input
                    onChangeText={(value) =>
                      this.setState({ rosterName: value })
                    }
                    placeholder={
                      this.state.update
                        ? this.state.rosterName
                        : "name your roster"
                    }
                    placeholderTextColor={"rgb(180,180,180)"}
                    inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                  ></Input>

                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#616161",
                      marginVertical: 20,
                    }}
                  >
                    {`Selected Roster: ${
                      this.state.selectedRoster
                        ? this.state.selectedRoster.name
                        : "Current Roster"
                    }`}
                  </Text>

                  <Button
                    title={"Roster Type: " + this.state.sliderType}
                    color={"#333333"}
                    style={{ marginVertical: 10 }}
                    textColor={"white"}
                    onPress={() => {
                          if(this.state.sliderType == 'pro'){this.setState({sliderType: 'college'})}
                          else if(this.state.sliderType == 'college'){this.setState({sliderType: 'pro'})}
                          else{this.setState({sliderType: 'pro'})}
                    }}
                  ></Button>


                  <Button
                    title={"Select A Roster"}
                    color={"#333333"}
                    style={{ marginVertical: 10 }}
                    textColor={"white"}
                    onPress={() => {
                      Actions.selectroster({
                        setSelectedRoster: this.setSelectedRoster,
                      });
                    }}
                  ></Button>

                  <Button
                    title={this.state.update ? "Update" : "Upload"}
                    color={"#333333"}
                    textColor={"white"}
                    style={{ marginVertical: 10 }}
                    onPress={() => {
                      this.upload();
                    }}
                  ></Button>
                </View>
              </View>
            ) : null}

            <View style={{ padding: 20 }}>
              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 16,
                  color: "#616161",
                  marginVertical: 20,
                }}
              >
                {`NOTE: There is a zero tolerance policy for innapropriate names/images in your uploaded roster files, perpetrators will be permanently banned`}
              </Text>
              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 16,
                  color: "#616161",
                  marginVertical: 20,
                }}
              >
                {`NOTE: Feel free to edit/update existing rosters!`}
              </Text>
              <Text
                style={{
                  fontFamily: "advent-pro",
                  fontSize: 16,
                  color: "#616161",
                  marginVertical: 20,
                }}
              >
                {`NOTE: There is currently a limit on maximum uploads per user, this is to protect against spam uploads. Please try to use common sense when uploading rosters. If you would like to upload more than 2 rosters, send a request via the button below, and I will check your rosters and grant you more upload priviliges.`}
              </Text>

              <Button
                title={"Request More Upload Privileges"}
                color={"#333333"}
                textColor={"white"}
                style={{ marginVertical: 10 }}
                onPress={() => {this.requestUploadPrivileges()}}
              ></Button>

              <Button
                title={"Delete Your Account"}
                color={"rgba(255,0,0,.75)"}
                textColor={"white"}
                style={{ marginVertical: 10 }}
                onPress={() => {
                  this.deleteAccount();
                }}
              ></Button>
            </View>

            <Text
              style={{
                fontFamily: "advent-pro",
                fontSize: 18,
                textTransform: "uppercase",
                color: "red",
              }}
            >
              {this.state.message}
            </Text>
          </ScrollView>
        )}
      </Background>
    );
  }
}
