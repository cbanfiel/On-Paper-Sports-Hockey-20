export const portraits = require('./CoachPortraits.json');

const draftData = require("./JSON/DraftData.json");

export let coachRetirements = [];
export let availableCoaches = [];

export class Coach {
    constructor() {
        let firstName = draftData[Math.floor(Math.random() * draftData.length)].firstname;
        let lastName = draftData[Math.floor(Math.random() * draftData.length)].lastname;
        this.offenseRating = Math.floor(Math.random() * 20) + 65;
        this.defenseRating = Math.floor(Math.random() * 20) + 65;
        this.signingInterest = Math.floor(Math.random() * 20) + 65;
        this.training = Math.floor(Math.random() * 20) + 65;
        this.trading = Math.floor(Math.random() * 20) + 65;
        this.name = firstName + " " + lastName;
        this.faceSrc = portraits[Math.floor(Math.random() * portraits.length)];
        this.teamLogoSrc;
        this.years = Math.round(Math.random() * 4) + 1;
        this.salary = (Math.round(Math.random() * 9) + 1) * 1000000;
        this.age = (Math.round(Math.random() * 20) + 45);
        //Coach Sliders
        this.offVsDefFocus = Math.round(Math.random() * 6) - 3;
        this.qualityVsQuantity = Math.round(Math.random() * 6) - 3;
        this.defenseAggresiveVsConservative = Math.round(Math.random() * 6) - 3;
        this.forwardsVsDefensemen = Math.round(Math.random() * 6) - 3;
        this.freezeThePuckVsPlayThePuck = Math.round(Math.random() * 6) - 3;
        
        this.rating = 75;
        this.teamName = '';
        this.contractExpired = false;
        this.retired = false;
        this.history = [];
        this.calculateRating();
    }

    calculateRating() {
        if(this.offenseRating>99){
            this.offenseRating = 99;
        }
        if(this.offenseRating<40){
            this.offenseRating = 40;
        }
        if(this.defenseRating>99){
            this.defenseRating = 99;
        }
        if(this.defenseRating<40){
            this.defenseRating = 40;
        }
        if(this.training>99){
            this.training = 99;
        }
        if(this.training<40){
            this.training = 40;
        }
        if(this.trading>99){
            this.trading = 99;
        }
        if(this.trading<40){
            this.trading = 40;
        }
        if(this.signingInterest>99){
            this.signingInterest = 99;
        }
        if(this.signingInterest<40){
            this.signingInterest = 40;
        }
        this.rating = Math.round((this.offenseRating + this.defenseRating + this.signingInterest + this.training) / 4);
    }

    generateRatings(rating) {
        let diff = rating - this.rating;
        let change = 1;
        if(diff < 0){
            change = -1;
        }
        while(this.rating != rating){
            this.offenseRating += change;
            this.defenseRating += change;
            this.trading += change;
            this.training += change;
            this.signingInterest += change;
            this.calculateRating();
            if(change > 0 && this.rating >= rating){
                return;
            }
            if(change < 0 && this.rating <= rating){
                return;
            }

        }


    }
}

export function coachSetup(teams){
    generateFreeAgentCoaches(teams);

}

const saveCoachHistory = (coach, team) =>{
    coach.history.push({wins: team.wins, losses: team.losses, otLosses:team.otLosses, logoSrc: team.logoSrc, name: team.name});
}

export function coachOffseasonSetup(teams){

    coachRetirements = [];

    for(let i=0; i<teams.length; i++){
        teams[i].coachingBudget = scaleBetween(teams[i].seed, 900000, 11000000, teams.length, 1);
        saveCoachHistory(teams[i].coach, teams[i]);

        coachProgression(teams[i].coach);
        if(didCoachRetire(teams[i].coach)){
            teams[i].coach = null;
        }else if(checkCoachContractExpiration(teams[i].coach)){
            teams[i].coach.contractExpired = true;
        }
        else{
            teams[i].coachingBudget -= teams[i].coach.salary;
        }
    }

    for(let i=0; i<availableCoaches.length; i++){
        //NO PROGRESSION FOR FA COACHES!
        //this fixes aging bug
        if(!availableCoaches[i].contractExpired){
            if(didCoachRetire(availableCoaches[i])){
                availableCoaches.splice(availableCoaches.indexOf(availableCoaches[i]),1);
                let coach = new Coach();
                coach.salary = coachSalaryCalculation(coach);
                availableCoaches.push(coach);
            }
        }
    }

    if(availableCoaches.length < (teams.length/2)){
        generateFreeAgentCoaches(teams);
    }
}

const coachResigning = (teams) => {


    for(let i=0; i<teams.length; i++){

        if(teams[i].coach){
            if(teams[i].coach.contractExpired){
                let rand = Math.random()*125;
                let winPer = ((teams[i].wins/(teams[i].wins + teams[i].losses))*100);
                // console.log(`winper${winPer} rand${rand}`)
        
            if(rand < winPer && teams[i].coach != null){
                let coach = teams[i].coach;
                if(coachRetirements.includes(coach)){
                    console.log('resigning');
                }
                coach.teamLogoSrc = teams[i].logoSrc;
                coach.teamName = teams[i].name;
                coach.contractExpired = false;
                // coach.years = years;
                teams[i].coach = coach;
                availableCoaches.splice(availableCoaches.indexOf(coach), 1);
                // console.log(coach.name + " OVR:" + coach.rating + " RESIGNS with the " + teams[i].name);
            }else{
                teams[i].coach = null;
            }

        }

    }
}
}

const resetContractExpiredFlag = (teams) => {
    for(let i=0; i<availableCoaches.length; i++){
        availableCoaches[i].contractExpired = false;
    }
    for(let i=0; i<teams.length; i++){
        teams[i].coach.contractExpired = false;
    }
}

export function coachSigning(teams){
    teams.sort(function (a, b) {
        if (a.seed < b.seed) return -1;
        if (a.seed > b.seed) return 1;
        return 0;
      });

      availableCoaches.sort(function (a, b) {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }});

        coachResigning(teams);
    
    for(let i=0; i<teams.length; i++){
        if(teams[i].coach == null){
            let index = Math.floor(Math.random()*4);
            if(index > availableCoaches.length-1){
                index = 0;
            }
            // let years = Math.round(Math.random()*5)+1;
            let coach = availableCoaches[index];
            if(coachRetirements.includes(coach)){
                console.log('signing');
            }
            // console.log(coach.name + " OVR:" + coach.rating + " signs with the " + teams[i].name);
            coach.teamLogoSrc = teams[i].logoSrc;
            coach.teamName = teams[i].name;
            coach.contractExpired = false;
            // coach.years = years;
            teams[i].coach = coach;
            availableCoaches.splice(index, 1);
        }
    }

    resetContractExpiredFlag(teams);
}

const coachProgression = (coach) => {
    let growth = scaleBetween(coach.age, -4,4,80,40);
    coach.offenseRating += Math.round(Math.random()*growth);
    coach.defenseRating += Math.round(Math.random()*growth);
    coach.trading += Math.round(Math.random()*growth);
    coach.training += Math.round(Math.random()*growth);
    coach.signingInterest += Math.round(Math.random()*growth);
    coach.calculateRating();
}

const coachSalaryCalculation = (coach) =>{
    let sal = Math.round(scaleBetween(coach.rating, 700000,10000000,55,90));
    if(sal < 700000){
        sal = 700000;
    }
    if(sal > 10000000){
        sal = 10000000;
    }
    return sal;
}

function generateFreeAgentCoaches(teams){
    for(let i=0; i<teams.length/2; i++){
      let coach = new Coach();
      let rating = 40;
      rating += Math.round(Math.random()*30);
      coach.generateRatings(rating);
      coach.years = Math.floor(Math.random()*4) + 3;
      coach.salary = coachSalaryCalculation(coach);
      availableCoaches.push(coach);
    }
  }


const didCoachRetire = (coach) =>{
    coach.age++;
    if(coach.age >= 59){
        let retirementChance = scaleBetween(coach.age, 10, 70, 59,80);
        if(retirementChance > Math.random()*100){
            coachRetirements.push(coach);
            coach.retired = true;
            return true;
        }
        return false;
    }
}

const releaseCoach = (coach) =>{
    coach.teamLogoSrc = null;
    coach.teamName = '';
    coach.years = Math.floor(Math.random()*4) + 3;
    coach.salary = coachSalaryCalculation(coach);
    availableCoaches.push(coach);
  
}

export const canSignCoach = (coach, team) =>{
    return (coach.salary <= team.coachingBudget);
}

const checkCoachContractExpiration = (coach) => {
    coach.years--;
    if(coach.years < 1){
        releaseCoach(coach);
        return true;
    }else{
        return false
    }
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (
      ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
    );
  }

  export const loadAvailableCoaches = (load) => {
      availableCoaches = [];
      for(let i=0; i<load.length; i++){
          let coach = Object.assign(new Coach, load[i]);
          availableCoaches.push(coach);
      }
  }