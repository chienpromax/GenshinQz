// app.controller("quizsCtrl", function ($scope, $http, $routeParams, quizFactory) {
//     $http.get("/db/Quizs/" + $routeParams.id + ".js").then(function (res) {
//       quizFactory.questions = res.data;
//     });
//   }
// );

// app.directive("quizGame", function (quizFactory, $routeParams) {
//   return {
//     restrict: "AE",
//     scope: {},
//     template: '<div ng-include="quizTemplateUrl"></div>',
//     link: function (scope, element, attrs) {
//       scope.start = function () {
//         quizFactory.getQuestions().then(function () {
//           scope.tenNhanVat = $routeParams.name;
//           scope.anhNhanVat = $routeParams.logo;
//           console.log("name: " + $routeParams.name);
//           console.log("logo: " + $routeParams.logo);
//           scope.id = 1;
//           scope.quizOver = false;
//           scope.inProgess = true;
//           scope.getQuestion();
//           scope.startCountdown();
//         });
//       };
//       scope.reset = function () {
//         scope.inProgess = false;
//         scope.quizOver = false;
//         scope.score = 0;
//         clearInterval(scope.countdown);
//         scope.timeLeft = 600;
//         scope.startCountdown();
//       };
//       scope.quizTemplateUrl = "app/quiz.html";

//       scope.getQuestion = function () {
//         var quiz = quizFactory.getQuestion(scope.id);
//         if (quiz) {
//           scope.question = quiz.Text;
//           scope.options = quiz.Answers;
//           scope.answer = quiz.AnswerId;
//           scope.answerMode = true;
//         } else {
//           scope.quizOver = true;
//         }
//       };

//       scope.checkAnswer = function () {
//         var selectedAnswer = document.querySelector(
//           "input[name=answer]:checked"
//         );
//         if (!selectedAnswer) return;
//         var ans = selectedAnswer.value;
//         if (ans == scope.answer) {
//           Swal.fire({
//             icon: "success",
//             title: "Đáp án chính xác",
//             showConfirmButton: false,
//             timer: 1600,
//           });
//           scope.score++;
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Đáp án Sai",
//             showConfirmButton: false,
//             timer: 1600,
//           });
//         }
//         scope.answerMode = false;
//       };
//       scope.nextQuestion = function () {
//         scope.id++;
//         scope.getQuestion();
//       };
//       scope.endQuestion = function () {
//         scope.quizOver = true;
//         Swal.fire({
//           icon: "error",
//           title: "Kết thúc bài kiểm tra",
//           text: "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
//           showConfirmButton: true,
//         })
//       };

//       //=== đếm ngược===
//       scope.onTimeout = function () {
//         if (!scope.quizOver) {
//           scope.quizOver = true;
//           Swal.fire({
//             icon: "error",
//             title: "Hết giờ",
//             text: "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
//             showConfirmButton: true,
//           });
//         }
//       };

//       scope.startCountdown = function () {
//         clearInterval(scope.countdown);
//         scope.countdown = setInterval(function () {
//           scope.$apply(function () {
//             if (scope.timeLeft > 0) {
//               scope.timeLeft--;
//             } else {
//               clearInterval(scope.countdown);
//               scope.onTimeout();
//             }
//           });
//         }, 1000);
//       };
//       scope.formatTime = function (seconds) {
//         var minutes = Math.floor(seconds / 60);
//         var remainingSeconds = seconds % 60;
//         return (
//           minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
//         );
//       };
//       scope.reset();
//     },
//   };
// });
//
// app.factory("quizFactory", function ($http, $routeParams) {
//   return {
//     getQuestions: function () {
//       return $http
//         .get("/db/Quizs/" + $routeParams.id + ".js")
//         .then(function (res) {
//           questions = res.data;
//           console.log("/db/Quizs/" + $routeParams.id + ".js");
//         });
//     },
//     getQuestion: function (id) {
//       var randomItem = questions[Math.floor(Math.random() * questions.length)];
//       var count = questions.length;
//       if (count > 11) {
//         count = 11;
//       }
//       if (id < count) {
//         return randomItem;
//       } else {
//         return false;
//       }
//     },
//   };
// });

//có quay lại
app.controller(
  "quizsCtrl",
  function ($scope, $http, $routeParams, quizFactory) {
    $http.get("/db/Quizs/" + $routeParams.id + ".js").then(function (res) {
      quizFactory.questions = res.data;
    });
  }
);

app.directive("quizGame", function (quizFactory, $rootScope, $routeParams) {
  return {
    restrict: "AE",
    scope: {},
    template: '<div ng-include="quizTemplateUrl"></div>',
    link: function (scope, element, attrs) {
      scope.start = function () {
        quizFactory.getQuestions().then(function () {
          scope.tenNhanVat = $routeParams.name;
          scope.anhNhanVat = $routeParams.logo;
          console.log("name: " + $routeParams.name);
          console.log("logo: " + $routeParams.logo);
          scope.id = 0;
          scope.quizOver = false;
          scope.inProgess = true;
          scope.getQuestion();
          scope.startCountdown();
        });
      };
      scope.reset = function () {
        scope.inProgess = false;
        scope.quizOver = false;
        scope.score = 0;
        clearInterval(scope.countdown);
        scope.timeLeft = 600;
        scope.startCountdown();
        quizFactory.reset();
      };
      scope.quizTemplateUrl = "app/quiz.html";

      // scope.getQuestion = function () {
      //   var quiz = quizFactory.getQuestion(scope.id);
      //   if (quiz) {
      //     scope.question = quiz.Text;
      //     scope.options = quiz.Answers;
      //     scope.answer = quiz.AnswerId;
      //     scope.answerMode = true;
      //   } else {
      //     scope.quizOver = true;
      //   }
      // };
      scope.getQuestion = function () {
        scope.answered = false; // Thiết lập lại biến answered về false khi lấy câu hỏi mới
        var quiz = quizFactory.getQuestion(scope.id);
        if (quiz) {
          scope.question = quiz.Text;
          scope.options = quiz.Answers;
          scope.answer = quiz.AnswerId;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };

      // Trước hết, bạn cần khai báo một mảng để lưu trữ các câu đã được trả lời đúng
      var answeredCorrectly = [];

      scope.checkAnswer = function () {
        var selectedAnswer = document.querySelector("input[name=answer]:checked");
        if (!selectedAnswer) {
          Swal.fire({
            icon: "warning",
            title: "Hãy chọn 1 đáp ",
            showConfirmButton: false,
            timer: 1600,
          });
          return;
        } else {
          Swal.fire({
            icon: "success",
            title: "Đã chọn",
            showConfirmButton: false,
            timer: 1600,
          });
        }

        var ans = selectedAnswer.value;
        var answeredCorrectlyIndex = answeredCorrectly.indexOf(scope.id);
        // Kiểm tra xem câu trả lời đã được chọn trước đó chưa
        if (answeredCorrectlyIndex === -1) {
          // Nếu câu trả lời chưa được chọn trước đó
          if (ans == scope.answer) {
            scope.score++;
            answeredCorrectly.push(scope.id); // Thêm câu hỏi vào danh sách đã được trả lời đúng
          }
        } else {
          // Nếu câu trả lời đã được chọn đúng trước đó
          if (ans != scope.answer) {
            scope.score--; // Trừ điểm nếu chọn sai đáp án
            answeredCorrectly.splice(answeredCorrectlyIndex, 1); // Xóa câu hỏi khỏi danh sách đã được trả lời đúng
          }
        }
        scope.answerMode = false;
      };

      // scope.checkAnswer = function () {
      //   var selectedAnswer = document.querySelector(
      //     "input[name=answer]:checked"
      //   );
      //   if (!selectedAnswer)
      //     Swal.fire({
      //       icon: "warning",
      //       title: "Hãy chọn 1 đáp ",
      //       showConfirmButton: false,
      //       timer: 1600,
      //     });
      //   var ans = selectedAnswer.value;
      //   if (ans == scope.answer) {
      //     scope.score++;
      //   }
      //   Swal.fire({
      //     icon: "success",
      //     title: "Đã chọn",
      //     showConfirmButton: false,
      //     timer: 1600,
      //   });
      //   scope.answerMode = false;
      // };

      scope.nextQuestion = function () {
        if (scope.id < 9) {
          scope.id++;
        } else {
          Swal.fire({
            icon: "info",
            title: "Đã đến câu cuối cùng",
            text: "Bạn đã đến câu cuối cùng của bài kiểm tra.",
            showConfirmButton: true,
          });
          return;
        }
        scope.getQuestion();
      };

      scope.priveQuestion = function () {
        if (scope.id > 0) {
          scope.id--;
          var quiz = quizFactory.getQuestion(scope.id);
          if (quiz) {
            scope.question = quiz.Text;
            scope.options = quiz.Answers;
            scope.answer = quiz.AnswerId;
            scope.answerMode = true;
          }
        }
      };

      scope.endQuestion = function () {
        scope.quizOver = true;
        Swal.fire({
          icon: "error",
          title: "Kết thúc bài kiểm tra",
          text:
            "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
          showConfirmButton: true,
        }).then(function () {
          $rootScope.updateScore(scope.score);
        });
      };

      //=== đếm ngược===
      scope.onTimeout = function () {
        if (!scope.quizOver) {
          scope.quizOver = true;
          Swal.fire({
            icon: "error",
            title: "Hết giờ",
            text:
              "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
            showConfirmButton: true,
          }).then(function () {
            $rootScope.updateScore(scope.score);
          });
        }
        scope.endQuestion();
      };
      scope.startCountdown = function () {
        clearInterval(scope.countdown);
        scope.countdown = setInterval(function () {
          scope.$apply(function () {
            if (scope.timeLeft > 0) {
              scope.timeLeft--;
            } else {
              clearInterval(scope.countdown);
              scope.onTimeout();
            }
          });
        }, 1000);
      };
      scope.formatTime = function (seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return (
          minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
        );
      };
      scope.reset();
    },
  };
});

app.factory("quizFactory", function ($http, $routeParams) {
  var selectedIndexes = [];
  var questions = [];
  var selectedOptions = [];
  return {
    getQuestions: function () {
      return $http
        .get("/db/Quizs/" + $routeParams.id + ".js")
        .then(function (res) {
          questions = res.data;
        });
    },
    getQuestion: function (index) {
      if (index >= questions.length || selectedIndexes.includes(index)) {
        return false;
      }
      var question = questions[index];
      // Kiểm tra xem đã có đáp án nào được chọn cho câu hỏi này chưa
      if (selectedOptions[index]) {
        question.selectedOption = selectedOptions[index];
      }
      return question;
    },
    getSelectedOptions: function () {
      return selectedOptions;
    },
    setSelectedOption: function (index, optionId) {
      selectedOptions[index] = optionId;
    },
  };
});

app.run([
  "$rootScope",
  function ($rootScope) {
    $rootScope.updateScore = function (score) {
      // Tìm sinh viên hiện tại trong mảng sinh viên
      var index = sinhVienData.findIndex(function (sv) {
        return sv.username === $rootScope.student.username;
      });
      // Nếu tìm thấy, cập nhật điểm
      if (index !== -1) {
        sinhVienData[index].poin = score.toString();
        // Cập nhật localStorage
        localStorage.setItem("sinhVienData", JSON.stringify(sinhVienData));
        // Cập nhật điểm trong $rootScope.student
        $rootScope.student.poin = score.toString();
        // Hiển thị thông báo thành công
        Swal.fire({
          icon: "success",
          title: "Điểm của bạn đã được cập nhật!",
          showConfirmButton: false,
          timer: 1600,
        });
      } else {
        // Hiển thị thông báo lỗi nếu không tìm thấy sinh viên
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy sinh viên!",
          text: "Đã xảy ra lỗi trong quá trình cập nhật điểm.",
          showConfirmButton: true,
        });
      }
    };
  },
]);

// app.controller(
//   "quizsCtrl",
//   function ($scope, $http, $routeParams, quizFactory) {
//     $http.get("/db/Quizs/" + $routeParams.id + ".js").then(function (res) {
//       quizFactory.questions = res.data;
//     });
//   }
// );

// //các thành phần của giao diện người dùng, cho phép mở rộng HTML với các thuộc tính và hành vi tùy chỉnh. 
// app.directive("quizGame", function (quizFactory, $rootScope, $routeParams) {
//   return {
//     //Thuộc tính restrict xác định cách sử dụng directive.
//     //Trong trường hợp này, "AE" có nghĩa là directive này có thể được sử dụng
//     //như một phần tử hoặc một thuộc tính của một phần tử.
//     restrict: "AE",
//     scope: {},
//     template: '<div ng-include="quizTemplateUrl"></div>',
//     link: function (scope, element, attrs) {
//       scope.start = function () {
//         quizFactory.getQuestions().then(function () {
//           scope.tenNhanVat = $routeParams.name;
//           scope.anhNhanVat = $routeParams.logo;
//           console.log("name: " + $routeParams.name);
//           console.log("logo: " + $routeParams.logo);
//           scope.id = 1;
//           scope.quizOver = false;
//           scope.inProgess = true;
//           scope.getQuestion();
//           scope.startCountdown();
//         });
//       };
//       scope.reset = function () {
//         scope.inProgess = false;
//         scope.quizOver = false;
//         scope.score = 0;
//         clearInterval(scope.countdown);
//         scope.timeLeft = 600;
//         scope.startCountdown();
//         quizFactory.reset();
//       };
//       scope.quizTemplateUrl = "app/quiz.html";

//       scope.getQuestion = function () {
//         var quiz = quizFactory.getQuestion(scope.id);
//         if (quiz) {
//           scope.question = quiz.Text;
//           scope.options = quiz.Answers;
//           scope.answer = quiz.AnswerId;
//           scope.answerMode = true;
//         } else {
//           scope.quizOver = true;
//         }
//       };

//       scope.checkAnswer = function () {
//         var selectedAnswer = document.querySelector(
//           "input[name=answer]:checked"
//         );
//         if (!selectedAnswer)
//           Swal.fire({
//             icon: "warning",
//             title: "Hãy chọn 1 đáp ",
//             showConfirmButton: false,
//             timer: 1600,
//           });
//           if (selectedAnswer)
//           Swal.fire({
//             icon: "success",
//             title: "Đã chọn",
//             showConfirmButton: false,
//             timer: 1600,
//           });
//         var ans = selectedAnswer.value;
//         if (ans == scope.answer) {
//           // Swal.fire({
//           //   icon: "success",
//           //   title: "Đáp án chính xác",
//           //   showConfirmButton: false,
//           //   timer: 1600,
//           // });
//           scope.score++;
//         } else {
//           // Swal.fire({
//           //   icon: "error",
//           //   title: "Đáp án Sai",
//           //   showConfirmButton: false,
//           //   timer: 1600,
//           // });
//         }
//         scope.answerMode = false;
//       };

//       scope.nextQuestion = function () {
//         if (scope.id < 10) {
//           scope.id++;
//           scope.getQuestion();
//         } else {
//           scope.endQuestion();
//         }
//       };
//       scope.endQuestion = function () {
//         scope.quizOver = true;
//         Swal.fire({
//           icon: "error",
//           title: "Kết thúc bài kiểm tra",
//           text:
//             "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
//           showConfirmButton: true,
//         }).then(function () {
//           $rootScope.updateScore(scope.score);
//         });
//       };

//       //=== đếm ngược===
//       scope.onTimeout = function () {
//         if (!scope.quizOver) {
//           scope.quizOver = true;
//           Swal.fire({
//             icon: "error",
//             title: "Hết giờ",
//             text:
//               "Bài kiểm tra đã kết thúc. Điểm của bạn: " + scope.score + "/10",
//             showConfirmButton: true,
//           }).then(function () {
//             $rootScope.updateScore(scope.score);
//           });
//         }
//         scope.endQuestion();
//       };
//       scope.startCountdown = function () {
//         clearInterval(scope.countdown);
//         scope.countdown = setInterval(function () {
//           scope.$apply(function () {
//             if (scope.timeLeft > 0) {
//               scope.timeLeft--;
//             } else {
//               clearInterval(scope.countdown);
//               scope.onTimeout();
//             }
//           });
//         }, 1000);
//       };
//       scope.formatTime = function (seconds) {
//         var minutes = Math.floor(seconds / 60);
//         var remainingSeconds = seconds % 60;
//         return (
//           minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
//         );
//       };
//       scope.reset();
//     },
//   };
// });

// app.factory("quizFactory", function ($http, $routeParams) {
//   var selectedIndexes = [];
//   return {
//     getQuestions: function () {
//       return $http
//         .get("/db/Quizs/" + $routeParams.id + ".js")
//         .then(function (res) {
//           questions = res.data;
//           console.log("/db/Quizs/" + $routeParams.id + ".js");
//         });
//     },
//     getQuestion: function (id) {
//       if (selectedIndexes.length >= 10) {
//         return false;
//       }
//       var randomIndex;
//       do {
//         randomIndex = Math.floor(Math.random() * questions.length);
//       } while (selectedIndexes.includes(randomIndex));
//       selectedIndexes.push(randomIndex);
//       return questions[randomIndex];
//     },
//     reset: function () {
//       selectedIndexes = []; // Đặt lại mảng selectedIndexes
//     },
//   };
// });


// app.run([
//   "$rootScope",
//   function ($rootScope) {
//     $rootScope.updateScore = function (score) {
//       // Tìm sinh viên hiện tại trong mảng sinh viên
//       var index = sinhVienData.findIndex(function (sv) {
//         return sv.username === $rootScope.student.username;
//       });
//       // Nếu tìm thấy, cập nhật điểm
//       if (index !== -1) {
//         sinhVienData[index].poin = score.toString();
//         // Cập nhật localStorage
//         localStorage.setItem("sinhVienData", JSON.stringify(sinhVienData));
//         // Cập nhật điểm trong $rootScope.student
//         $rootScope.student.poin = score.toString();
//         // Hiển thị thông báo thành công
//         Swal.fire({
//           icon: "success",
//           title: "Điểm của bạn đã được cập nhật!",
//           showConfirmButton: false,
//           timer: 1600,
//         });
//       } else {
//         // Hiển thị thông báo lỗi nếu không tìm thấy sinh viên
//         Swal.fire({
//           icon: "error",
//           title: "Không tìm thấy sinh viên!",
//           text: "Đã xảy ra lỗi trong quá trình cập nhật điểm.",
//           showConfirmButton: true,
//         });
//       }
//     };
//   },
// ]);
