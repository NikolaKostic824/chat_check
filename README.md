## Introduction
This project implements a penalty system for a game, allowing administrators to set up custom penalties for players based on their in-game actions, including chat behavior.

## Features
- Inappropriate Words Filter: The system includes a feature to filter out inappropriate words in player chat messages.
- Messaging Penalties: Administrators can define custom penalties to be applied to players for inappropriate messaging behavior.
- Custom Penalties: The system allows for flexible configuration, enabling administrators to toggle default penalties and add custom ones as needed.
- Real-time Penalty Application: Penalties are applied in real-time, ensuring that players face consequences for their actions immediately.

## Usage

### Setting Up

1. Import the necessary functions from the penaltyModule.js and messagesModule.js modules.
2. Define an array of player objects, each containing information such as username, level, gold, and penalties.
3. Set up penalty rules for chat messages, specifying parameters such as the maximum penalty threshold.
4. Use the setInappropriateWords function to set up a list of inappropriate words to filter out from chat messages.
5. Configure custom penalties using the setPenaltyExecution function, toggling default penalties and adding custom ones as needed.

### Applying Penalties
1. Call the checkChat function to check chat messages for inappropriate words and apply penalties accordingly.
2. Ensure that the appropriate parameters, such as the player object and penalty rules, are passed to the checkChat function.
3. Monitor the console output for logs indicating the application of penalties and any updates to player stats.

## Example

```javascript
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
```
