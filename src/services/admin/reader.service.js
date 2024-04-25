import createApiClient from "./api.service"

class ReaderService {
    constructor(baseUrl = "/api/admin/reader") {
        this.api = createApiClient(baseUrl)
    }

    async getAllUsers() {
        try {
            const response = await this.api.get('/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new ReaderService();
