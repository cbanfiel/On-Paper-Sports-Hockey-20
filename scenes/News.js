import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Background from "../components/background";
import NewsStory from "../components/NewsStory";
import { franchise, shuffle } from '../data/script';
import { Button } from 'react-native-elements';

export default class News extends Component {

  componentWillUnmount = () => {
    if(this.state.interval){
        clearInterval(this.state.interval);
        this.setState({interval: null})
    }
}

  startInterval = () => {
    let i = this.state.index;
    let interval = setInterval(
      function () {
          if(i >= this.state.shuffledNews.length){
              clearInterval(interval);
              this.setState({interval: null, continue: true})
              // this.props.next();
              return;
          }
          let trimmedNews = this.state.news;
          if(trimmedNews.length > 30){
            trimmedNews.pop();
          }
          this.setState({news: [this.state.shuffledNews[i], ...trimmedNews], index: i+1})
          i++;
      }.bind(this), this.state.simSpeed);
    this.setState({ interval });
  }

  componentDidMount(){
    if(this.props.animate){
      let shuffledNews = [...franchise.season.news.newsStories];
      shuffledNews = shuffle(shuffledNews);
      this.setState({shuffledNews})
      this.startInterval()

    }else{
      this.setState({news: franchise.season.news.newsStories})
    }
  }

  state = { 
    news: [],
    interval: null,
    simSpeed: 500,
    continue: false,
    index: 0
  }


  render() {
    return (
        <Background>
            <View>
                <Text style={styles.header}>{'On Paper Sports News'}</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {
            this.state.news.map((story, i) => (
                <NewsStory newsStory={story} key={i}/>
            ))
        }


      </ScrollView>
      {
        this.state.continue ?
        (
          <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , paddingBottom: 50, borderTopWidth: 1, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: '#333333'}} title="Continue" onPress={() => {this.props.next()}}></Button>
        ):null
      }
     
     {
       this.state.interval ? (
         <Button titleStyle={{ fontFamily: 'advent-pro', color:'black' }} buttonStyle={{ padding: 15 , paddingBottom: 50, borderTopWidth: 1, borderBottomWidth:1, backgroundColor: 'rgba(255,255,255,0)', borderColor: '#333333'}} title="Skip" onPress={() => {
           let interval = this.state.interval;
          clearInterval(interval);
          this.setState({interval: null, simSpeed: 10}, () => {
            this.startInterval();
          })
          }}></Button>
       ):null
     }
        </Background>
    );
  }
}

const styles = StyleSheet.create({
    article:{
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 0.5
    },
    header:{
        textAlign: "center",
        fontSize: 22,
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
    fontSize: 18,
    color: "black",
    fontFamily: "advent-pro",
  },img: {
      flex:1, 
    overflow: "hidden",
    resizeMode: "contain",
    height: 75,
    width: 75,
    margin: 5,
  }
});
