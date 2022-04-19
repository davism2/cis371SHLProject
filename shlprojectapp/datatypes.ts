// Define the type PlayerStats to match the JSON structure from https://index.simulationhockey.com/api/v1/players/stats
type PlayerStats = {
  id: number;
  name: string;
  position: string;
  league: number;
  team: string;
  season: number;
  gamesPlayed: number;
  timeOnIce: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  ppGoals: number;
  ppAssists: number;
  ppPoints: number;
  ppTimeOnIce: number;
  shGoals: number;
  shAssists: number;
  shPoints: number;
  shTimeOnIce: number;
  fights: number;
  fightWins: number;
  fightLosses: number;
  hits: number;
  giveaways: number;
  takeaways: number;
  shotsBlocked: number;
  shotsOnGoal: number;
  gameRating: number;
  offensiveGameRating: number;
  devensiveGameRating: number;
};

// Define the type User to match the JSON structure from https://index.simulationhockey.com/api/v1/players/ratings
type PlayerAttributes = {
  id: number;
  league: number;
  season: number;
  name: string;
  screening: number;
  gettingOpen: number;
  passing: number;
  shootingAccuracy: number;
  shootingRange: number;
  offensiveRead: number;
  checking: number;
  hitting: number;
  positioning: number;
  stickchecking: number;
  faceoffs: number;
  defensiveRead: number;
  agility: number;
  balance: number;
  speed: number;
  stamina: number;
  strength: number;
  fighting: number;
  aggression: number;
  bravery: number;
  determination: number;
  leadership: number;
  temperament: number;
  professionalism: number;
};

type TeamStats = {
  position: number;
  id: number;
  name: string;
  location: string;
  abbreviation: string;
  gp: number;
  wins: number;
  losses: number;
  OTL: number;
  points: number;
  winPercent: string;
  ROW: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDiff: number;
  home: {
    wins: number;
    losses: number;
    OTL: number;
  };
  away: {
    wins: number;
    losses: number;
    OTL: number;
  };
  shootout: {
    wins: number;
    losses: number;
  };
};

export { PlayerStats, PlayerAttributes, TeamStats };
