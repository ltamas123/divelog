import { useEffect, useState } from 'react';
import { getTimeLine, getStats } from '../api/apiCalls';
import SendDives from '../Components/SendDives';
import useDecode from '../Hooks/useDecode';
import DivesList from '../Components/DivesList';

import Map from '../Components/Map';
const TimeLine = () => {
  const [dives, setDives] = useState([]);
  const [stats, setStats] = useState();
  const [position, setPosition] = useState();
  const { getUserId } = useDecode();

  const conect = async () => {
    const divess = await getTimeLine(getUserId());
    const stat = await getStats(getUserId());
    setStats(stat);
    setDives(divess);
    console.log(divess);
  };

  const onModalClose = (pos) => {
    console.log(pos);
    setPosition(pos);
  };

  useEffect(() => {
    conect();
  }, []);

  return (
    <>
      <Map onModalClose={onModalClose} />
      <div className="container ">
        <div className="row justify-content-between ">
          <div className="col">
            <SendDives setDives={setDives} position={position} />
          </div>
          <div className="col">
            {dives ? <DivesList dives={dives} /> : 'loading'}
          </div>
          {stats ? (
            <div className="col">
              <div className="card text-white bg-secondary mb-3">
                <div className="card-body">Stats</div>
                <div className="card-body">Number of dives: {stats.count}</div>
                <div className="card-body">Max depth: {stats.maxDepth}</div>
                <div className="card-body">Longest Dive: {stats.maxTime}</div>
              </div>
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    </>
  );
};

export default TimeLine;
