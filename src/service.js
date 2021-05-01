import { crewObj } from './constants';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
const cannotBePair = (crewName1, crewName2) =>
  crewName1 === crewName2 || crewObj[crewName1].prevPairs.includes(crewName2);
const cannotDoTrio = (crewName) => crewObj[crewName].didTrio;
const isMatchingDone = (newPairSet) => newPairSet.length === 12;

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

export const getNewPairSet = () => {
  const crewList = Object.keys(crewObj);

  while (true) {
    const shuffledCrewList = shuffle(crewList);
    const newPairSet = [];
    const trio = getTrio(shuffledCrewList);

    if (trio.length !== 3) continue;
    newPairSet.push(trio);

    while (true) {
      const duo = getDuo(shuffledCrewList);

      if (duo.length !== 2) break;
      newPairSet.push(duo);
      if (isMatchingDone(newPairSet)) {
        return newPairSet;
      }
    }
  }
};
