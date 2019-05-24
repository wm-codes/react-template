const { REACT_APP_BASE_URL } = process.env;

export default class Fetch {
    static async fetch(path, options) {
        const {
            headers,
            method,
            body,
            isFormData,
        } = options;

        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Language': document.documentElement.lang,
                'Authorization': 'JWT ' + localStorage.getItem('rToken'), // needs to be changed because reactin JWT is also the same
                ...headers,
            },
            credentials: 'include',
            method,
        };
        
        if (isFormData) {
            // 'multipart / form-data' should not be specified in header, so browser will add boundry
            delete requestOptions.headers['Content-Type'];
        }

        if (body) {
            requestOptions.body = isFormData ? body : JSON.stringify(body);
        }

        const requestPromise = await fetch(`${REACT_APP_BASE_URL}${path}`, requestOptions);

        if (requestPromise.status >= 200 && requestPromise.status < 300) {
            try {
                return await requestPromise.json();
            } catch {
                return { errorMessage: 'Something went wrong' };
            }
        } else {
            const errorMessage = await requestPromise.text();
            return { errorMessage };
        }
    }

    /* GET (retrieve) */
    static get = (path, options) => Fetch.fetch(path, { ...options, method: 'GET'});

    /* POST (create) */
    static post = (path, options) => Fetch.fetch(path, { ...options, method: 'POST' });

    /* PUT (update) */
    static put = (path, options) => Fetch.fetch(path, { ...options, method: 'PUT' });

    /* DELETE (remove) */
    static delete = (path, options) => Fetch.fetch(path, { ...options, method: 'DELETE' });
}