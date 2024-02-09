// Define PenaltyModuleFunctionality object containing penalty functions
const PenaltyModuleFunctionality = {
  // Function to apply level penalty to a player
  lvlPenalty: (player, lvlNum) => (player.lvl -= lvlNum),

  // Function to increment penalties for a player
  incrementPenalty: (player) => (player.penalties += 1),

  // Function to apply gold penalty to a player
  goldPenalty: (player, goldDec) => {
    console.log(player.gold, goldDec);
    if (player.gold > goldDec + 1) {
      player.gold -= goldDec;
    } else {
      player.gold = 0;
    }
  },

  // Function to remove player from list if penalty reached
  removePlayerIfPenaltyReached: (players, player, penNum) => {
    const indexToRemove = players.findIndex(
      (p) => p === player && p.penalties === penNum
    );
    if (indexToRemove !== -1) {
      players.splice(indexToRemove, 1);
    }
  },
};

// Define penaltyExecution object containing penalty settings and custom penalties
let penaltyExecution = {
  lvlPenalty: true,
  incrementPenalty: true,
  goldPenalty: true,
  removePlayerIfPenaltyReached: true,
  customPens: [
    {
      execute: true,
      func: (param1, param2) =>
        console.log(`hello 1 with ${param1} and ${param2}`),
      params: { param1: "value1", param2: "value2" },
    },
  ],
};

// Function to update penaltyExecution settings
export const setPenaltyExecution = (newPenaltyExecution) =>
  (penaltyExecution = { ...penaltyExecution, ...newPenaltyExecution });

// Function to apply penalties to a player
export const penalty = (players, player, penaltyTypeRules) => {
  const {
    lvlPenalty,
    incrementPenalty,
    goldPenalty,
    removePlayerIfPenaltyReached,
    customPens,
  } = penaltyExecution;

  // Apply level penalty if enabled
  if (lvlPenalty) {
    PenaltyModuleFunctionality.lvlPenalty(player, penaltyTypeRules.level);
  }

  // Increment penalties for the player if enabled
  if (incrementPenalty) {
    PenaltyModuleFunctionality.incrementPenalty(player);
  }

  // Apply gold penalty if enabled
  if (goldPenalty) {
    PenaltyModuleFunctionality.goldPenalty(player, penaltyTypeRules.gold);
  }

  // Remove player from list if penalty reached and enabled
  if (removePlayerIfPenaltyReached) {
    PenaltyModuleFunctionality.removePlayerIfPenaltyReached(
      players,
      player,
      penaltyTypeRules.maxPenalty
    );
  }

  // Execute custom penalties if any
  if (customPens && Array.isArray(customPens)) {
    customPens.forEach((customPen) => {
      const { func, params } = customPen;
      if (params) {
        func(...Object.values(params));
      } else {
        func();
      }
    });
  }

  // Log current player stats and updated user list
  console.log(
    `Penalty implemented. Current player stats: ${JSON.stringify(
      player
    )}. Updated user list: ${JSON.stringify(players)}`
  );
};
