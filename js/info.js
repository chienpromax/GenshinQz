// app.controller("editProfileCtrl", ['$scope', '$rootScope', function ($scope, $rootScope) {
//     $scope.user = angular.copy($rootScope.student);
//     $scope.user.birthday = new Date($scope.user.birthday);
//     $scope.confirmEdit = function () {
//         $scope.user.password = $rootScope.student.password;
//         var editedInfo = {
//             username: $scope.user.username,
//             email: $scope.user.email,
//             birthday: $scope.user.birthday,
//             password: $scope.user.password
//         };
//         var index = sinhVienData.findIndex(function (sv) {
//             return sv.username === $scope.user.username;
//         });
//         if (index !== -1) {
//             sinhVienData[index] = editedInfo;
//         }
//         $rootScope.student = editedInfo;
//         localStorage.setItem('sinhVienData', JSON.stringify(sinhVienData));
//         Swal.fire({
//             icon: "success",
//             title: "Thông tin đã được cập nhật!",
//             showConfirmButton: false,
//             timer: 1600,
//         });
//         // $scope.user = {};
//     };
// }]);

app.controller("editProfileCtrl", ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.user = angular.copy($rootScope.student);
    $scope.user.birthday = new Date($scope.user.birthday);
    $scope.confirmEdit = function () {
        // Kiểm tra các trường không được bỏ trống
        if (!$scope.user.username || !$scope.user.email || !$scope.user.birthday) {
            Swal.fire({
                icon: "warning",
                title: "Vui lòng điền đầy đủ thông tin",
                text: "Hãy thử lại",
                timer: 1600,
                showConfirmButton: false,
            });
            return;
        }
        // Lưu thông tin chỉnh sửa
        $scope.user.password = $rootScope.student.password;
        var editedInfo = {
            username: $scope.user.username,
            email: $scope.user.email,
            birthday: $scope.user.birthday,
            // password: $scope.user.password,
            poin: $scope.user.poin,
        };
        // Cập nhật thông tin trong mảng sinhVienData
        var index = sinhVienData.findIndex(function (sv) {
            return sv.username === $scope.user.username;
        });
        if (index !== -1) {
            sinhVienData[index] = editedInfo;
        }
        // Cập nhật thông tin trong $rootScope.student
        $rootScope.student = editedInfo;
        // Lưu thông tin vào localStorage
        localStorage.setItem('sinhVienData', JSON.stringify(sinhVienData));
        // Hiển thị thông báo thành công
        Swal.fire({
            icon: "success",
            title: "Thông tin đã được cập nhật!",
            showConfirmButton: false,
            timer: 1600,
        });
    };
}]);










