<template>
    <div>
        <ClientAppHeader />
        <div class="container mt-3">
            <div class="add-new">Mượn sách</div>
            <div class="form">
                <form @submit.prevent="updateBook()">
                    <div class="form-item">
                        <label class="label" for="name">Tên sách:</label><br />
                        <input class="input" type="text" id="name" v-model="formData.name" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="price">Giá:</label><br />
                        <input class="input" type="number" id="price" v-model="formData.price" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="price">Số lượng:</label><br />
                        <input class="input" type="number" id="quantity" v-model="formData.quantity" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="quantity">Ngày mượn:</label><br />
                        <input class="input" type="date" id="borrowDate" v-model="formData.borrowDate" />
                    </div>

                    <div class="form-item">
                        <label class="label" for="quantity">Ngày trả:</label><br />
                        <input class="input" type="date" id="returnDate" v-model="formData.returnDate" />
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ClientAppHeader from "@/components/client/ClientAppHeader.vue";
import BookService from "@/services/client/book.service";
import readerService from "@/services/client/reader.service";
import Cookies from 'js-cookie';

export default {
    components: {
    },
    data() {
        return {
            formData: {
                id_book: "",
                name: "",
                price: 0,
                quantity: 0,
                borrowDate: "",
                returnDate: "",
            },
            token: "",
        };
    },
    mounted() {
        this.retrieve(this.$route.params.id);
    },

    methods: {
        async retrieve(bookId) {
            try {
                const token = Cookies.get('tokenUser');
                this.token = token;
                const book = await BookService.get(bookId);

                console.log(token);
                if (book) {
                    this.formData.name = book.name;
                    this.formData.price = book.price;
                    this.formData.id_book = bookId;
                    
                } else {
                    console.log("Book not found");
                }

                console.log(book);
            } catch (error) {
                console.log(error);
            }
        },


        async updateBook() {
            try {

                const book = await BookService.get(this.formData.id_book); 
                console.log("book",book)
                if (this.formData.quantity > book.quantity) { 
                    alert('The amount you borrow exceeds the number of books left.');
                    return; 
                }


                const formData = new FormData();

                formData.append("id_book", this.formData.id_book);
                formData.append("quantity", this.formData.quantity);
                formData.append("borrowDate", this.formData.borrowDate);
                formData.append("returnDate", this.formData.returnDate);
                console.log(this.formData);
                const response = await readerService.updateBorrow(
                    this.token,
                    this.formData,
                );

                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    width: 80%;
    width: 60%;
    height: 850px;
    text-align: center;

    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-new {
    font-size: 30px;
    margin-top: 10px;
}

.form-item {
    text-align: left;
    padding: 10px;
}

.label {
    font-weight: bold;
}

.input {
    width: 100%;
    /* height: 40px; */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>