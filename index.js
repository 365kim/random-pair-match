const crewObj = {
  곤이: { didTrio: true, prevPairs: ['체프', '카일', '썬', '유조', '심바', '디토', '엘라'] },
  그루밍: { didTrio: true, prevPairs: ['엘라', '파노', '인치', '브랜', '심바', '피터', '인치'] },
  도비: { didTrio: false, prevPairs: ['주모', '콜린', '서니', '카일', '브콜', '체프'] },
  동동: { didTrio: false, prevPairs: [] },
  디토: { didTrio: true, prevPairs: ['인치', '크리스', '하루', '신세한탄', '썬', '곤이', '엘라'] },
  미키: { didTrio: false, prevPairs: [] },
  브랜: { didTrio: true, prevPairs: ['카일', '동동', '유조', '그루밍', '심바', '지그', '서니'] },
  브콜: { didTrio: true, prevPairs: [] },
  서니: { didTrio: false, prevPairs: [] },
  신세한탄: { didTrio: false, prevPairs: [] },
  심바: { didTrio: false, prevPairs: [] },
  썬: { didTrio: false, prevPairs: ['콜린', '하루', '곤이', '브콜', '디토', '파노'] },
  엘라: { didTrio: true, prevPairs: [] },
  인치: { didTrio: true, prevPairs: [] },
  유조: { didTrio: false, prevPairs: ['하루', '심바', '브랜', '곤이', '동동', '티케'] },
  주모: { didTrio: false, prevPairs: [] },
  지그: { didTrio: false, prevPairs: ['피터', '티케', '심바', '서니', '브랜', '콜린'] },
  체프: { didTrio: false, prevPairs: ['곤이', '서니', '피터', '파노', '엘라', '도비'] },
  카일: { didTrio: true, prevPairs: ['브랜', '곤이', '파노', '엘라', '도비', '미키', '동동'] },
  콜린: { didTrio: false, prevPairs: ['썬', '도비', '신세한탄', '인치', '티케', '지그'] },
  크리스: { didTrio: true, prevPairs: ['브콜', '디토', '미키', '피터', '인치', '파노', '주모'] },
  티케: { didTrio: false, prevPairs: [] },
  파노: { didTrio: true, prevPairs: ['미키', '그루밍', '엘라', '카일', '체프', '썬'] },
  피터: { didTrio: false, prevPairs: ['지그', '미키', '체프', '크리스', '그루밍', '심바'] },
  하루: { didTrio: false, prevPairs: ['유조', '썬', '디토', '동동', '주모', '신세한탄'] },
};

const crewList = Object.keys(crewObj);
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const cannotBePair = (crewName1, crewName2) =>
  crewName1 == crewName2 || crewObj[crewName1].prevPairs.includes(crewName2);
const cannotDoTrio = (crewName) => crewObj[crewName].didTrio;
const removeFromList = (list, crewsToRemove) => {
  crewsToRemove.forEach((crewName) => list.splice(list.indexOf(crewName), 1));
};
const getDuo = (crewList) => {
  const firstMember = crewList[0];

  for (let crewToAdd of crewList) {
    const duo = [firstMember, crewToAdd];

    if (cannotBePair(...duo)) continue;
    removeFromList(crewList, duo);
    console.log('2인 페어', duo);
    return duo;
  }
  return [];
};

const getTrio = (crewList) => {
  const trio = [];

  for (let crewToAdd of crewList) {
    if (cannotDoTrio(crewToAdd) || trio.some((trioMember) => cannotBePair(trioMember, crewToAdd))) {
      continue;
    }
    trio.push(crewToAdd);
    if (trio.length === 3) {
      removeFromList(crewList, trio);
      console.log('3인 페어', trio);
      return trio;
    }
  }
  return [];
};

const getNewPairSet = () => {
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
      if (newPairSet.length === 12) return newPairSet;
    }
  }
};

getNewPairSet();
