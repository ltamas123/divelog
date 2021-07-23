const DivesList = ({ dives }) => {
  return dives.map((dive) => (
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
        <h5 className="card-title">{dive.user ? dive.user.fullName : ''}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">00 : {dive.duration} : 00</li>
        <li className="list-group-item">{dive.depth} m</li>
        <li className="list-group-item">Type: {dive.type}</li>
      </ul>
      <div className="card-body">More Info</div>
    </div>
  ));
};

export default DivesList;
