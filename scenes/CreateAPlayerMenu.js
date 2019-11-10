import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {createPlayer, saveData, portraits} from '../data/script';
import CachedImage from '../components/CachedImage';



export default class CreateAPlayerMenu extends React.Component {
    state = {
        name: 'New Player',
        number: 0,
        positionString: 'C',
        position: 0,
        age: 21,
        salary: 1200000,
        faceSrc: portraits[Math.floor(Math.random()*portraits.length)],
        height:"6\"0'",
        team : null
    }

    
    previousPortrait(){
        let index=portraits.indexOf(this.state.faceSrc);
        index--;
        if(index<0){
          index = portraits.length-1;
        }
        this.setState({faceSrc: portraits[index]});
       }
   
       nextPortrait(){
         let index=portraits.indexOf(this.state.faceSrc);
         index++;
         if(index>portraits.length-1){
           index = 0;
         }
         this.setState({faceSrc: portraits[index]});
        }

    setFaceSource(value){
        //check to see if it is link
        if(value.length < 5){
            return;
        }else{
            this.setState({faceSrc: value});
        }
    }

    saveChanges() {
        let ply = createPlayer(this.state.name, this.state.number, this.state.position, this.state.age, this.state.salary, this.state.faceSrc, this.state.height, this.state.team);
        //roster autosave
        saveData('Roster_Autosave');
        Actions.replace('playerprofile', { selectedPlayer: ply });
    }

    height(value){
        let height='';
        switch(value){
            case 0:
            height = "5\"5'";
            break;
            case 1:
            height = "5\"6'";
            break;
            case 2:
            height = "5\"7'";
            break;
            case 3:
            height = "5\"8'";
            break;
            case 4:
            height = "5\"9'";
            break;
            case 5:
            height = "5\"10'";
            break;
            case 6:
            height = "5\"11'";
            break;
            case 7:
            height = "6\"0'";
            break;
            case 8:
            height = "6\"1'";
            break;
            case 9:
            height = "6\"2'";
            break;
            case 10:
            height = "6\"3'";
            break;
            case 11:
            height = "6\"4'";
            break;
            case 12:
            height = "6\"5'";
            break;
            case 13:
            height = "6\"6'";
            break;
            case 14:
            height = "6\"7'";
            break;
            case 15:
            height = "6\"8'";
            break;
            case 16:
            height = "6\"9'";
            break;
            case 17:
            height = "6\"10'";
            break;
            case 18:
            height = "6\"11'";
            break;
            case 19:
            height = "7\"0'";
            break;
            case 20:
            height = "7\"1'";
            break;
            case 21:
            height = "7\"2'";
            break;
            case 22:
            height = "7\"3'";
            break;
            case 23:
            height = "7\"4'";
            break;
            case 24:
            height = "7\"5'";
            break;
            case 25:
            height = "7\"6'";
            break;
        }

        this.setState({height : height});
    }

    updateTeam = (team) =>{
        this.setState({team : team});
    }

    position(value) {
        var str = '';
        if (value === 0) {
            str = "C"
        }
        if (value === 1) {
            str = "LW"
        }
        if (value === 2) {
            str = "RW"
        }
        if (value === 3) {
            str = "D"
        }
        if (value === 4) {
            str = "G"
        }

        this.setState({ position: value, positionString: str })
    }


    render() {
        return (
            <Background>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>

                    <Card
                        containerStyle={{
                            width: '95%', backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'black',
                            alignSelf:'center'
                        }} >


                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                this.state.team != null?
                                <CachedImage uri={this.state.team.logoSrc  } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                                : null
                            }

                            <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.team == null? 'Free Agents' : this.state.team.name}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider> 

                        
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.previousPortrait()}>
                          <Text style={{ textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'<-'}</Text>

                          </TouchableOpacity>
                        <CachedImage uri={this.state.faceSrc  } style={{flex:1, height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }}/>
                          <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}  onPress={() =>this.nextPortrait()}>
                          <Text style={{textAlign: "center", fontSize: 30, color: 'black', fontFamily: 'advent-pro' }}>{'->'}</Text>
                          </TouchableOpacity>
                        </View>  

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{this.state.positionString + ' #' + this.state.number + ' ' + this.state.name}</Text>
                        <Divider style={{ backgroundColor: 'black', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={this.state.name} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"FACE LINK: "}</Text>
                        <Input onChangeText={value => this.setFaceSource(value)} placeholder={'Paste Link To Photo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'black', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"POS: " + this.state.positionString}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={4}
                            value={this.state.position}
                            onValueChange={value => this.position(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"#: " + this.state.number}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={99}
                            value={this.state.number}
                            onValueChange={value => this.setState({ number: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"AGE: " + this.state.age}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={18}
                            maximumValue={49}
                            value={this.state.age}
                            onValueChange={value => this.setState({ age: value })}
                        />

<Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"HEIGHT: " + this.state.height}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={25}
                            value={7}
                            onValueChange={value => this.height(value)}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'black', fontFamily: 'advent-pro' }}>{"SALARY: $" + this.state.salary}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={10000}
                            minimumValue={1000000}
                            maximumValue={50000000}
                            value={this.state.salary}
                            onValueChange={value => this.setState({ salary: value })}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, borderColor: 'black', marginBottom:10 }} title="Select Team" onPress={() => { Actions.push('teamlist', {updateTeam : this.updateTeam, home:6}) }}></Button>
                        

                        <Button titleStyle={{ fontFamily: 'advent-pro', color: 'black' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'black', borderWidth: 1, borderColor: 'black' }} title="Create Player" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

