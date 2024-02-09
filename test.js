import { setPenaltyExecution } from "./custom_modules/penaltyModule.js";
import {
  checkChat,
  setInappropriateWords,
} from "./custom_modules/messagesModule.js";

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

const chatPenalty = {
  gold: 200,
  level: 5,
  maxPenalty: 3,
};

let player = players[1];

setInappropriateWords(["inappropriate", "offensive", "forbidden"]);

// Set custom penalties
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

checkChat(
  "He2llo gu!ys! How are you today? you2 are inappropr2iate 12.",
  players,
  player,
  chatPenalty
);
