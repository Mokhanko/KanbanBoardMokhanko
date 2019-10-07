import STORAGE from '../config';

export default {
  set: (key, value) => {
    localStorage.setItem(`${STORAGE.STORAGE}:${key}`, value);
  },
  get: (key) => {
    return localStorage.getItem(`${STORAGE.STORAGE}:${key}`);
  },
  remove: (key) => {
    localStorage.removeItem(`${STORAGE.STORAGE}:${key}`);
  }
}
