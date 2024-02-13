/**
 * Import necessary functions from penaltyModule.js and messagesModule.js.
 * @module chatCheck
 */

import { setPenaltyExecution } from "./custom_modules/penaltyModule.js";
import {
  checkChat,
  setInappropriateWords,
} from "./custom_modules/messagesModule.js";

/**
 * Array of player objects.
 * @type {Object[]}
 */
const players = [
  {
    username: "Mark",
    lvl: 93,
    gold: 222,
    penalties: 2,
  },
  {
    username: "Eva",
    lvl: 100,
    gold: 1250,
    penalties: 2,
  },
  {
    username: "Elena",
    lvl: 87,
    gold: 185,
    penalties: 0,
  },
];

/**
 * Penalty rules for chat.
 * @type {Object}
 * @property {number} gold - The gold penalty to apply.
 * @property {number} level - The level penalty to apply.
 * @property {number} maxPenalty - The maximum penalty threshold.
 */
const chatPenalty = {
  gold: 200,
  level: 5,
  maxPenalty: 3,
};

/**
 * Player object selected for testing.
 * @type {Object}
 */
let player = players[1];

/**
 * Set inappropriate words.
 */
setInappropriateWords(["inappropriate", "offensive", "forbidden"]);

/**
 * Set custom penalties.
 */
setPenaltyExecution({
  goldPenalty: false, // Turn off defaultGoldPenalty
  customPens: [
    // Add custom penalties
    {
      execute: true,
      func: () => {
        console.log("Custom penalty executed");
      },
    },
    {
      execute: true,
      func: (player) => (player.gold -= 1000),
      params: { player: player },
    },
  ],
});

// Check the chat message for inappropriate words
checkChat(
  "He2llo gu!ys! How are you today? you2 are inappropr2iate 12.",
  players,
  player,
  chatPenalty
);
