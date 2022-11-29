<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Họ tên</th>
            <th>Môn học</th>
            <th>Điểm Số</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in Grades" :key="grade._id">
            <td>{{ grade.name }}</td>
            <td>{{ grade.course }}</td>
            <td>{{ grade.score }}</td>
            <td>
              <router-link
                :to="{ name: 'edit_grade', params: { id: grade._id } }"
                class="btn btn-success"
                >Chỉnh
              </router-link>
              <button
                @click.prevent="deleteGrade(grade._id)"
                class="btn btn-danger"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Grades: [],
    };
  },
  created() {
    let apiURL = "http://localhost:4000/gradeapi";
    axios
      .get(apiURL)
      .then((res) => {
        this.Grades = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteGrade(id) {
      let apiURL = `http://localhost:4000/gradeapi/delete-grade/${id}`;
      let indexOfArrayItem = this.Grades.findIndex((i) => i._id === id);

      if (window.confirm("Bạn có muốn xóa điểm số này?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Grades.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>
