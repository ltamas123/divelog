import axios from 'axios';
import { useEffect, useState } from 'react';

const TimeLine = () => {
  const [dives, setDives] = useState([]);
  const [stats, setStats] = useState();

  async function getUserDives() {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/dive/ea93d0db-9c15-4e5a-b175-3aa32668c604/'
      );
      console.log(response);
      setDives(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getStats() {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/dive/ea93d0db-9c15-4e5a-b175-3aa32668c604/stats'
      );
      console.log(response);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserDives();
    getStats();
  }, []);
  return (
    <div class="container ">
      <div class="row justify-content-between ">
        <div class="col">Column</div>
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
        {stats ? (
          <div class="col">
            <div class="card text-white bg-secondary mb-3">
              <div class="card-body">Stats</div>
              <div class="card-body">Number of dives: {stats.Count}</div>
              <div class="card-body">Max depth: {stats.maxDepth}</div>
              <div class="card-body">Longest Dive: {stats.maxTime}</div>
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
