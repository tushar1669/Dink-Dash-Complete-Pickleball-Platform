export interface Player {
  id: string;
  name: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'pro';
}

export function generateSingleEliminationBracket(players: Player[]): any[] {
  if (players.length === 0) return [];
  
  // Pad to next power of 2
  const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(players.length)));
  const paddedPlayers = [...players];
  
  while (paddedPlayers.length < nextPowerOf2) {
    paddedPlayers.push({ id: `bye-${paddedPlayers.length}`, name: 'BYE', skillLevel: 'beginner' });
  }

  const rounds = [];
  let currentRound = paddedPlayers.map((player, index) => ({
    id: `match-0-${Math.floor(index / 2)}`,
    player1: index % 2 === 0 ? player : null,
    player2: index % 2 === 1 ? player : null,
    winner: null,
    round: 0,
  })).filter((_, index) => index % 2 === 0);

  // Properly pair players
  currentRound = [];
  for (let i = 0; i < paddedPlayers.length; i += 2) {
    currentRound.push({
      id: `match-0-${i / 2}`,
      player1: paddedPlayers[i],
      player2: paddedPlayers[i + 1],
      winner: null,
      round: 0,
    });
  }

  rounds.push(currentRound);

  // Generate subsequent rounds
  let roundNum = 1;
  while (currentRound.length > 1) {
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      nextRound.push({
        id: `match-${roundNum}-${i / 2}`,
        player1: null,
        player2: null,
        winner: null,
        round: roundNum,
      });
    }
    rounds.push(nextRound);
    currentRound = nextRound;
    roundNum++;
  }

  return rounds;
}