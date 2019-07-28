import React from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Modal, Text } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { sortedRoster, collegeMode, releasePlayer, saveAsDraftClass, manageSaveName, selectedTeam } from '../data/script';
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
        rebGrowth: (this.props.player.reb - this.props.player.rebOld),
        threePointGrowth: (this.props.player.threePoint - this.props.player.threePointOld),
        ftGrowth: (this.props.player.ft - this.props.player.ftOld),
        off: this.props.player.off,
        def: this.props.player.def,
        reb: this.props.player.reb,
        threePoint: this.props.player.threePoint,
        ft: this.props.player.ft,
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
                if (attr === 'reb') {
                    if(this.state.reb>=99){
                        //nothing
                    }else{
                        this.setState({reb: this.state.reb+1, rebGrowth: this.state.rebGrowth+1});
                    }
                }
                if (attr === 'threePoint') {
                    if(this.state.threePoint>=99){

                    }else{
                        this.setState({threePoint: this.state.threePoint+1, threePointGrowth: this.state.threePointGrowth+1});
                    }
                }
                if (attr === 'ft') {
                    if(this.state.ft>=99){
                        //nothing
                    }else{
                    this.setState({ft: this.state.ft+1, ftGrowth: this.state.ftGrowth+1});
                }
            }

                pts--;

                if (pts <= 0) {
                    clearInterval(timer);
                    this.props.player.off = this.state.off;
                    this.props.player.def = this.state.def;
                    this.props.player.reb = this.state.reb;
                    this.props.player.threePoint = this.state.threePoint;
                    this.props.player.ft = this.state.ft;
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

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{this.state.player.positionString + ' #' + this.state.player.number + ' ' + this.state.player.name}</Text>
                </View>

                <View style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderBottomWidth: 1 }}>
                    <Text style={{ fontFamily: 'advent-pro', textAlign: 'center', fontSize: 20, padding: 20 }}>{'Training Points Remaining: ' + this.state.points}</Text>
                </View>

                <ScrollView>
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
                        title={'Rebound: ' + this.state.reb}
                        rightTitle={this.state.rebGrowth >= 0 ? 'Growth: +' + this.state.rebGrowth : 'Growth: ' + this.state.rebGrowth}
                        rightTitleStyle={this.state.rebGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('reb') }}
                        subtitle={'REBOUND TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Three Point: ' + this.state.threePoint}
                        rightTitle={this.state.threePointGrowth >= 0 ? 'Growth: +' + this.state.threePointGrowth : 'Growth: ' + this.state.threePointGrowth}
                        rightTitleStyle={this.state.threePointGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('threePoint') }}
                        subtitle={'THREE POINT TRAINING'}

                    ></ListItem>
                    <ListItem
                        title={'Free Throw: ' + this.state.ft}
                        rightTitle={this.state.ftGrowth >= 0 ? 'Growth: +' + this.state.ftGrowth : 'Growth: ' + this.state.ftGrowth}
                        rightTitleStyle={this.state.ftGrowth >= 0 ? { color: 'rgb(22,154,68)', fontFamily: 'advent-pro', fontSize: 18 } : { color: 'rgba(255,0,0,1)', fontFamily: 'advent-pro', fontSize: 18 }}
                        onPress={() => { this.train('ft') }}
                        subtitle={'FREE THROW TRAINING'}

                    ></ListItem>

                </ScrollView>


            </Background>





        )
    }
}