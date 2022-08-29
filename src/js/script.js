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
//добавление товара в корзину + 'количество товара в корзине'
const countProductsNode = document.querySelector('.header__basket-count')
const proguctsAdd = document.querySelectorAll('.product__add')
 const productsNode = document.querySelectorAll('.product')
let count = 0;
const addProducts = () => {
   proguctsAdd.forEach(function(e){
    e.addEventListener('click', function(){
         count++
         countProductsNode.innerHTML = count
   })
   })
}
addProducts()
// открытие модальных окон 'корзина, фильтр'
 const basketPopupNode = document.querySelector('.basket-popup')
 const basketNode = document.querySelector('.header__basket')
 const basketBodyNode = document.querySelector('.basket-popup__body')
      window.addEventListener('click', function(e) {
             if (basketNode.contains(e.target)|| basketBodyNode.contains(e.target)) {
               basketPopupNode.classList.add('basket-popup--js-open')
               document.body.style.overflow='hidden'
             } else {
                basketPopupNode.classList.remove('basket-popup--js-open')
                document.body.style.overflow='visible'
               }
     });