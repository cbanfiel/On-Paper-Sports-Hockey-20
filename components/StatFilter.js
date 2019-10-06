import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CachedImage from './CachedImage';

var {height, width} = Dimensions.get('window');



export default class StatFilter extends React.Component {

    state={
        selectedTeam: this.props.selectedTeam,
        roster:this.props.selectedTeam.roster,
    }

    setFilter(filter){
        let filteredArray = [];

        if(filter === 'points'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonGoals >0 || ply.seasonAssists >0 ){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if (a.seasonGoals + a.seasonAssists > b.seasonGoals + b.seasonAssists)
                return -1;
            if (a.seasonGoals + a.seasonAssists < b.seasonGoals + b.seasonAssists)
                return 1;
            return 0;
            })
        }


        if(filter === 'goals'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonGoals>0 ){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonGoals < b.seasonGoals){
                    return 1;
                }
                if(a.seasonGoals > b.seasonGoals){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'assists'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonAssists>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonAssists < b.seasonAssists){
                    return 1;
                }
                if(a.seasonAssists > b.seasonAssists){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'shots'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonShots>0){
                    filteredArray.push(ply);
                }
            }

            filteredArray.sort(function(a,b){
                if(a.seasonShots < b.seasonShots){
                    return 1;
                }
                if(a.seasonShots > b.seasonShots){
                    return -1;
                }
                return 0;
            })
        }

        if(filter === 'save'){
            for(let i=0; i<this.props.selectedTeam.roster.length; i++){
                let ply = this.props.selectedTeam.roster[i]
                if(ply.seasonSaves>0){
                    filteredArray.push(ply);
                }
            }
            
            
            filteredArray.sort(function(a,b){
                
                            let asave = Math.round((a.seasonSaves / (a.seasonSaves + a.seasonGoalsAllowed)) * 1000) / 10
                            let bsave = Math.round((b.seasonSaves / (b.seasonSaves + b.seasonGoalsAllowed)) * 1000) / 10
                if(asave < bsave){
                    return 1;
                }
                if(asave > bsave){
                    return -1;
                }
                return 0;
            })
        }

        while(filteredArray.length>=150){
            filteredArray.pop();
        }
        
        this.props.setStatFilter(filteredArray);
    }

    render() {
        return (
                <View style={{ backgroundColor: 'rgba(255,255,255,0)', height:50, width:width, flexDirection:'row', justifyContent:'center', alignItems:'center', display:'flex'}}>

<TouchableOpacity  onPress={() => this.setFilter('points')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Points</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this.setFilter('goals')} style={{flex:1}}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Goals</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('assists')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Assists</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('shots')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Shots</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1}} onPress={() => this.setFilter('save')}>
                        <View style={{backgroundColor:'rgb(30,30,30)', height:'100%', justifyContent:'center'}}>
                        <Text style={{ fontFamily: 'advent-pro' , fontSize:16, color:'white', textAlign: 'center' }}>Save%</Text>
                        </View>
                    </TouchableOpacity>


                    </View>
               
        )
    }
}

