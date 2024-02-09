import { penalty } from "./penaltyModule.js";

// Initialize array to store inappropriate words
let inappropriateWords = [];

// Function to sanitize the message and extract words
const sanitizeMessage = (message) => {
  // Remove special characters and split the string into words
  const finalWords = message
    .replace(/[^a-zA-Z ]/g, "") // Remove special characters
    .split(/\s+/) // Split the string into words
    .map((word) => word.replace(/[^a-zA-Z]/g, "").toLowerCase()) // Remove numbers and special characters from each word and convert to lowercase
    .filter((word) => word !== ""); // Filter out empty strings
  return finalWords;
};

// Function to set inappropriate words
export const setInappropriateWords = (newWords) => {
  if (Array.isArray(newWords)) {
    // Clear the array and add new words (converted to lowercase)
    inappropriateWords.length = 0;
    inappropriateWords.push(...newWords.map((word) => word.toLowerCase()));
  } else {
    console.error("Invalid input. Expected an array of words.");
  }
};

// Function to check the chat message for inappropriate words
export const checkChat = (message, players, player, penaltyTypeRules) => {
  const finalMessage = sanitizeMessage(message); // Sanitize the message
  finalMessage.forEach((word) => {
    if (inappropriateWords.includes(word)) {
      penalty(players, player, penaltyTypeRules); // Apply penalty if inappropriate word is found
      return; // Exit the loop if penalty is applied
    }
  });
};
