import { useEffect, useState } from 'react';
import { getDives } from './apiCalls';
import SendDives from './SendDives';
import useDecode from './useDecode';
const TimeLine = () => {
  const [dives, setDives] = useState([]);
  const { getUserId } = useDecode();

  const conect = async () => {
    const divess = await getDives(getUserId());

    setDives(divess);
    console.log(divess);
  };

  useEffect(() => {
    conect();
  }, []);

  return (
    <div className="container ">
      <div className="row justify-content-between ">
        <div className="col">
          <SendDives setDives={setDives} dives={dives} />
        </div>
        <div className="col">
          {dives
            ? dives.map((dive) => (
                <div
                  className="card text-white bg-secondary mb-3"
                  style={{ maxwidth: 500 }}
                  key={dive.id}
                >
                  <img
                    src="https://rajaampatbiodiversity.com/wp-content/uploads/2021/01/raja-ampat-diving-3.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      00 : {dive.duration} : 00
                    </li>
                    <li className="list-group-item">{dive.depth} m</li>
                    <li className="list-group-item">Type: {dive.type}</li>
                  </ul>
                  <div className="card-body">More Info</div>
                </div>
              ))
            : 'loading'}
        </div>
        {dives ? (
          <div className="col">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-body">Stats</div>
              <div className="card-body">Number of dives: {}</div>
              <div className="card-body">Max depth: {}</div>
              <div className="card-body">Longest Dive: {}</div>
            </div>
          </div>
        ) : (
          'Loading'
        )}
      </div>
    </div>
  );
};

export default TimeLine;
