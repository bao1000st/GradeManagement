<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">THÊM ĐIỂM</h3>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.name"
            required
            disabled
          />
        </div>

        <div class="form-group">
          <label>Môn học</label>
          <input
            type="text"
            class="form-control"
            v-model="grade.course"
            required
          />
        </div>

        <div class="form-group">
          <label>Điểm số</label>
          <input
            type="number"
            class="form-control"
            v-model="grade.score"
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <br>
        <div class="form-group">
          <button class="btn btn-danger btn-block">Thêm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      grade: {
        studentId: "",
        name: "",
        course: "",
        score: "",
      },
    };
  },
  created() {
    let apiURL = `http://localhost:4000/studentapi/edit-student/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.grade.name = res.data.name;
      this.grade.studentId = this.$route.params.id;
    });
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/gradeapi/create-grade";

      axios
        .post(apiURL, this.grade)
        .then(() => {
          this.$router.push("/view_students");
          this.grade = {
            studentId: "",
            name: "",
            course: "",
            score: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
