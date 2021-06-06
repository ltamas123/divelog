import api from './api';

export const userLogin = async (value) => {
  try {
    const response = await api.post('/login', value);
    handleResponse(response);
  } catch (error) {
    console.log(error);
  }
};

const handleResponse = (response) => {
  localStorage.setItem('token', response.data.token);
};

export const getDives = async (userId) => {
  try {
    const response = await api.get(`/dive/${userId}`);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const postDive = async (userId, values) => {
  try {
    await api.post(`/dive/${userId}`, values);
  } catch (error) {
    console.error();
  }
};

/*
    <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">DiveLog</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/">{token ? <TimeLine /> : <Login />}</Route>
        <Route path="/timeline">
          <TimeLine />
        </Route>
      </Switch>
    </Router>
  );*/
