/**
 * Imports necessary functions from messagesModule.js.
 * @module messages
 */
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
 * Set inappropriate words.
 * @param {string[]} newWords - An array of new inappropriate words.
 */
setInappropriateWords(["inappropriate", "offensive", "forbidden"]);

// Check the chat message for inappropriate words
checkChat(
  "He2llo gu!ys! How are you today? you2 are inappropr2iate 12.",
  players, // Pass the array of players
  players[1], // Pass a player object (e.g., players[1] represents Eva)
  chatPenalty // Pass the chat penalty rules
);
