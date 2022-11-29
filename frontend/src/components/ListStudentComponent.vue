<template>
  <div class="row">
    <div class="col-md-8">
      <!-- search Bar -->
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nhập thông tin cần tìm"
          v-model="searchKey"
          @keyup.enter="search()"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="search()"
            >Tìm kiếm
          </button>
        </div>
      </div>
      <br>
      <div>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="getAllStudents()"
            >Tải lại
          </button>
      </div>
      <!-- Student Table -->
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Liên hệ</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in Students" :key="student._id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>
              <button
                @click="findGrades(student._id)"
                class="btn btn-info"
                style="margin-right: 10px"
              >
                Thông tin
              </button>
              <router-link
                :to="{ name: 'edit_student', params: { id: student._id } }"
                class="btn btn-success"
                >Chỉnh
              </router-link>
              <button
                @click.prevent="deleteStudent(student._id)"
                class="btn btn-danger"
                style="margin-right: 10px"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Student Info -->
    <div class="col-md-4">
      <div class="card" v-if="currentStudentTrigger === true">
        <div class="card-body">

          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Họ tên</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{currentStudent.name}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Email</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{currentStudent.email}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Liên hệ</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{currentStudent.phone}}</p>
            </div>
          </div>
          <hr>
          <h5>Điểm số:</h5>
          <table>
            <tbody>
              <tr v-for="grade in currentStudentGrades" :key="grade._id">
                <td><b>- {{ grade.course }}</b>:</td>
                <td>{{ grade.score }}</td>
              </tr>
            </tbody>
          </table>
          <hr>
          <div class="container">
            <div class="row">
              <div class="col text-center">
                <router-link
                      :to="{ name: 'create_grade', params: { id: currentStudent._id } }"
                      class="btn btn-success"
                      style="align"
                      >Thêm điểm
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Students: [],
      currentStudent: {},
      currentStudentTrigger: false,
      currentStudentGrades: [],
      searchKey: "",
    };
  },
  created() {
    let apiURL = "http://localhost:4000/studentapi";
    axios
      .get(apiURL)
      .then((res) => {
        this.Students = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getAllStudents() {
      let apiURL = "http://localhost:4000/studentapi";
      axios
        .get(apiURL)
        .then((res) => {
          this.Students = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      let apiURL = `http://localhost:4000/studentapi/search/${this.searchKey}`;
      axios
        .get(apiURL)
        .then((res) => {
          this.Students = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      
    },
    deleteStudent(id) {
      let apiURL1 = `http://localhost:4000/studentapi/delete-student/${id}`;
      let indexOfArrayItem = this.Students.findIndex((i) => i._id === id);

      if (window.confirm("Bạn có muốn xóa học sinh này?")) {
        axios
          .delete(apiURL1)
          .then(() => {
            this.Students.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      let apiURL2 = `http://localhost:4000/gradeapi/delete-grades/${id}`;
      axios.delete(apiURL2)
    },
    findGrades(studentId) {
      let apiURL1 = `http://localhost:4000/studentapi/edit-student/${studentId}`
      axios
        .get(apiURL1)
        .then((res) => {
          this.currentStudentTrigger = true;
          this.currentStudent = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    let apiURL2 = `http://localhost:4000/gradeapi/find-grades/${studentId}`
    axios
      .get(apiURL2)
      .then((res) => {
        this.currentStudentGrades = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },

};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>
