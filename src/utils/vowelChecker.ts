/* this function checks the first letter of the string passed into the function
 if its a vowel or consonant. If its a vowel it returns true
  else if a consonant it returns false */

export const vowelChecker = (word: string) => {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(word.charAt(0).toLowerCase());
};
