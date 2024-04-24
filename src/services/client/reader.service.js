import createApiClient from "./api.reader"

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.apiClient = createApiClient(baseUrl)
    }

    async createUser(userData) {
        try {
            const response = await this.apiClient.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const response = await this.apiClient.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUserByToken(formData) {
        try {
            const { reader } = (await this.apiClient.get(`/user`, { headers: { Authorization: `Bearer ${formData.get("tokenUser")}` } })).data;
            return reader;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const response = await this.apiClient.get(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await this.apiClient.put(`/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateBorrow(token, borrow) {
        try {
            const response = await this.apiClient.put(`/borrow`, { borrow, token });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async returnBookBorrow(userId) {
        try {
            const response = await this.apiClient.delete(`/return/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async statusBookReturn(readerId, bookId, status) {
        try {
            const response = await this.apiClient.put(`/statusBookReturn/${readerId}/${bookId}`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getNumberBookBorrowed(id_book) {
        try {
            const response = await this.apiClient.get(`/numberbookborrowed/${id_book}`);
            console.log(response.data.borrowedBookQuantity)
            return response.data.borrowedBookQuantity;
        } catch (error) {
            throw error;
        }
    }
}
export default new ReaderService();
