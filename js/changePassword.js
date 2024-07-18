app.controller("changePassword", [
  "$scope",
  "$rootScope",
  function ($scope, $rootScope) {
    $scope.changePassword = function () {
      // Lấy thông tin sinh viên từ localStorage
      var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      // Kiểm tra mật khẩu hiện tại có khớp không
      if ($scope.password !== loggedInUser.password) {
        Swal.fire({
          icon: "error",
          title: "Mật khẩu hiện tại không chính xác",
          text: "Hãy thử lại",
          timer: 1600,
          showConfirmButton: false,
        });
        return;
      }
      if (!$scope.password1) {
        Swal.fire({
          icon: "error",
          title: "Hãy nhập mật khẩu mới",
          text: "Hãy thử lại",
          timer: 1600,
          showConfirmButton: false,
        });
        return;
      }
      // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp nhau không
      if ($scope.password1 !== $scope.password2) {
        Swal.fire({
          icon: "error",
          title: "Xác nhận mật khẩu mới không khớp",
          text: "Hãy thử lại",
          timer: 1600,
          showConfirmButton: false,
        });
        return;
      }
      // Cập nhật mật khẩu mới
      loggedInUser.password = $scope.password1;
      // Cập nhật thông tin trong localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      // Cập nhật thông tin trong $rootScope
      $rootScope.student.password = $scope.password1;
      Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công",
        showConfirmButton: false,
        timer: 1600,
      });
      // Xóa các trường dữ liệu trong $scope
      $scope.password = "";
      $scope.password1 = "";
      $scope.password2 = "";
    };
  },
]);
