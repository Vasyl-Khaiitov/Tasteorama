import axios from "axios";

export const deleteFavorite = (id) => {
  return axios.delete(`/api/favorites/${id}`);
};
