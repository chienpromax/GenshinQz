app.controller("registerCtrl", function ($scope) {
  $scope.isValidEmail = function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test($scope.email);
  };

  $scope.sinhVienData = window.sinhVienData || [];
  $scope.dangKy = function () {
    if (!$scope.tenDangNhap) {
      Swal.fire({
        icon: "warning",
        title: "Nhập tên đăng nhập",
        text: "Hãy thử lại",
        timer: 1600,
        showConfirmButton: false,
      });
      return;
    }
    if (!$scope.matKhau) {
      Swal.fire({
        icon: "warning",
        title: "Nhập mật khẩu phù hợp",
        text: "Hãy thử lại",
        timer: 1600,
        showConfirmButton: false,
      });
      return;
    }
    if ($scope.matKhau !== $scope.xacNhanMatKhau) {
      Swal.fire({
        icon: "warning",
        title: "Xác nhận mật khẩu không khớp",
        text: "Hãy thử lại",
        timer: 1600,
        showConfirmButton: false,
      });
      return;
    }
    var existingUser = $scope.sinhVienData.find(function (sv) {
      return sv.username === $scope.tenDangNhap;
    });

    if (existingUser) {
      Swal.fire({
        icon: "warning",
        title: "Tên đăng nhập đã tồn tại",
        text: "Hãy thử lại",
        timer: 1600,
        showConfirmButton: false,
      });
      return;
    }
    if (!$scope.isValidEmail()) {
      Swal.fire({
        icon: "warning",
        title: "Địa chỉ email không hợp lệ",
        text: "Hãy thử lại",
        timer: 1600,
        showConfirmButton: false,
      });
      return;
    }
    var newSinhVien = {
      username: $scope.tenDangNhap,
      password: $scope.matKhau,
      email: $scope.email,
      // fullname: $scope.hoTen,
    };
    $scope.sinhVienData.push(newSinhVien);
    Swal.fire({
      icon: "success",
      title: "Đăng ký thành công",
      showConfirmButton: false,
      timer: 1600,
    });
    console.log("Thông tin sinh viên vừa đăng ký:", newSinhVien);
    $scope.tenDangNhap = "";
    $scope.matKhau = "";
    $scope.xacNhanMatKhau = "";
    $scope.email = "";
  };
});
