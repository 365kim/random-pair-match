import Lottie from 'react-lottie';
import { getNewPairSet } from './service';
import animationData from './animation';
import { crewObj } from './constants';

export const Animation = () => {
  return <Lottie options={{ animationData, loop: true }} width="50vw" />;
};

const Crew = ({ crewName }) => {
  const crewImage = crewObj[crewName].img;

  return (
    <div className="Crew">
      <img className="Crew__Image" src={crewImage} alt={crewName} />
      <span className="Crew__Name">{crewName}</span>
    </div>
  );
};

const Pair = ({ pair }) => {
  return (
    <li className="Pair">
      {pair.map((crewName) => (
        <Crew crewName={crewName} />
      ))}
    </li>
  );
};

export const PairList = () => {
  const newPairSet = getNewPairSet();

  return (
    <>
      <h1 className="App__Header">반가워요, 잘 부탁드립니다</h1>
      <ul className="PairList">
        {newPairSet.map((pair) => (
          <Pair pair={pair} />
        ))}
      </ul>
    </>
  );
};
