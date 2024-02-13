/**
 * Object containing penalty functions.
 * @typedef {Object} PenaltyModuleFunctionality
 * @property {Function} lvlPenalty - Function to apply level penalty to a player.
 * @property {Function} incrementPenalty - Function to increment penalties for a player.
 * @property {Function} goldPenalty - Function to apply gold penalty to a player.
 * @property {Function} removePlayerIfPenaltyReached - Function to remove player from list if penalty reached.
 */
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

/**
 * Object containing penalty settings and custom penalties.
 * @typedef {Object} PenaltyExecution
 * @property {boolean} lvlPenalty - Flag indicating whether to apply level penalty.
 * @property {boolean} incrementPenalty - Flag indicating whether to increment penalties for a player.
 * @property {boolean} goldPenalty - Flag indicating whether to apply gold penalty.
 * @property {boolean} removePlayerIfPenaltyReached - Flag indicating whether to remove player if penalty reached.
 * @property {Object[]} customPens - Array of custom penalties.
 * @property {boolean} customPens.execute - Flag indicating whether to execute the custom penalty.
 * @property {Function} customPens.func - The custom penalty function.
 * @property {Object} customPens.params - Parameters for the custom penalty function.
 */

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

/**
 * Updates the penaltyExecution settings.
 * @param {PenaltyExecution} newPenaltyExecution - The new penaltyExecution settings.
 */
export const setPenaltyExecution = (newPenaltyExecution) =>
  (penaltyExecution = { ...penaltyExecution, ...newPenaltyExecution });

/**
 * Applies penalties to a player based on the penaltyTypeRules.
 * @param {Object[]} players - The array of players.
 * @param {Object} player - The player object to apply penalties to.
 * @param {Object} penaltyTypeRules - The penalty type rules.
 * @param {number} penaltyTypeRules.level - The level penalty to apply.
 * @param {number} penaltyTypeRules.gold - The gold penalty to apply.
 * @param {number} penaltyTypeRules.maxPenalty - The maximum penalty threshold.
 */
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
