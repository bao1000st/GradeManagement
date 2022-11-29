<template>
  <div>
    <!-- Nav bar -->
    <nav
      class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row"
    >
      <div class="container">
        <a class="navbar-brand float-left">QUẢN LÝ ĐIỂM</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/"
              >Thêm học sinh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view_students">DS Học Sinh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view_grades">Bảng Điểm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
