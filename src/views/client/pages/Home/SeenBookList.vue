<template>
    <div>
        <AppHeaderHome />
        <div class="container mt-3">
            <div class="page row">
                <div class="col-md-10">
                    <ClientInputSearch v-model="searchText" />
                </div>
                <div class="mt-3 col-8">
                    <h4>
                        Danh Sách Sách
                        <i class="fa-solid fa-book"></i>
                    </h4>

                    <div class="">
                        <button class="btn btn-sm btn-primary custom-margin" @click="refreshList()">
                            <i class="fas fa-redo"></i> Làm mới
                        </button>
                    </div>

                    <ClientBookList v-if="filteredBooksCount > 0" :books="filteredBooks"
                        v-model:activeIndex="activeIndex" />
                    <p v-else>Không có cuốn sách nào.</p>
                </div>

                <div class="mt-3 col-4">
                    <div v-if="activeBook">
                        <h4>
                            Chi tiết sách
                            <i class="fa-solid fa-book"></i>
                        </h4>
                        <ClientBookDetail :book="activeBook" />
                        <button @click="borrowBook" class="mt-2 badge badge-warning" style="color: blue">
                            <i class="fas fa-edit"></i> Mượn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClientBookDetail from "@/components/client/ClientBookDetail.vue";
import AppHeaderHome from "./AppHeaderHome.vue";
import ClientInputSearch from "@/components/client/ClientInputSearch.vue";
import ClientBookList from "@/components/client/ClientBookList.vue";
import BookService from "@/services/client/book.service";

export default {
    components: {
        ClientBookDetail,
        ClientInputSearch,
        ClientBookList,
        AppHeaderHome,
    },

    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
            isLoggedIn: false,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {

        booksStrings() {
            return this.books.map((book) => {
                const {
                    name,
                    price,
                    quantity,
                    publishYear,
                    author,
                    thumbnail,
                } = book;
                return [
                    name,
                    price,
                    quantity,
                    publishYear,
                    author,
                    thumbnail,
                ].join("");
            });
        },

        filteredBooks() {
            if (!this.searchText) return this.books;

            return this.books.filter((_book, index) =>
                this.booksStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.searchText = "";
            this.activeIndex = -1;
        },
        borrowBook() {
            if (this.isLoggedIn === false) {
                alert("You need to log in to borrow the book!");
                return;
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
}

.custom-margin {
    margin-right: 10px;

}
</style>