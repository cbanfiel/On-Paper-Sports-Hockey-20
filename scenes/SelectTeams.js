import React from 'react';
import { TouchableOpacity, Text, ScrollView, View, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { home, away, Game } from '../data/script';
import Background from '../components/background';
import CachedImage from '../components/CachedImage';

export default class SelectTeams extends React.Component {


  state = {
    home: home
  }

  update = () => {
    this.setState({home: home});
  }




  render() {
    return (
      <Background>

        <ScrollView >
          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 0, updateState: this.update })}>

          <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf:'center'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={home.logoSrc } />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{home.name + ' OVR: ' + home.rating}</Text>
                  </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.teamlist({ home: 1, updateState: this.update })}>

          <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf:'center'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5 }} uri={away.logoSrc} />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{away.name + ' OVR: ' + away.rating}</Text>
                  </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ width: '100%' }} onPress={() => Actions.ingame({game : new Game()})}>

          <Card
                    containerStyle={{
                      width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                      borderRadius: 25,
                      alignSelf:'center'
                    }}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginRight: 20 }} uri={ home.logoSrc } />
                      <CachedImage style={{ flex: 1, overflow: 'hidden', resizeMode: 'contain', height: 75, width: 75, margin: 5, marginLeft: 20 }} uri={ away.logoSrc } />
                    </View>
                    <Divider style={{backgroundColor:'white' ,  height:1, margin:5}} ></Divider>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Start Game'}</Text>
                  </Card>
                </TouchableOpacity>

        </ScrollView>
      </Background>

    )
  }
}