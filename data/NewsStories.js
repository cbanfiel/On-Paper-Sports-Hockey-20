export class News {
  constructor() {
    this.newsStories = [];
  }

  addPreseasonTopPlayerStory(player) {
    let titles = [
      `Can ${player.name} lead the ${player.teamName} to greatness?`,
      `Looking at ${player.name}'s upcoming season`,
    ];
    let stories = [
      `Fans around the league are expecting a lot from ${player.name} this upcoming season`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };
    this.newsStories.unshift(story);
  }

  addPreseasonTopTeamStory(team) {
    let titles = [
      `The ${team.name} are favored to come out on top this year`,
      `Why the ${team.name} are leading the pack out of the gates`,
      `What to expect from the ${team.name} this year`,
      `The ${team.name} are championship favorites`,
      `Why the ${team.name} are championship favorites`,
    ];
    let stories = [
      `Why our expert makers our picking the ${team.name} to come out on top this year`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
    };
    this.newsStories.unshift(story);
  }

  // addPreseasonRandomPlayerStory(player) {
  //   let titles = [
  //     `After his arrest in the offseason ${player.positionString} ${player.name} is looking to make a change`,
  //     `Struggling through the loss of his mother ${player.positionString} ${player.name} is looking to honor her this upcoming season`,
  //   ];
  //   let stories = [
  //     `${player.name} has spoken with reporters on what fans should expect from him this season`,
  //   ];
  //   let story = {
  //     title: titles[Math.floor(Math.random() * titles.length)],
  //     story: stories[Math.floor(Math.random() * stories.length)],
  //     image1: player.faceSrc,
  //     image2: player.teamLogoSrc,
  //   };

  //   this.newsStories.unshift(story);
  // }

  addRandomPlayerStory(player) {
      let ply = `${player.positionString} ${player.name}`;
    let titles = [
        `${ply} frustrated with coaching staff`,
        `video of ${ply} playing with dolls surfaces`,
        `${ply} opens up about his weight gain`,
        `${ply} jokes with reporters`,
        `${ply} apoligizes for offensive joke`,
        `${ply} talks about what motivates him`,

    ];
    let stories = [
      `${player.name} speaks with various reporters`,
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };

    this.newsStories.unshift(story);
  }

  addTopFreeAgentStory(player) {
    let titles = [
      `Where will ${player.name} land?`,
      `The hunt to sign ${player.name}`,
      `Who will sign ${player.name}?`,
      `The chase for ${player.name}`,
    ];
    let stories = [
      [
        `The ${player.teamName} star ${player.positionString} is expected to land a big salary this offseason.`,
      ],
    ];
    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
      image2: player.teamLogoSrc,
    };
    this.newsStories.unshift(story);
  }

  addGameOfTheWeekStory(game) {
    let titles = [`OPS Game of the week`];

    let stories = [
      `The ${game.team1.name} face off against the ${game.team2.name}`,
    ];

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: game.team1.logoSrc,
      image2: game.team2.logoSrc,
    };

    this.newsStories.unshift(story);
  }

  addSignPlayerStory(team, player) {
    let titles = [`${player.name} signs with the ${team.name}`];

    let stories = [
      `The ${team.name} feel confident in there signing of ${player.positionString} ${player.name}`,
      `The ${team.name} are happy with there signing of ${player.positionString} ${player.name}`
    ];

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
      image2: player.faceSrc,
    };

    this.newsStories.unshift(story);
  }

  addTradeStory(p1, p2, t1, t2, best) {

    let p1str = `${p1.positionString} ${p1.name}`
    let p2str = `${p2.positionString} ${p2.name}`
    let image1 = best.faceSrc;
    let image2 = best.teamLogoSrc;

    if(p1.isPick){
        p1str = `a ${ordinal_suffix_of(p1.round)} round pick`
    }

    if(p2.isPick){
        p2str = `a ${ordinal_suffix_of(p2.round)} round pick`
    }

    let titles = [`Trade Alert: The ${t1.name} and the ${t2.name} make deal`];

    let stories = [`${t1.name} sends ${p1str} to the ${t2.name} for ${p2str}`];


    if(best.isPick){
        image1 = t1.logoSrc;
        image2 = t2.logoSrc;
    }

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1,
      image2
    };

    this.newsStories.unshift(story);
  }

  addOvertimeNewsStory(t1, t2, t1Score, t2Score) {

    let winner = t1Score > t2Score ? t1.name : t2.name;
    let loser = t1Score > t2Score ? t2.name : t1.name;
    let winScore = t1Score > t2Score ? t1Score : t2Score;
    let loseScore = t1Score > t2Score ? t2Score : t1Score;

    let titles = [
        `Overtime Thriller!`,
        `Game Heads Into Overtime`,
        `What A Game`,
        `Overtime Classic`,
        `Close One!`

];

    let stories = [
      `The ${winner} beat the ${loser} in overtime ${winScore}-${loseScore}`,
    ];

    let story = {
        title: titles[Math.floor(Math.random() * titles.length)],
        story: stories[Math.floor(Math.random() * stories.length)],
        image1: t1.logoSrc,
        image2: t2.logoSrc
      };
  
      this.newsStories.unshift(story);
  }

  addEndOfSeasonPlayoffStory(team, player){
    let titles =[
      `${player.name} hopes to lead the ${team.name} to a title`
    ];

    let stories = [
      `the ${team.name} have a huge chance to win it all this year`
    ]

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
      image2: player.faceSrc
    };
    this.newsStories.unshift(story);
  }

  addTopTeamLossStory(team, opp, teamScore, oppScore){
    //college
    let titles =[
      `The #${team.seed} ${team.name} fall to the ${opp.seed > 25 ? '' : '#' + opp.seed + ' '}${opp.name}`
    ];

    let stories = [
      `The ${team.name} lose ${oppScore}-${teamScore} to the ${opp.name}`
    ]

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: team.logoSrc,
      image2: opp.logoSrc
    };
    this.newsStories.unshift(story);
  }

  addPlayerOfTheYearStory(player){
    let titles = [
      `${player.positionString} ${player.name} wins player of the year!`
    ]

    let stories =[
      `after an astounding year ${player.name} will bring home the player of the year trophy`
    ]

    let story = {
      title: titles[Math.floor(Math.random() * titles.length)],
      story: stories[Math.floor(Math.random() * stories.length)],
      image1: player.faceSrc,
    };
    this.newsStories.unshift(story);

  }


}


function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}