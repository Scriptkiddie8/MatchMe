import { IUser } from "../models/user.model";

export const calculateMatchPercentage = (
  currentUser: IUser,
  matchedUser: IUser
): number => {
  let score = 0;

  // 1️⃣ AGE MATCH — 30%
  if (
    currentUser.partnerPreferences?.minAge &&
    currentUser.partnerPreferences?.maxAge &&
    matchedUser.age
  ) {
    if (
      matchedUser.age >= currentUser.partnerPreferences.minAge &&
      matchedUser.age <= currentUser.partnerPreferences.maxAge
    ) {
      score += 30;
    }
  }

  // 2️⃣ LOCATION MATCH — 25%
  if (
    currentUser.partnerPreferences?.location &&
    matchedUser.location &&
    currentUser.partnerPreferences.location === matchedUser.location
  ) {
    score += 25;
  }

  // 3️⃣ GENDER MATCH — 15%
  if (
    currentUser.partnerPreferences?.gender &&
    matchedUser.gender &&
    currentUser.partnerPreferences.gender === matchedUser.gender
  ) {
    score += 15;
  }

  // 4️⃣ HOBBIES MATCH — 30%
  if (currentUser.hobbies && matchedUser.hobbies) {
    const commonHobbies = currentUser.hobbies.filter((hobby) =>
      matchedUser.hobbies?.includes(hobby)
    );

    if (commonHobbies.length > 0) {
      score += Math.min(30, commonHobbies.length * 10);
    }
  }

  return Math.min(score, 100); // never exceed 100
};
