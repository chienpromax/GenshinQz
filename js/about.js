
// Định nghĩa controller
app.controller('aboutCtrl', function ($scope, $timeout, $window) {
    let items = document.querySelectorAll('.slider .list .item');
    let thumbnails = document.querySelectorAll('.thumbnail .item');
    let countItem = items.length;
    let itemActive = 0;
    let manualChange = false;
    let timeRemaining = 7000; // Thời gian giữa các chuyển động ảnh (miliseconds)
    let timeout;

    $scope.reloadPage = function () {
        $window.location.reload();
    };

    function showNextSlide() {
        itemActive = (itemActive + 1) % countItem;
        showSlider();
        console.log("chuyển ảnh")
    }

    function showPrevSlide() {
        itemActive = (itemActive - 1 + countItem) % countItem;
        showSlider();
        console.log("chuyển ảnh")

    }

    function logMessage(message) {
        console.log(message);
    }

    function showSlider() {
        let itemActiveOld = document.querySelector('.slider .list .item.active');
        let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

        if (itemActiveOld) {
            itemActiveOld.classList.remove('active');
        }
        if (thumbnailActiveOld) {
            thumbnailActiveOld.classList.remove('active');
        }

        if (items[itemActive] && thumbnails[itemActive]) {
            items[itemActive].classList.add('active');
            thumbnails[itemActive].classList.add('active');
        }

        timeRemaining = 7000; // Reset thời gian giữa các chuyển động ảnh
        resetTimeout(); // Reset timeout mỗi khi slider được cập nhật
    }

    // function startTimeout() {
    //     timeout = $timeout(function () {
    //         if (!manualChange) {
    //             showNextSlide();
    //             startTimeout();
    //         }
    //     }, 5000);
    // }

    // function resetTimeout() {
    //     $timeout.cancel(timeout);
    //     timeout = startTimeout();
    // }

    function showAlert(message) {
        $window.alert(message);
    }

    document.getElementById('next').addEventListener('click', function () {
        manualChange = true;
        showNextSlide();
        manualChange = false;
    });

    document.getElementById('prev').addEventListener('click', function () {
        manualChange = true;
        showPrevSlide();
        manualChange = false;
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            manualChange = true;
            itemActive = index;
            showSlider();
            manualChange = false;
        });
    });

    window.addEventListener('load', function () {
        itemActive = 0;
        showSlider();
        // startTimeout();
    });
});



