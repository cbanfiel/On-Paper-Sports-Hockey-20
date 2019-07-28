import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Card, Slider, Divider, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import {selectedTeam} from '../data/script';
import CachedImage from '../components/CachedImage';


export default class EditPlayerInfo extends React.Component {
    state = {
        name: this.props.selectedPlayer.name,
        number: this.props.selectedPlayer.number,
        positionString: this.props.selectedPlayer.positionString,
        position: this.props.selectedPlayer.position,
        age: this.props.selectedPlayer.age,
        years: this.props.selectedPlayer.years,
        salary: this.props.selectedPlayer.salary,
        faceSrc: this.props.selectedPlayer.faceSrc,
        height: this.props.selectedPlayer.height
    }

    saveChanges() {
        this.props.selectedPlayer.name = this.state.name;
        this.props.selectedPlayer.number = this.state.number;
        this.props.selectedPlayer.positionString = this.state.positionString;
        this.props.selectedPlayer.position = this.state.position;
        this.props.selectedPlayer.age = this.state.age;
        this.props.selectedPlayer.years = this.state.years;
        this.props.selectedPlayer.salary = this.state.salary;
        this.props.selectedPlayer.faceSrc = this.state.faceSrc;
        this.props.selectedPlayer.height = this.state.height;
        try{
            selectedTeam.reorderLineup();
        }catch(err){
            console.log('Error Reordering Lineup, Most likely during offseason')
        }

        this.props.updateState();
        Actions.pop();
    }

    setFaceSource(value){
        //check to see if it is link
        if(value.length < 5){
            return;
        }else{
            this.setState({faceSrc: value});
        }
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

        this.setState({height: height});
    }

    heightInit(value){
        let height='';
        switch(value){
            case "5\"5'":
            height = 0;
            break;
            case "5\"6'":
            height = 1;
            break;
            case "5\"7'":
            height = 2;
            break;
            case "5\"8'":
            height = 3;
            break;
            case "5\"9'":
            height = 4;
            break;
            case "5\"10'":
            height = 5;
            break;
            case "5\"11'":
            height = 6;
            break;
            case "6\"0'":
            height = 7;
            break;
            case "6\"1'":
            height = 8;
            break;
            case "6\"2'":
            height = 9;
            break;
            case "6\"3'":
            height = 10;
            break;
            case "6\"4'":
            height = 11;
            break;
            case "6\"5'":
            height = 12;
            break;
            case "6\"6'":
            height = 13;
            break;
            case "6\"7'":
            height = 14;
            break;
            case "6\"8'":
            height = 15;
            break;
            case "6\"9'":
            height = 16;
            break;
            case "6\"10'":
            height = 17;
            break;
            case "6\"11'":
            height = 18;
            break;
            case "7\"0'":
            height = 19;
            break;
            case "7\"1'":
            height = 20;
            break;
            case "7\"2'":
            height = 21;
            break;
            case "7\"3'":
            height = 22;
            break;
            case "7\"4'":
            height = 23;
            break;
            case "7\"5'":
            height = 24;
            break;
            case "7\"6'":
            height = 25;
            break;
        }
        return height;
    }

    position(value) {
        var str = '';
        if (value === 0) {
            str = "PG"
        }
        if (value === 1) {
            str = "SG"
        }
        if (value === 2) {
            str = "SF"
        }
        if (value === 3) {
            str = "PF"
        }
        if (value === 4) {
            str = "C"
        }

        this.setState({ position: value, positionString: str })
    }


    render() {
        return (
            <Background>
                <ScrollView >

                    <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CachedImage uri={this.props.selectedPlayer.teamLogoSrc } style={{ height: 30, width: 30, maxHeight: 30, resizeMode: 'contain', marginRight: 5 }}/>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.props.selectedPlayer.teamName}</Text>
                        </View>
                        
                        <CachedImage rounded style={{ height: 75, width: 75, resizeMode:'contain', flexDirection: 'column', alignSelf: 'center', marginBottom: 5 }} uri={this.state.faceSrc }/>
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{this.state.positionString + ' #' + this.state.number + ' ' + this.state.name}</Text>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"NAME: "}</Text>
                        <Input onChangeText={value => this.setState({ name: value })} placeholder={this.state.name} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'white', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"FACE LINK: "}</Text>
                        <Input onChangeText={value => this.setFaceSource(value)} placeholder={'Paste Link To Photo'} placeholderTextColor={'rgb(180,180,180)'} inputStyle={{ color: 'white', fontFamily: 'advent-pro' }} ></Input>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"POS: " + this.state.positionString}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={4}
                            value={this.state.position}
                            onValueChange={value => this.position(value)}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"#: " + this.state.number}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={99}
                            value={this.state.number}
                            onValueChange={value => this.setState({ number: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"AGE: " + this.state.age}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={18}
                            maximumValue={49}
                            value={this.state.age}
                            onValueChange={value => this.setState({ age: value })}
                        />

                    <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"HEIGHT: " + this.state.height}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={25}
                            value={this.heightInit(this.state.height)}
                            onValueChange={value => this.height(value)}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"CONTRACT YEARS: " + this.state.years}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={6}
                            value={this.state.years}
                            onValueChange={value => this.setState({ years: value })}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"SALARY: $" + this.state.salary}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={10000}
                            minimumValue={1000000}
                            maximumValue={50000000}
                            value={this.state.salary}
                            onValueChange={value => this.setState({ salary: value })}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25 }} title="Commit Changes" onPress={() => { this.saveChanges() }}></Button>


                    </Card>





                </ScrollView>
            </Background>





        )
    }
}

