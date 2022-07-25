 export  const  fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    upload: uploadFile()
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function uploadFile(){
    return (url, body) => {

        console.log(url)
        fetch(`${url}`, {
            method: 'POST',
            headers: authHeader(url),
            body: body
          })
          .then(response => response.json())
          .then(data => {
            return(data)
          })
    }
}

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith('http://localhost:3001/');
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return localStorage.getItem("token") ;
}

function handleResponse(response) {
    
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 400].includes(response.status) && authToken()) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}