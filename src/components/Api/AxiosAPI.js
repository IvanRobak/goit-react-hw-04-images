import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '32900641-8e4479d7696ea488ce1252de7';
const PAGE = '12';

export const fetchGallery = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PAGE}`
  );
  return data;
};
