import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Input } from "react-native-elements";
import Background from "../components/background";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import isEmail from "validator/lib/isEmail";
import * as FileSystem from "../data/FileSystem";
var filter = require("leo-profanity");
const VIEW = {
  LOGIN: 0,
  REGISTER: 1,
};
export default class Login extends Component {
  async componentDidMount() {
    FileSystem.loadFromFileSystem(FileSystem.FILES.SETTINGS, user => {
      this.setState({email: user.email, password: user.password})
    })
  }

  state = {
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    view: VIEW.LOGIN,
    error: null,
  };

  updateUser = () => {
    FileSystem.loadFromFileSystem(FileSystem.FILES.SETTINGS,
      obj => {
        obj.email = this.state.email;
        obj.password = this.state.password;
        console.log(obj);
        FileSystem.saveToFileSystem(FileSystem.FILES.SETTINGS, obj);
      });
  }

  login = () => {
    this.updateUser();

    if (isEmail(this.state.email)) {
      fetch("https://onpapersports.com/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.user) {
            //logged in
            Actions.replace("upload", {
              user: json.user,
              password: this.state.password,
            });
          } else {
            this.setState({ error: json.message });
          }
        });
    } else {
      this.setState({ error: "Not a valid email address" });
    }
  };

  register = () => {
    if (filter.check(this.state.user)) {
      Alert.alert(
        "Please do not use bad words in your user name"
      );
      return;
    }

    if(this.state.password != this.state.confirmPassword){
      Alert.alert(
        "Passwords do not match"
      );
      return;
    }

    if (
      this.state.user.length < 3 ||
      this.state.email.length < 3 ||
      this.state.password.length < 3
    ) {
      Alert.alert("Please fill out all the fields", "");
      return;
    }

    this.updateUser();

    if (isEmail(this.state.email)) {
      fetch("https://onpapersports.com/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          user: this.state.user,
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.user) {
            //logged in
            Actions.replace("upload", {
              user: json.user,
              password: this.state.password,
            });
          } else {
            this.setState({ error: json.message });
          }
        });
    } else {
      this.setState({ error: "Not a valid email address" });
    }
  };

  render() {
    return (
      <Background>
        <View>
          {
            <View style={{ padding: 20 }}>
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
                  fontSize: 28,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {"On Paper Sports Account"}
              </Text>

              <Text style={{ fontFamily: "advent-pro", fontSize: 24 }}>
                {this.state.view == VIEW.LOGIN ? "Login" : "Sign Up"}
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
                  Email Address
                </Text>
                <Input
                  autoCapitalize ={"none"}
                  onChangeText={(value) => this.setState({ email: value })}
                  placeholder={"your email address"}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                >
                  {this.state.email}
                </Input>
              </View>

              {this.state.view == VIEW.LOGIN ? null : (
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#616161",
                    }}
                  >
                    Username
                  </Text>
                  <Input
                  autoCapitalize ={"none"}
                    onChangeText={(value) => this.setState({ user: value })}
                    placeholder={"your username"}
                    placeholderTextColor={"rgb(180,180,180)"}
                    inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                  ></Input>
                </View>
              )}

              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "#616161",
                  }}
                >
                  Password
                </Text>
                <Input
                  autoCapitalize ={"none"}
                  onChangeText={(value) => this.setState({ password: value })}
                  placeholder={"your password"}
                  secureTextEntry={true}
                  placeholderTextColor={"rgb(180,180,180)"}
                  inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                >
                  {this.state.password}
                </Input>
              </View>

              {this.state.view == VIEW.LOGIN ? null : (
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      textTransform: "uppercase",
                      color: "#616161",
                    }}
                  >
                    Confirm Password
                  </Text>
                  <Input
                  autoCapitalize ={"none"}
                    onChangeText={(value) => this.setState({ confirmPassword: value })}
                    placeholder={"confirm password"}
                  secureTextEntry={true}
                    placeholderTextColor={"rgb(180,180,180)"}
                    inputStyle={{ color: "black", fontFamily: "advent-pro" }}
                  ></Input>
                </View>
              )}

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    view:
                      this.state.view == VIEW.LOGIN
                        ? VIEW.REGISTER
                        : VIEW.LOGIN,
                  })
                }
              >
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: "advent-pro",
                      fontSize: 18,
                      color: "#0288d1",
                    }}
                  >
                    {this.state.view == VIEW.LOGIN
                      ? "Don't have an On Paper Sports acccount? click here to register!"
                      : "Already have an On Paper Sports acccount? click here to login!"}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ margin: 10 }}>
                <Text
                  style={{
                    fontFamily: "advent-pro",
                    fontSize: 16,
                    color: "red",
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  {this.state.error ? this.state.error : ""}
                </Text>

                <Button
                  title={this.state.view == VIEW.LOGIN ? "Login" : "Sign Up"}
                  color={"#333333"}
                  textColor={"white"}
                  onPress={() => {
                    this.state.view == VIEW.LOGIN
                      ? this.login()
                      : this.register();
                  }}
                ></Button>
              </View>
            </View>
          }
        </View>
      </Background>
    );
  }
}
