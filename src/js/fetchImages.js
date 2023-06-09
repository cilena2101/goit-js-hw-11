import axios from 'axios';
const KEY = '34991567-d238450fbc6c73abfee575a58';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});
	
async function fetchImages(query, page, perPage) {
	const response = await axios.get(
		`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
	);
	return response.data;
};
export { fetchImages };
