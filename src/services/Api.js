import axios from 'axios';

const API_KEY = '35686876-5d6c301705e2d3bbb33c976fd';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, currentPage) => {
  const url = `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);
  return response.data;
};

export { fetchImages };
