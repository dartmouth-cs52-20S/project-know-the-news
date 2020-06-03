import axios from 'axios';

const PRO_PUBLICA_CONGRESS_API_KEY = 'LlT0twpQA1rDULtJf5IAEDZ3jJBvNkepTFF81q6W';

// const ROOT_URL = 'https://know-the-news.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
const NEWS_URL_ROOT = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=4b73096a147945c980ba0aa573e06950';
const PRO_PUBLICA_API_URL = 'https://api.propublica.org/congress/v1/116/both/bills/active.json';

// keys for actiontypes
export const ActionTypes = {
  FETCH_TOPICS: 'FETCH_TOPICS',
  FETCH_TOPIC: 'FETCH_TOPIC',
  // UPDATE_POST: 'UPDATE_POST',
  CREATE_TOPIC: 'CREATE_TOPIC',
  // DELETE_POST: 'DELETE_POST',
  FETCH_CONGRESS_MEMBERS: 'FETCH_CONGRESS_MEMBERS',
  FETCH_CONGRESS_BILLS: 'FETCH_CONGRESS_BILLS',
  FETCH_NEWS: 'FETCH_NEWS',
  ERROR_SET: 'ERROR_SET',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchTrendingNews() {
  return (dispatch) => {
    axios.get(NEWS_URL_ROOT)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_NEWS, payload: response.data });
      }).catch((err) => console.log(err));
  };
}

export function fetchCongressBills() {
  return (dispatch) => {
    axios.get(PRO_PUBLICA_API_URL, { headers: { 'X-API-Key': PRO_PUBLICA_CONGRESS_API_KEY } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_CONGRESS_BILLS, payload: response.data });
      }).catch((err) => console.log(err));
  };
}

export function fetchTopics() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/topics`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TOPICS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createTopic(articles, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/topics`, articles, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchTopicsBySearch(tag) {
  return (dispatch) => {
    // consider including API_KEY after tag
    axios.get(`${ROOT_URL}/topics/tag/${tag}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TOPICS, payload: response.data });
      })
      .catch((error) => {
        console.log('Failure to fetch topics by tag');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
} */

export function fetchTopic(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/topics/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TOPIC, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
} */

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ password, email }, history) {
  const user = { email, password };
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .then(() => { history.push('/'); })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signupUser(email, username, password, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}
