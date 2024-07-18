var app = angular.module("myApp", ["ngRoute"]);

// user
var sinhVienData = [
  {
    username: "123",
    password: "123",
    email: "123@gmail.com",
    birthday: "1995-12-21",
    poin: "0",
  },
  {
    username: "1",
    password: "1",
    email: "123@gmail.com",
    birthday: "1995-12-21",
    poin: "0",
  },
];
window.sinhVienData = sinhVienData;

// login----------------------------
app.controller("loginCtrl", function ($scope, $rootScope) {
  // Nhập mảng từ sinhVien.js
  $rootScope.students = window.sinhVienData;

  $rootScope.student = null;

  $scope.login = function () {
    var isLoginSuccessful = false;
    $rootScope.students.forEach((st) => {
      if (st.username == $scope.username) {
        if (st.password == $scope.password) {
          // Lưu thông tin đăng nhập vào Local Storage
          localStorage.setItem("loggedInUser", JSON.stringify(st));
          // Gán thông tin người dùng vào $rootScope.student
          $rootScope.student = st;
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: "Hãy tiếp tục hành trình",
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(function () {
            var url = "#!info";
          window.location.href = url;
            $scope.$apply();
          }, 1000);
          $scope.username = "";
          $scope.password = "";
          isLoginSuccessful = true;
          return;
        }
      }
    });
    if (!isLoginSuccessful) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại!",
        text: "Hãy thử lại",
      });
    }
  };

  $rootScope.logoff = function () {
    Swal.fire({
      title: "Xác nhận đăng xuất",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        localStorage.removeItem("loggedInUser");
        $rootScope.student = null;
        Swal.fire({
          icon: "success",
          title: "Đã đăng xuất!",
          showConfirmButton: false,
          timer: 1600,
        });
        window.location.href = "#!login";
      }
    });
  };
});


app.controller("navigationCtrl", function ($scope, $rootScope) {
  var loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    $rootScope.student = JSON.parse(loggedInUser);
  } else {
    // Nếu không có người dùng đăng nhập, đặt $rootScope.student thành null
    $rootScope.student = null;
  }
  // đăng ký
  
  $rootScope.logoff = function () {
    Swal.fire({
      title: "Xác nhận đăng xuất",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        localStorage.removeItem("loggedInUser");
        $rootScope.student = null;
        Swal.fire({
          icon: "success",
          title: "Đã đăng xuất!",
          showConfirmButton: false,
          timer: 1600,
        });
        window.location.href = "#!login";
      }
    });
  };

  // kiểm tra tài khoản
  $scope.loged = function () {
    if ($rootScope.student === null) {
      Swal.fire({
        icon: "warning",
        title: "hãy đănh nhập trước khi làm!",
        text: "Hãy thử lại",
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(function () {
        var url = "#!login";
        window.location.href = url;
        $scope.$apply();
      }, 1600);
    } else {
      console.log("Thông tin sinh viên:", $rootScope.student);
    }
  };
});

// lấy lại mật khẩu
app.controller("forgotpasswordCtrl", function ($rootScope, $scope) {
  if (!$rootScope.students || !$rootScope.students.length) {
    $rootScope.students = window.sinhVienData;
  }
  $scope.getPass = function () {
    var username = $scope.username;
    var email = $scope.email;
    //find() sử dụng để kiểm tra điều kiện tìm kiếm cho mỗi phần tử trong mảng.
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

// load ảnh nhân vật----------------
app.controller("ctrlNhanVat", function ($scope, $http) {
  $scope.list_cauHoi = [];
  $scope.currentIndex = 0;

  $http.get("/db/nhanVat.js").then(function (response) {
    $scope.list_cauHoi = response.data;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex]; // Ảnh hiện tại
  });

  $scope.nextImage = function () {
    //tính toán
    $scope.currentIndex = ($scope.currentIndex + 3) % $scope.list_cauHoi.length;
    //hiển thị ảnh
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.prevImage = function () {
    $scope.currentIndex =
      ($scope.currentIndex - 3 + $scope.list_cauHoi.length) %
      $scope.list_cauHoi.length;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.firstImage = function () {
    $scope.currentIndex = 0;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.lastImage = function () {
    $scope.currentIndex = $scope.list_cauHoi.length - 6;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.randomImage = function () {
    $scope.currentIndex = Math.floor(
      Math.random() * ($scope.list_cauHoi.length - 2)
    );
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };
});

// load ảnh map----------------
app.controller("ctrlMap", function ($scope, $http) {
  $scope.list_cauHoi = [];
  $scope.currentIndex = 0;

  $http.get("/db/map.js").then(function (response) {
    $scope.list_cauHoi = response.data;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex]; // Ảnh hiện tại
  });

  $scope.nextImage = function () {
    $scope.currentIndex = ($scope.currentIndex + 3) % $scope.list_cauHoi.length;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.prevImage = function () {
    $scope.currentIndex =
      ($scope.currentIndex - 3 + $scope.list_cauHoi.length) %
      $scope.list_cauHoi.length;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.firstImage = function () {
    $scope.currentIndex = 0;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.lastImage = function () {
    $scope.currentIndex = $scope.list_cauHoi.length - 3;
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };

  $scope.randomImage = function () {
    $scope.currentIndex = Math.floor(
      Math.random() * ($scope.list_cauHoi.length - 2)
    );
    $scope.currentImage = $scope.list_cauHoi[$scope.currentIndex];
  };
});



