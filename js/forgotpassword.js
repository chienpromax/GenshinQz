// lấy lại mật khẩu
app.controller("forgotpasswordCtrl", function ($rootScope, $scope) {
    if (!$rootScope.students || !$rootScope.students.length) {
      $rootScope.students = window.sinhVienData;
    }
    $scope.getPass = function () {
      var username = $scope.username;
      var email = $scope.email;
      var student = $rootScope.students.find(function (st) {
        return st.username === username && st.email === email;
      });
      if (student) {
        Swal.fire({
          icon: "success",
          title: "Lấy lại tài khoản thành công!",
          text: "Mật khẩu: " + student.password,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lấy lại tài khoản thất bại!",
          text: "Vui lòng kiểm tra lại thông tin",
        });
      }
    };
  });