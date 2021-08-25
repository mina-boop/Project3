import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  postMemes(meme) {
    return service
      .post("/api/memes/create", meme)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUserMemes(meme) {
    return service
      .get("/api/users/me/memes", meme)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllUsersMemes() {
    return service
      .get("/api/memes/all")
      .then((res) => res.data)
      .catch(errorHandler);
  },
  postComment(memeId, comment) {
    return service
      .post(`/api/memes/${memeId}/comment`, comment)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getComment(memeId) {
    return service
      .post(`/api/memes/${memeId}/allComments`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;
