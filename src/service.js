import axios from 'axios';
import _ from 'lodash';

export const publicRequest = (url, info) => {
    const request = axios.create({
        baseURL: `http://localhost:8000${url}`,
        // headers: {
        //     // 'Access-Control-Allow-Headers': '*',
        //     // 'Origin': 'http://127.0.0.1:3000',
        //     'Authenticate': 'Basic bnR0aGFuaHZ5OnZ5MTIzNDU2'
        // },
        auth: { username: 'ndthinh', password: 'sakyamuni863' }
    });
    // const token = getAccessToken() || '';
    //   if (!isEmpty(token)) {
    // request.defaults.headers.Authorization = `Bearer ${token}`;
    request.defaults.timeout = 20000;
    return request(info)
        .catch((err) => {
            throw (err);
        });
    //   }
    // return null;
};