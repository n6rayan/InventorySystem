import axios from 'axios';

interface Options {
    method: string;
    url: string,
    data?: object,
    headers?: object
}

export class APIClient {
    public makeRequest(options: Options) {
        return new Promise((resolve, reject) => {
            axios.request(options)
            .then((response) => resolve(response.data))
            .catch((err) => reject(err));
        });
    }
}