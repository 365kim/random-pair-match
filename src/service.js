import { crewObj } from './crewPairLogs';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
const cannotBePair = (crewName1, crewName2) =>
  crewName1 === crewName2 || crewObj[crewName1].prevStudyPairs.includes(crewName2);
const cannotDoTrio = (crewName) => crewObj[crewName].studyTrioCount > 1;
const isMatchingDone = (crewList, newPairSet) => Math.floor(crewList.length / 2) === newPairSet.length;
const isOddNumber = (num) => num % 2;

const removeFromList = (list, crewsToRemove) => {
  crewsToRemove.forEach((crewName) => list.splice(list.indexOf(crewName), 1));
};

const getDuo = (crewList) => {
  const firstMember = crewList[0];

  for (let crewToAdd of crewList) {
    const duo = [firstMember, crewToAdd];

    if (cannotBePair(...duo)) continue;
    removeFromList(crewList, duo);
    return duo;
  }
  return [];
};

const getTrio = (crewList) => {
  const trio = [];

  for (let crewToAdd of crewList) {
    if (cannotDoTrio(crewToAdd) || trio.some((trioMember) => cannotBePair(trioMember, crewToAdd))) continue;
    trio.push(crewToAdd);
    if (trio.length === 3) {
      removeFromList(crewList, trio);
      return trio;
    }
  }
  return [];
};

let count = 0;
export const getNewPairSet = () => {
  const activeCrewList = Object.keys(crewObj).filter((name) => crewObj[name].isActive);

  while (true) {
    const shuffledCrewList = shuffle(activeCrewList);
    const newPairSet = [];

    if (isOddNumber(activeCrewList)) {
      const trio = getTrio(shuffledCrewList);

      if (trio.length !== 3) continue;
      newPairSet.push(trio);
    }

    while (count++ < 10000000000000000000) {
      const duo = getDuo(shuffledCrewList);
      console.log(...newPairSet);

      if (duo.length !== 2) break;
      newPairSet.push(duo);
      if (isMatchingDone(activeCrewList, newPairSet)) {
        return newPairSet;
      }
    }
  }
};
