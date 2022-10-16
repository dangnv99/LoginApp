import axios from 'axios'
import Raven from 'raven-js'

axios.defaults.baseURL = 'https://634b6ffb317dc96a3084ea7e.mockapi.io/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


const getClient = (baseUrl = null) => {

    const options = {
        baseURL: 'https://634b6ffb317dc96a3084ea7e.mockapi.io/'
    }

    options.headers = {
        'Content-Type': 'application/json'
    }

    const client = axios.create(options)

    // Add a request interceptor
    client.interceptors.request.use(async (config) => {
        return config;
    },
        (requestError) => {
            Raven.captureException(requestError)
            return Promise.reject(requestError)
        },
    )

    // Add a response interceptor
    client.interceptors.response.use(
        response => response,
        (error) => {
            if (error.response.status >= 500) {
                Raven.captureException(error)
            }
            return Promise.reject(error)
        },
    )
    return client
}

class ApiClient {
    constructor (baseUrl = null) {
        this.client = getClient(baseUrl)
    }

    get (url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    delete (url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    head (url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    options (url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    post (url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    put (url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }

    patch (url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
}

export { ApiClient }

/**
 * Base HTTP Client
 */
export default {
    // Provide request methods with the default base_url
    get (url, conf = {}) {
        return getClient().get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    delete (url, conf = {}) {
        return getClient().delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    head (url, conf = {}) {
        return getClient().head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    options (url, conf = {}) {
        return getClient().options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    post (url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    put (url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },

    patch (url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
}
