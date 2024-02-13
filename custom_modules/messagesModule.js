/**
 * Imports the penalty function from the penaltyModule.js file.
 * @module penalty
 */
import { penalty } from "./penaltyModule.js";

/**
 * Array to store inappropriate words.
 * @type {string[]}
 */
let inappropriateWords = [];

/**
 * Function to sanitize the message and extract words.
 * @param {string} message - The message to sanitize.
 * @returns {string[]} An array of sanitized words.
 */
const sanitizeMessage = (message) => {
  // Remove special characters and split the string into words
  const finalWords = message
    .replace(/[^a-zA-Z ]/g, "") // Remove special characters
    .split(/\s+/) // Split the string into words
    .map((word) => word.replace(/[^a-zA-Z]/g, "").toLowerCase()) // Remove numbers and special characters from each word and convert to lowercase
    .filter((word) => word !== ""); // Filter out empty strings
  return finalWords;
};

/**
 * Sets inappropriate words.
 * @param {string[]} newWords - An array of new inappropriate words.
 */
export const setInappropriateWords = (newWords) => {
  if (Array.isArray(newWords)) {
    // Clear the array and add new words (converted to lowercase)
    inappropriateWords.length = 0;
    inappropriateWords.push(...newWords.map((word) => word.toLowerCase()));
  } else {
    console.error("Invalid input. Expected an array of words.");
  }
};

/**
 * Checks the chat message for inappropriate words and applies penalties if found.
 * @param {string} message - The chat message to check.
 * @param {Object[]} players - Array of players.
 * @param {Object} player - The player who sent the message.
 * @param {Object} penaltyTypeRules - Penalty type rules.
 * @param {number} penaltyTypeRules.level - The level penalty to apply.
 * @param {number} penaltyTypeRules.gold - The gold penalty to apply.
 * @param {number} penaltyTypeRules.maxPenalty - The maximum penalty threshold.
 */
export const checkChat = (message, players, player, penaltyTypeRules) => {
  const finalMessage = sanitizeMessage(message); // Sanitize the message
  finalMessage.forEach((word) => {
    if (inappropriateWords.includes(word)) {
      penalty(players, player, penaltyTypeRules); // Apply penalty if inappropriate word is found
      return; // Exit the loop if penalty is applied
    }
  });
};
