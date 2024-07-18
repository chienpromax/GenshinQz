app.controller("dangKy", function ($scope, $rootScope) {
    $scope.dangKy = function () {
      if ($scope.matKhau !== $scope.xacNhanMatKhau) {
        Swal.fire({
          icon: "error",
          title: "Xác nhận mật khẩu không đúng!",
          text: "Vui lòng nhập lại mật khẩu và xác nhận mật khẩu giống nhau.",
        });
        return;
      }
      // tên đăng nhập đã tồn tại chưa some() được sử dụng để kiểm tra điều kiện 
      var usernameExist = $rootScope.students.some(function (st) {
        return st.username === $scope.tenDangNhap;
      });
      if (usernameExist) {
        Swal.fire({
          icon: "error",
          title: "Tên đăng nhập đã tồn tại!",
          text: "Vui lòng chọn một tên đăng nhập khác.",
        });
        return;
      }
      var newStudent = {
        username: $scope.tenDangNhap,
        password: $scope.matKhau,
        email: $scope.email,
      };
      //thêm sinh viên
      $rootScope.students.push(newStudent);
      localStorage.setItem("loggedInUser", JSON.stringify(newStudent));
      $rootScope.student = newStudent;
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công!",
        text: "Chào mừng bạn đã đến với hệ thống.",
      });
      var url = "login.html";
      window.location.href = url;
    };
  });
  