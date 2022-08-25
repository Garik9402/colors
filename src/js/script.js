 // настройки слайдера
$(document).ready(function() {
   $(".slider").slick({
       arrows: true,
       dots: true,
       slidesToShow: 1,
       speed: 1000,
       autoplay: true,
       slidesToScroll: 1,
     
   });
});

// активный checkbox
const checkboxNode = document.querySelectorAll('.checkbox')
checkboxNode.forEach(function(elem){
   elem.addEventListener('click', function(){
      checkboxNode.forEach(function (elem){
         elem.classList.remove('checkbox--js-active')
      })
      this.classList.add('checkbox--js-active')
   })
})