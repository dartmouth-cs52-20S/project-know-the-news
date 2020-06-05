import axios from 'axios';

const PRO_PUBLICA_CONGRESS_API_KEY = 'LlT0twpQA1rDULtJf5IAEDZ3jJBvNkepTFF81q6W';

// const ROOT_URL = 'https://know-the-news.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
const PRO_PUBLICA_API_URL = 'https://api.propublica.org/congress/v1/116/both/bills/active.json';

// keys for actiontypes
export const ActionTypes = {
  FETCH_TOPICS: 'FETCH_TOPICS',
  FETCH_TOPIC: 'FETCH_TOPIC',
  // UPDATE_POST: 'UPDATE_POST',
  UPDATE_TOPIC_NO_USER: 'UPDATE_TOPIC_NO_USER',
  CREATE_TOPIC: 'CREATE_TOPIC',
  DELETE_TOPIC: 'DELETE_TOPIC',
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
    axios.get(`${ROOT_URL}/newsAPI`)
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
    axios.post(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
} */

export function unattachTopic(id, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/topics/${id}`, id, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_TOPIC_NO_USER, payload: response.data });
      }).then(() => { history.push(`/topics/${id}`); })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

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

export function deleteTopic(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/topics/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

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
        localStorage.setItem('currentUser', response.data.username);
      })
      .then(() => { history.push('/'); })
      .catch((error) => {
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
      });
  };
}

export function signupUser(email, username, password, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', response.data.username);
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
