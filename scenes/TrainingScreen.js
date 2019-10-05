import React from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Modal, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode, releasePlayer, saveAsDrasaveClass, manageSaveName, selectedTeam } from '../data/script';
import Background from '../components/background';
import TeamHeader from '../components/TeamHeader';
import ListItem from '../components/ListItem';
import PlayerCardModal from '../components/PlayerCardModal';


export default class TrainingScreen extends React.Component {

    componentWillUnmount(){
        if(this.props.update!= null){
            this.props.update();
        }
    }


    state = {
        player: this.props.player,
        points: this.props.points,
        offGrowth: (this.props.player.off - this.props.player.offOld),
        defGrowth: (this.props.player.def - this.props.player.defOld),
        passGrowth: (this.props.player.pass - this.props.player.passOld),
        faceOffGrowth: (this.props.player.faceOff - this.props.player.faceOffOld),
        positioningGrowth: (this.props.player.positioning - this.props.player.positioningOld),
        reflexesGrowth: (this.props.player.reflexes - this.props.player.reflexesOld),
        off: this.props.player.off,
        def: this.props.player.def,
        pass: this.props.player.pass,
        faceOff: this.props.player.faceOff,
        reflexes: this.props.player.reflexes,
        positioning: this.props.player.positioning,
        disabled: this.props.points<=0,
    }

    train(attr) {
        if(this.state.disabled){
            return;
        }
        if(this.state.player.trained){
            Alert.alert('You already sent ' + this.state.player.name + ' to a camp this year');
            return;
        }


        this.setState({ points: this.state.points - 1, disabled:true });
        let growth = Math.round(Math.random() * 3);
        this.growthAnimation(growth, attr);
    }

    growthAnimation(growth, attr) {
        let pts = growth;
        const timer = setInterval(
            function () {
                if (attr === 'off') {
                    if(this.state.off>=99){
                        //nothing
                    }else{
                        this.setState({off: this.state.off+1, offGrowth: this.state.offGrowth+1});
                    }
                }
                if (attr === 'def') {
                    if(this.state.def>=99){
                        //nothing
                    }else{
                        this.setState({def: this.state.def+1, defGrowth: this.state.defGrowth+1});
                    }
                }
                if (attr === 'pass') {
                    if(this.state.pass>=99){
                        //nothing
                    }else{
                        this.setState({pass: this.state.pass+1, passGrowth: this.state.passGrowth+1});
                    }
                }
                if (attr === 'faceOff') {
                    if(this.state.faceOff>=99){

                    }else{
                        this.setState({faceOff: this.state.faceOff+1, faceOffGrowth: this.state.faceOffGrowth+1});
                    }
                }
                if (attr === 'positioning') {
                    if(this.state.positioning>=99){
                        //nothing
                    }else{
                    this.setState({positioning: this.state.positioning+1, positioningGrowth: this.state.positioningGrowth+1});
                }
            }
            if (attr === 'reflexes') {
                if(this.state.reflexes>=99){
                    //nothing
                }else{
                this.setState({reflexes: this.state.reflexes+1, reflexesGrowth: this.state.reflexesGrowth+1});
            }
        }

                pts--;

                if (pts <= 0) {
                    clearInterval(timer);
                    this.props.player.off = this.state.off;
                    this.props.player.def = this.state.def;
                    this.props.player.pass = this.state.pass;
                    this.props.player.faceOff = this.state.faceOff;
                    this.props.player.positioning = this.state.positioning;
                    this.props.player.reflexes = this.state.reflexes;
                    this.props.player.calculateRating();
                    selectedTeam.trainingPoints= this.state.points;
                    this.props.player.trained = true;
                    const popTimer = setTimeout(function(){
                        Actions.pop();
                    }.bind(this), 400);
                }
            }
                .bind(this),
            200
        );
    }

    render() {
        return (
            <Background>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{this.state.player.positionString + ' #' + this.state.player.number + ' ' + this.state.player.name}</Text>
                </View>

                <View style={{ backgroundColor: 'rgba(255,255,255,0)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{'Training Points Remaining: ' + this.state.points}</Text>
                </View>

                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    <ListItem
                        title={'Offense: ' + this.state.off}
                        rightTitle={this.state.offGrowth >= 0 ? 'Growth: +' + this.state.offGrowth : 'Growth: ' + this.state.offGrowth}
                        rightTitleStyle={this.state.offGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        subtitle={'OFFENSE TRAINING'}
                        onPress={() => { this.train('off') }}

                    ></ListItem>
                    <ListItem
                        title={'Defense: ' + this.state.def}
                        rightTitle={this.state.defGrowth >= 0 ? 'Growth: +' + this.state.defGrowth : 'Growth: ' + this.state.defGrowth}
                        rightTitleStyle={this.state.defGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => {  this.train('def') }}
                        subtitle={'DEFENSE TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Pass: ' + this.state.pass}
                        rightTitle={this.state.passGrowth >= 0 ? 'Growth: +' + this.state.passGrowth : 'Growth: ' + this.state.passGrowth}
                        rightTitleStyle={this.state.passGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('pass') }}
                        subtitle={'PASSING TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Faceoff: ' + this.state.faceOff}
                        rightTitle={this.state.faceOffGrowth >= 0 ? 'Growth: +' + this.state.faceOffGrowth : 'Growth: ' + this.state.faceOffGrowth}
                        rightTitleStyle={this.state.faceOffGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('faceOff') }}
                        subtitle={'FACEOFF TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Positioning: ' + this.state.positioning}
                        rightTitle={this.state.positioningGrowth >= 0 ? 'Growth: +' + this.state.positioningGrowth : 'Growth: ' + this.state.positioningGrowth}
                        rightTitleStyle={this.state.positioningGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('positioning') }}
                        subtitle={'POSITIONING TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Reflexes: ' + this.state.reflexes}
                        rightTitle={this.state.reflexesGrowth >= 0 ? 'Growth: +' + this.state.reflexesGrowth : 'Growth: ' + this.state.reflexesGrowth}
                        rightTitleStyle={this.state.reflexesGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('reflexes') }}
                        subtitle={'REFLEX TRAINING'}

                    ></ListItem>

                </ScrollView>


            </Background>





        )
    }
}