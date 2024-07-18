// ============= đổ ảnh =============
window.addEventListener("scroll",(e)=>{
    document.querySelector(".main").style.backgroundSize = `${window.scrollY * 0.5 + 1600}px`
    document.querySelector("#H1").style.opacity = `${(-window.scrollY + 300) * .004}`
    document.querySelector(".btn-see_more").style.opacity = `${(-window.scrollY + 300) * .004}`
    document.querySelector(".line-header").style.opacity = `${(-window.scrollY + 300) * .004}`
    document.querySelector(".about-data").style.opacity = `${(-window.scrollY + 300) * .004}`
});

// ========== tải về =========
function openWindows() {
    alert("Đã tải về phiên bản Window!");
}
function openAppStore() {
    alert("Đã tải về phiên bản Store!");
}
function openMore() {
    alert("Đang phát triển!");
}

// ========== hiệu ứng chữ =========
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    })
}
// =======chữ trong about=======
document.addEventListener("DOMContentLoaded", function () {
    var aboutElements = document.querySelectorAll(".about-info h2, .about-info p");
  
    function showElements() {
      aboutElements.forEach(function (element) {
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";
      });
    }
    showElements();
});

// ========== slide tinh năng =========


// const panels = document.querySelectorAll('.panel');

// panels.forEach((panel) =>{
//     alert('2')
//     panel.addEventListener('click',()=>{
//         removeActiveClasses();
//         panel.classList.add('active');
//     });
// });

// function removeActiveClasses(){
//     panels.forEach((panel) =>{
//         panel.classList.remove('active');
//     });
// }