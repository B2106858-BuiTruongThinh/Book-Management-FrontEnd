import createapi from "./api.reader"

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.api = createapi(baseUrl)
    }

    async createUser(userData) {
        try {
            const response = await this.api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const response = await this.api.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUserByToken(formData) {
        try {
            const { reader } = (await this.api.get(`/user`, { headers: { Authorization: `Bearer ${formData.get("tokenUser")}` } })).data;
            return reader;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const response = await this.api.get(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await this.api.put(`/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateBorrow(token, borrow) {
        try {
            const response = await this.api.put(`/borrow`, { borrow, token });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async returnBookBorrow(userId) {
        try {
            const response = await this.api.delete(`/return/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async statusBookReturn(readerId, bookId, status) {
        try {
            const response = await this.api.put(`/statusBookReturn/${readerId}/${bookId}`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getNumberBookBorrowed(id_book) {
        try {
            const response = await this.api.get(`/numberbookborrowed/${id_book}`);
            console.log(response.data.borrowedBookQuantity)
            return response.data.borrowedBookQuantity;
        } catch (error) {
            throw error;
        }
    }
}
export default new ReaderService();
