import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Card, Slider, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Background from '../components/background';
import { setSliders, setFranchiseSliders, twoPointPercentageLow, twoPointPercentageHigh, threePointPercentageHigh, defenseHigh, defenseLow, secondsOffClock, threePointPercentageLow, conferences, gamesPerSeason, playoffSeeds, seriesWinCount, conferencesOn, teams, franchise, collegeMode, difficulty, tradeThreshold, resetSliders, collegeSliderPreset, reboundSlider, trainingPointsAvailable } from '../data/script';

export default class SlidersMenu extends React.Component {

    state = {
        twopl: twoPointPercentageLow,
        twoph: twoPointPercentageHigh,
        threepl: threePointPercentageLow,
        threeph: threePointPercentageHigh,
        defh: defenseHigh,
        defl: defenseLow,
        soc: secondsOffClock,
        games: gamesPerSeason,
        seeds: playoffSeeds,
        gamesToWin: seriesWinCount,
        conferencesOn: conferencesOn,
        maxSeeds: this.getMaxSeeds(),
        seedSelection: this.getMaxSeeds(),
        collegeMode: collegeMode,
        difficulty: difficulty,
        tradeDifficulty : tradeThreshold,
        reboundSlider: reboundSlider,
        trainingPointsAvailable: trainingPointsAvailable
    }


    checkGameSliders() {
        if (this.state.twopl != twoPointPercentageLow) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.twoph != twoPointPercentageHigh) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.threepl != threePointPercentageLow) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.threeph != threePointPercentageHigh) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.defl != defenseLow) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.defh != defenseHigh) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.soc != secondsOffClock) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.difficulty != difficulty) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.reboundSlider != reboundSlider) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (this.state.trainingPointsAvailable != trainingPointsAvailable) {
            this.setState({ gameSlidersChanged: true });
            return;
        }
        if (Math.round(this.state.tradeDifficulty*100) != Math.round(tradeThreshold*100)) {
            this.setState({ gameSlidersChanged: true });
            return;
        }

        this.setState({ gameSlidersChanged: false });
    }

    checkFranchiseSliders() {
        const timer = setTimeout(
            function () {
                if (this.state.games != gamesPerSeason) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.seeds != playoffSeeds) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.gamesToWin != seriesWinCount) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.conferencesOn != conferencesOn) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }
                if (this.state.collegeMode != collegeMode) {
                    this.setState({ franchiseSlidersChanged: true });
                    return;
                }

                this.setState({ franchiseSlidersChanged: false });
                clearTimeout(timer);
            }
                .bind(this),
            20
        );



    }

    difficultyString(value) {
        if (value === 2) {
            return "MVP"
        }
        if (value === 1) {
            return "Superstar"
        }
        if (value === 0) {
            return "All-Star"
        }
        if (value === -1) {
            return "Pro"
        }
        if (value === -2) {
            return "Rookie"
        }
    }

    playoffSeeds(value) {
        if (value === 0) {
            this.setState({ seeds: 1 });
        } else if (value === 1) {
            this.setState({ seeds: 2 });
        }
        else if (value === 2) {
            this.setState({ seeds: 4 });
        }
        else if (value === 3) {
            this.setState({ seeds: 8 });
        } else if (value === 4) {
            this.setState({ seeds: 16 });
        }
        else if (value === 5) {
            this.setState({ seeds: 32 });
        }
        else if (value === 6) {
            this.setState({ seeds: 64 });
        }
    }
    updateMaxSeeds(confOn) {

        if (confOn === false) {
            if (teams.length >= 64) {
                return 6;
            } else if (teams.length >= 32) {
                return 5;
            }
            else if (teams.length >= 16) {
                return 4;
            } else if (teams.length >= 8) {
                return 3;
            }
            else if (teams.length >= 4) {
                return 2;
            }
            else if (teams.length >= 2) {
                return 1;
            }
            else if (teams.length >= 1) {
                return 0;
            }
        } else {
            return this.getMaxSeeds();
        }

    }

    getMaxSeeds() {
        if (conferences[0].teams.length <= conferences[1].teams.length) {
            if (conferences[0].teams.length >= 64) {
                return 6;
            }
            else if (conferences[0].teams.length >= 32) {
                return 5;
            } else if (conferences[0].teams.length >= 16) {
                return 4;
            } else if (conferences[0].teams.length >= 8) {
                return 3;
            }
            else if (conferences[0].teams.length >= 4) {
                return 2;
            }
            else if (conferences[0].teams.length >= 2) {
                return 1;
            }
            else if (conferences[0].teams.length >= 1) {
                return 0;
            }
        }
        else if (conferences[0].teams.length >= conferences[1].teams.length) {
            if (conferences[1].teams.length >= 64) {
                return 6;
            }
            else if (conferences[1].teams.length >= 32) {
                return 5;
            } else if (conferences[1].teams.length >= 16) {
                return 4;
            } else if (conferences[1].teams.length >= 8) {
                return 3;
            }
            else if (conferences[1].teams.length >= 4) {
                return 2;
            }
            else if (conferences[1].teams.length >= 2) {
                return 1;
            }
            else if (conferences[1].teams.length >= 1) {
                return 0;
            }
        }
    }


    saveChanges() {
        setSliders(this.state.twopl, this.state.twoph, this.state.threepl, this.state.threeph, this.state.defl, this.state.defh, this.state.soc, this.state.difficulty, this.state.tradeDifficulty, this.state.reboundSlider, this.state.trainingPointsAvailable);
        this.setState({ gameSlidersChanged: false });
    }

    saveFranchiseChanges() {

        if(teams.length % 2 == 0 ){
            if(teams.length >= 4){
                Alert.alert(
                    'THESE CHANGES WILL RESTART YOUR FRANCHISE',
                    'This will overwrite your current franchise and implement the selected changes in a new one, the roster will remain the same but progress in the franchise will be reset',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        setFranchiseSliders(this.state.games, this.state.seeds, this.state.gamesToWin, this.state.conferencesOn, this.state.collegeMode);
                        this.setState({ franchiseSlidersChanged: false });}},
                    ],
                    {cancelable: true},
                  );

            }else{
              Alert.alert('LESS THAN 4 TEAMS','Currently for franchise mode you must have at least 4 teams' );
      
            }
          }else{
          Alert.alert('UNEVEN NUMBER OF TEAMS','Currently for franchise mode you must have an even number of teams, create another team or remove a team to start!' );
          }
    }

    resetSliders(){
        resetSliders();
        this.setState({
            twopl: twoPointPercentageLow,
            twoph: twoPointPercentageHigh,
            threepl: threePointPercentageLow,
            threeph: threePointPercentageHigh,
            defh: defenseHigh,
            defl: defenseLow,
            soc: secondsOffClock,
            games: gamesPerSeason,
            seeds: playoffSeeds,
            gamesToWin: seriesWinCount,
            conferencesOn: conferencesOn,
            maxSeeds: this.getMaxSeeds(),
            seedSelection: this.getMaxSeeds(),
            collegeMode: collegeMode,
            difficulty: difficulty,
            tradeDifficulty : tradeThreshold,
            reboundSlider: reboundSlider,
            trainingPointsAvailable: trainingPointsAvailable,
            franchiseSlidersChanged: false,
            gameSlidersChanged: false
        });
    }

    collegeSliders(){
        collegeSliderPreset();
        this.setState({
            twopl: twoPointPercentageLow,
            twoph: twoPointPercentageHigh,
            threepl: threePointPercentageLow,
            threeph: threePointPercentageHigh,
            defh: defenseHigh,
            defl: defenseLow,
            soc: secondsOffClock,
            games: gamesPerSeason,
            seeds: playoffSeeds,
            gamesToWin: seriesWinCount,
            conferencesOn: conferencesOn,
            maxSeeds: this.getMaxSeeds(),
            seedSelection: this.getMaxSeeds(),
            collegeMode: collegeMode,
            difficulty: difficulty,
            tradeDifficulty : tradeThreshold, 
            reboundSlider: reboundSlider,
            trainingPointsAvailable: trainingPointsAvailable,
            franchiseSlidersChanged: false,
            gameSlidersChanged: false
        });
    }

    render() {
        return (
            <Background>
                <ScrollView >

                <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                            alignSelf:'center',
                        }} >
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro', marginBottom:10}}>Slider Presets</Text>
                            <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.resetSliders()}}>
                            <View style={{ borderRightWidth:1, borderColor:'white'}}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>Pro</Text>
                            </View>


                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.collegeSliders()}}>
                                <View>
                                <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>College</Text>
                                    </View>

                            
                        </TouchableOpacity>
                        </View>

                    </Card>


                    <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Game Sliders'}</Text>
                        </View>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Difficulty: " + this.difficultyString(this.state.difficulty)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-2}
                            maximumValue={2}
                            value={this.state.difficulty}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ difficulty: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Average Possesion Time: " + this.state.soc +" Seconds"}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={35}
                            value={this.state.soc}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ soc: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Trade Difficulty: " + Math.floor(this.state.tradeDifficulty * 100)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={0.05}
                            minimumValue={-1}
                            maximumValue={1}
                            value={this.state.tradeDifficulty}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ tradeDifficulty: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Two Point Percentage Low: " + this.state.twopl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.twopl}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ twopl: value }) }}
                        />



                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Two Point Percentage High: " + this.state.twoph}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.twoph}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ twoph: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Three Point Percentage Low: " + this.state.threepl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.threepl}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ threepl: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Three Point Percentage High: " + this.state.threeph}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.threeph}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ threeph: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Defense Low: " + this.state.defl}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.defl}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ defl: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Defense High: " + this.state.defh}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={-20}
                            maximumValue={80}
                            value={this.state.defh}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ defh: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Rebounding: " + this.state.reboundSlider}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={100}
                            value={this.state.reboundSlider}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ reboundSlider: value }) }}
                        />
                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Training Points Available: " + this.state.trainingPointsAvailable}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={0}
                            maximumValue={5}
                            value={this.state.trainingPointsAvailable}
                            onValueChange={value => { this.checkGameSliders(), this.setState({ trainingPointsAvailable: value }) }}
                        />






                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25 }} title={this.state.gameSlidersChanged ? "Commit Game Slider Changes" : "Current"} disabled={this.state.gameSlidersChanged ? false : true} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }} disabledTitleStyle={{ color: 'white' }} onPress={() => { this.saveChanges() }}></Button>

                    </Card>

                    <Card
                        containerStyle={{
                            width: '90%', backgroundColor: 'rgba(0,0,0,0.75)',
                            borderRadius: 25,
                            alignSelf:'center'
                        }} >

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{'Franchise Sliders'}</Text>
                            <Text style={{ textAlign: "center", fontSize: 14, color: 'white', fontFamily: 'advent-pro' }}>{'Note: Modyfying these sliders will require a new franchise to be started, The franchise you are currently in will be restarted.'}</Text>

                        </View>
                        <Divider style={{ backgroundColor: 'white', margin: 10 }}></Divider>

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Season Games: " + this.state.games}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={2}
                            maximumValue={82}
                            value={this.state.games}
                            onValueChange={value => { this.checkFranchiseSliders(), this.setState({ games: value }) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Playoff Seeds: " + this.state.seeds}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={this.state.maxSeeds}
                            value={this.state.seedSelection}
                            onValueChange={value => { this.checkFranchiseSliders(), this.playoffSeeds(value) }}
                        />

                        <Text style={{ textAlign: "center", fontSize: 20, color: 'white', fontFamily: 'advent-pro' }}>{"Series Length: Best Of " + (this.state.gamesToWin + this.state.gamesToWin - 1)}</Text>
                        <Slider
                            thumbTintColor={'rgb(180,180,180)'}
                            maximumTrackTintColor={'rgb(180,180,180)'}
                            step={1}
                            minimumValue={1}
                            maximumValue={4}
                            value={this.state.gamesToWin}
                            onValueChange={value => { this.checkFranchiseSliders(), this.setState({ gamesToWin: value }) }}
                        />

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', marginBottom: 10, borderWidth: 1, borderRadius: 25 }} title={this.state.conferencesOn ? 'Conferences: ON' : 'Conferences: OFF'} onPress={() => { this.checkFranchiseSliders(), this.setState({ maxSeeds: this.updateMaxSeeds(!this.state.conferencesOn), seedSelection: this.updateMaxSeeds(!this.state.conferencesOn), conferencesOn: !this.state.conferencesOn }), this.playoffSeeds(this.updateMaxSeeds(!this.state.conferencesOn)) }}></Button>

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25, marginBottom: 10 }} title={this.state.collegeMode ? 'Offseason Type: College' : 'Offseason Type: Pro'} onPress={() => { this.setState({ collegeMode: !this.state.collegeMode }), this.checkFranchiseSliders() }}></Button>

                        <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(255,0,0,0.75)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25 }} title={this.state.franchiseSlidersChanged ? "Commit Franchise Slider Changes" : "Current"} disabled={this.state.franchiseSlidersChanged ? false : true} disabledStyle={{ backgroundColor: 'rgba(10,200,60,0.75)' }} disabledTitleStyle={{ color: 'white' }} onPress={() => { this.saveFranchiseChanges() }}></Button>


                    </Card>



                    <Button titleStyle={{ fontFamily: 'advent-pro' }} buttonStyle={{ backgroundColor: 'rgba(0,0,0,0.75)', borderColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderRadius: 25, width:'90%', marginTop:10, alignSelf:'center', marginBottom:10 }} title={"Reset To Default Sliders"} onPress={() => { this.resetSliders() }}></Button>

                </ScrollView>
            </Background>





        )
    }
}

