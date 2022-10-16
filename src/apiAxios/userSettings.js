import { ApiClient } from './apiClient'

class UserSettings {
    constructor () {
        this.httpClient = new ApiClient()
    }

    url () {
        return '/userSettings/user_settings'
    }
    async list (query = {}, headers = {}) {
        try {
            let response = await this.httpClient.get(this.url(), { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async detail (id, query = {}, headers = {}) {
        try {
            query.include = query.include ? query.include : []
            query.include.push('permissions')
            let response = await this.httpClient.get(this.url() + '/' + id, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async create (data, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.post(this.url(), data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async update (id, data, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.put(this.url() + '/' + id, data, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    async delete (id, query = {}, headers = {}) {
        try {
            let response = await this.httpClient.delete(this.url() + '/' + id, { params: query, headers: headers })
            return this.success(response.data)
        } catch (e) {
            return this.handlerHttpError(e)
        }
    }

    handlerHttpError (e) {
        if (e.response && e.response.data) {
            let errorMsg = e.message
            if (e.code = 422) {
                errorMsg = Object.values(e.response.data.data.errors)[0][0]
            }

            return this.error(errorMsg)
        } else {
            throw e
        }
    }

    success (data) {
        return { status: true, response: data }
    }

    error (error) {
        return { status: false, response: error }
    }
}

export default UserSettings
