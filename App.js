import React from 'react';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import MainMenu from './scenes/MainMenu';
import SelectTeams from './scenes/SelectTeams';
import TeamList from './scenes/TeamList'
import InGame from './scenes/InGame';
import StatsList from './scenes/StatsList';
import RosterList from './scenes/RosterList';
import SeasonMenu from './scenes/SeasonMenu';
import ScheduleView from './scenes/ScheduleView';
import Standings from './scenes/Standings';
import TradeMenu from './scenes/TradeMenu';
import RosterMenu from './scenes/RosterMenu';
import GameStats from './scenes/GameStats';
import PlayerProfile from './scenes/PlayerProfile';
import EditPlayerRatings from './scenes/EditPlayerRatings';
import EditPlayerInfo from './scenes/EditPlayerInfo';
import SignPlayerMenu from './scenes/SignPlayerMenu';
import OfferContractMenu from './scenes/OfferContractMenu';
import DraftClassMenu from './scenes/DraftClassMenu';
import DraftMenu from './scenes/DraftMenu';
import OptionsMenu from './scenes/OptionsMenu';
import ConferenceList from './scenes/ConferenceList';
import PlayoffMenu from './scenes/PlayoffMenu';
import SlidersMenu from './scenes/SlidersMenu';
import TeamHistory from './scenes/TeamHistory';
import SeasonStatsMenu from './scenes/SeasonStatsMenu';
import SeasonRosterMenu from './scenes/SeasonRosterMenu';
import CreateTeamMenu from './scenes/CreateTeamMenu';
import CreateAPlayerMenu from './scenes/CreateAPlayerMenu';
import TeamStats from './scenes/TeamStats';
import EditLineupMenu from './scenes/EditLineupMenu';
import EditTeam from './scenes/EditTeam';
import SavesMenu from './scenes/SavesMenu';
import ImportExportMenu from './scenes/ImportExportMenu';
import CommunityRosters from './scenes/CommunityRosters';
import InGameStats from './scenes/InGameStats';
import LastPlay from './scenes/LastPlay';
import PlayerStatsHistory from './scenes/PlayerStatsHistory';
import CoachSettings from './scenes/CoachSettings';
import PlayerRoleMenu from './scenes/PlayerRoleMenu';
import ResigningStage from './scenes/ResigningStage';
import RetirementStage from './scenes/RetirementStage';
import FreeAgencyStage from './scenes/FreeAgencyStage';
import RecoveryMenu from './scenes/RecoveryMenu';
import RecentUpdates from './scenes/RecentUpdates';
import PlayerSearch from './scenes/PlayerSearch';
import TrainingStage from './scenes/TrainingStage';
import TrainingScreen from './scenes/TrainingScreen';


export default class App extends React.Component {
  


  render() {
    return (
          
          <Router>
            <Stack key="root">
              <Scene key="mainmenu" component={MainMenu} title="MainMenu" initial hideNavBar />
              <Scene key="selectteams" component={SelectTeams} title="SelectTeams" hideNavBar />
              <Scene key="teamlist" component={TeamList} title="Teamlist" hideNavBar />
              <Scene key="ingame" component={InGame} title="Teamlist" hideNavBar />
              <Scene key="statslist" component={StatsList} title="Statslist" hideNavBar />
              <Scene key="rosterlist" component={RosterList} title="Rosterlist" hideNavBar />
              <Scene key="seasonmenu" component={SeasonMenu} title="Rosterlist" hideNavBar />
              <Scene key="scheduleview" component={ScheduleView} title="Rosterlist" hideNavBar />
              <Scene key="standings" component={Standings} title="Rosterlist" hideNavBar />
              <Scene key="trademenu" component={TradeMenu} title="TradeMenu" hideNavBar />
              <Scene key="rostermenu" component={RosterMenu} title="RosterMenu" hideNavBar />
              <Scene key="gamestats" component={GameStats} title="GameStats" hideNavBar />
              <Scene key="gamestats" component={GameStats} title="GameStats" hideNavBar />
              <Scene key="playerprofile" component={PlayerProfile} title="PlayeProfile" hideNavBar />
              <Scene key="editplayerratings" component={EditPlayerRatings} title="EditPlayer" hideNavBar />
              <Scene key="editplayerinfo" component={EditPlayerInfo} title="EditPlayerInfo" hideNavBar />
              <Scene key="signplayermenu" component={SignPlayerMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="offercontractmenu" component={OfferContractMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="draftclassmenu" component={DraftClassMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="draftmenu" component={DraftMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="optionsmenu" component={OptionsMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="conferencelist" component={ConferenceList} title="EditPlayerInfo" hideNavBar />
              <Scene key="playoffmenu" component={PlayoffMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="slidersmenu" component={SlidersMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="teamhistory" component={TeamHistory} title="EditPlayerInfo" hideNavBar />
              <Scene key="seasonstatsmenu" component={SeasonStatsMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="seasonrostermenu" component={SeasonRosterMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="createteammenu" component={CreateTeamMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="createaplayermenu" component={CreateAPlayerMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="teamstats" component={TeamStats} title="EditPlayerInfo" hideNavBar />
              <Scene key="editlineupmenu" component={EditLineupMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="editteam" component={EditTeam} title="EditPlayerInfo" hideNavBar />
              <Scene key="savesmenu" component={SavesMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="importexportmenu" component={ImportExportMenu} title="EditPlayerInfo" hideNavBar />
              <Scene key="communityrosters" component={CommunityRosters} title="EditPlayerInfo" hideNavBar />
              <Scene key="ingamestats" component={InGameStats} title="EditPlayerInfo" hideNavBar />
              <Scene key="lastplay" component={LastPlay} title="EditPlayerInfo" hideNavBar />
              <Scene key="playerstatshistory" component={PlayerStatsHistory} title="PlayerStatsHistory" hideNavBar />
              <Scene key="coachsettings" component={CoachSettings} title="CoachSettings" hideNavBar />
              <Scene key="playerrolemenu" component={PlayerRoleMenu} title="PlayerRoleMenu" hideNavBar />
              <Scene key="resigningstage" component={ResigningStage} title="ResigningStage" hideNavBar />
              <Scene key="retirementstage" component={RetirementStage} title="Retirements" hideNavBar />
              <Scene key="freeagencystage" component={FreeAgencyStage} title="FreeAgency" hideNavBar />
              <Scene key="recentupdates" component={RecentUpdates} title="Reccent Updates" hideNavBar />
              <Scene key="playersearch" component={PlayerSearch} title="Reccent Updates" hideNavBar />
              <Scene key="trainingstage" component={TrainingStage} title="Training Stage" hideNavBar />
              <Scene key="trainingscreen" component={TrainingScreen} title="Training Stage" hideNavBar />
              {/* <Scene key="recoverymenu" component={RecoveryMenu} title="FreeAgency" hideNavBar /> */}

              


















              




              

        </Stack>
        </Router>
    );
  }
}

