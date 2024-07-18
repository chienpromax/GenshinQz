// tinh năng
app.service('tinhNangService', function() {
    var service = this;
    service.panels = [];
    service.setPanels = function(panels) {
        service.panels = panels;
    };
    service.getPanels = function() {
        return service.panels;
    };
    service.removeActiveClasses = function() {
        service.panels.forEach(function(panel) {
            panel.classList.remove('active');
        });
    };
  });
  app.controller('tinhNang', function ($scope, tinhNangService) {
    $scope.panels = document.querySelectorAll('.panel');
    tinhNangService.setPanels($scope.panels);
    $scope.panels.forEach(function(panel) {
        panel.addEventListener('click', function() {
            tinhNangService.removeActiveClasses();
            panel.classList.add('active');
        });
    });
  });

//   chữ
// Service cho hiệu ứng chữ
app.service('hieuUngChuService', function($timeout) {
    var service = this;
    service.sections = [];

    service.setSections = function(sections) {
        service.sections = sections;
    };

    service.checkScroll = function() {
        $timeout(function () {
            angular.element(window).on('scroll', function() {
                service.sections.forEach(function(sec) {
                    let top = window.scrollY;
                    let offset = sec.offsetTop - 150;
                    let height = sec.offsetHeight;

                    if (top >= offset && top < offset + height) {
                        angular.element(sec).addClass('show-animate');
                    } else {
                        angular.element(sec).removeClass('show-animate');
                    }
                });
            });
        }, 0);
    };
});

// Controller cho hiệu ứng chữ
app.controller('hieuUngChu', function($scope, $timeout, hieuUngChuService) {
    $timeout(function () {
        $scope.sections = document.querySelectorAll('section');
        hieuUngChuService.setSections($scope.sections);
        hieuUngChuService.checkScroll();
    }, 0);
});

// Service cho chữ trong about
app.service('aboutService', function() {
    var service = this;

    service.showElements = function() {
        angular.element(document).ready(function () {
            var aboutElements = document.querySelectorAll(".about-info h2, .about-info p");

            aboutElements.forEach(function(element) {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            });
        });
    };
});

// Controller cho chữ trong about
app.controller('aboutController', function($scope, $timeout, aboutService) {
    $timeout(function () {
        aboutService.showElements();
    }, 0);
});
