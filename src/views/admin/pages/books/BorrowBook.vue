<template>
    <div>
      <AppHeader />
      <div class="container mt-3">
        <h3 class="text-danger">
          <b><i>Các đơn mượn sách</i></b>
        </h3>
        <div v-for="(reader, readerIndex) in readers" :key="readerIndex">
          <template v-if="reader.borrow.length > 0">
            <h4>{{ reader.fullName }}</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sách</th>
                  <th>Số lượng</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(borrowedBook, bookIndex) in reader.borrow"
                  :key="bookIndex"
                >
                  <td>{{ bookIndex + 1 }}</td>
                  <td>{{ getBookName(borrowedBook.id_book) }}</td>
                  <td>{{ borrowedBook.quantity }}</td>
                  <td>{{ borrowedBook.borrowDate }}</td>
                  <td>{{ borrowedBook.returnDate }}</td>
                   <td class="text-primary">
                    {{ borrowedBook.status === 'accepted' ? 'Đã duyệt' : borrowedBook.status === 'refused' ? 'Từ chối' : borrowedBook.status === 'returned' ? 'Đã trả' : borrowedBook.status === 'processing' ? 'Chờ xử lí' : 'Unknown' }}
                  </td>
                  <td>
                    <button
                      @click="statusBook(reader, borrowedBook, 'accepted')"
                      class="btn btn-success"
                    >
                      Duyệt
                    </button>
                    <button
                      @click="statusBook(reader, borrowedBook, 'refused')"
                      class="btn btn-danger"
                    >
                      Từ chối
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/admin/AppHeader.vue";
  import BookService from "@/services/admin/book.service";
  import EmplpoyeeService from "@/services/admin/employee.service";
  
  export default {
    components: {
      AppHeader,
    },
    data() {
      return {
        books: [],
        readers: [],
      };
    },
    methods: {
      async retrieveBooks() {
        try {
          this.books = await BookService.getAll();
        } catch (error) {
          console.log(error);
        }
      },
      async retrieveReaders() {
        try {
          this.readers = await EmplpoyeeService.getReaders();
        } catch (error) {
          console.log(error);
        }
      },
      async statusBook(reader, borrowedBook, status) {
        try {
          const response = await EmplpoyeeService.statusBook(
            reader._id,
            borrowedBook.id_book,
            status
          );
          await this.retrieveReaders();
          await this.retrieveBooks();
        } catch (error) {
          console.log(error);
        }
      },
      getBookName(bookId) {
        const book = this.books.find((book) => book._id === bookId);
        return book ? book.name : "Unknown";
      },

    },
    mounted() {
      this.retrieveBooks();
      this.retrieveReaders();
    },
  };
  </script>
  
  <style scoped>
  .page {
    text-align: left;
  }
  
  .text-danger {
    text-align: center;
  }
  
  /* .btn-success {
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  } */
  
  .text-name {
    text-decoration: underline;
    color: #7f7d79;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
  }
  
  th {
    background-color: #8cb2eb;
    color: rgb(3, 3, 3);
  }
  
  tr:hover {
    background-color: #f2f2f2;
  }
  
  td button {
    margin-right: 5px;
  }
  
  td:nth-child(2) {
    text-align: left;
    width: 30%;
  }
  
  td:nth-child(3) {
    width: 7%;
  }
  </style>
  