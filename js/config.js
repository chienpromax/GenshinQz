app.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "view/index.html",
        controller: "tinhNang",
      })
      .when("/about", {
        templateUrl: "view/about.html",
        controller: "aboutCtrl"
      })
      .when("/contact", {
        templateUrl: "view/contact.html",
      })
      .when("/login", {
        templateUrl: "view/login.html",
        controller: "loginCtrl"
      })
      .when("/register", {
        templateUrl: "view/register.html",
        controller: "registerCtrl"
      })
      .when("/forgotPassword", {
        templateUrl: "view/forgotPassword.html",
      })
      .when("/changePassword", {
        templateUrl: "view/changePassword.html",
        controller: "changePassword"
      })
      .when("/info", {
        templateUrl: "view/info.html",
        controller: "editProfileCtrl"
      })
      .when("/question", {
        templateUrl: "view/question.html",
        controller: "navigationCtrl",
      })
      .when("/nhanVat", {
        templateUrl: "app/nhanVat.html",
      })
      .when("/lamBai/:id/:name", {
        templateUrl: "app/quiz-app.html",
        controller: "quizsCtrl",
      });
  });