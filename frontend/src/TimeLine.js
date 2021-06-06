import { useEffect, useState } from 'react';
import { getDives, handleDives } from './apiCalls';
import SendDives from './SendDives';

const TimeLine = () => {
  const [dives, setDives] = useState([]);
  const [stats, setStats] = useState();

  const conect = async () => {
    const divess = await getDives('a5ab2b1c-dc0b-4431-84a4-46dfe2af755c');

    setDives(divess);
    console.log(dives);
  };

  useEffect(() => {
    conect();
  }, []);

  return (
    <div class="container ">
      <div class="row justify-content-between ">
        <div class="col">
          <SendDives />
        </div>
        <div class="col">
          {dives
            ? dives.map((dive) => (
                <div
                  class="card text-white bg-secondary mb-3"
                  style={{ maxwidth: 500 }}
                  key={dive.id}
                >
                  <img
                    src="https://rajaampatbiodiversity.com/wp-content/uploads/2021/01/raja-ampat-diving-3.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{dive.user.fullName}</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">00 : {dive.duration} : 00</li>
                    <li class="list-group-item">{dive.depth} m</li>
                    <li class="list-group-item">Type: {dive.type}</li>
                  </ul>
                  <div class="card-body">
                    <a href="#" class="card-link">
                      More Info
                    </a>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
        {dives ? (
          <div class="col">
            <div class="card text-white bg-secondary mb-3">
              <div class="card-body">Stats</div>
              <div class="card-body">Number of dives: {}</div>
              <div class="card-body">Max depth: {}</div>
              <div class="card-body">Longest Dive: {}</div>
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
