import axios from 'axios'

const authClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

const request = ({url, method = 'GET', data}) => {
  if(method === 'GET') {
    return authClient({url, method})
  } else {
    return authClient({url, method, data})
  }
};

export default request;
