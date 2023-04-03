// export class UnsplashAPI {
// 	#API_KEY = '34991567-d238450fbc6c73abfee575a58';
// 	#BASE_URL = 'https://pixabay.com/api/';

// 	query = null;
// 	page = 1;
// 	count = 40;

// 	fetchImages() {
// 		return fetch(
// 			`${this.#BASE_URL}/?key=${this.#API_KEY}&page=${this.page}`
// 		);
// 	}
// }

import axios from 'axios';
const KEY = '34991567-d238450fbc6c73abfee575a58';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, error => {
		Notiflix.Notify.failure('Something went wrong. Please try again later.');
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
	
async function fetchImages(query, page, perPage) {
	const response = await axios.get(
		`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
	);
	return response.data;
};

export { fetchImages };
