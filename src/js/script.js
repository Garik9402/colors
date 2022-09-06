
// настройки слайдера
$(document).ready(function () {
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
const contentProducts = document.querySelectorAll('.products__content')
checkboxNode.forEach(function (elem) {
   elem.addEventListener('click', function () {
      let index = this.dataset.id
      checkboxNode.forEach(function (elem) {
         elem.classList.remove('checkbox--js-active')
      })
      this.classList.add('checkbox--js-active')
      contentProducts.forEach(function (e) {
         e.classList.remove('products__content--js-visible')
      })
      contentProducts[index].classList.add('products__content--js-visible')
   })
})
// добавление товара в корзину + 'количество товара в корзине'

const basketProductsNode = document.querySelector('.basket-popup__products')
window.addEventListener('click', (event) => {
   if (event.target.hasAttribute('data-product')) {
      const product = event.target.closest('.product')

      const productInfo = {
         id: product.dataset.id,
         imgSrc: product.querySelector('.product__img').getAttribute('src'),
         description: product.querySelector('.product__description').innerText,
         price: product.querySelector('.product__price').innerText,
      };
      // проверка есть ли уже товар в корзине 
      const itemInProducts = basketProductsNode.querySelector(`[data-id="${productInfo.id}"]`)
      if (itemInProducts) {
         false
      }
      else {

         const productItemsHtml = `<div class="basket-popup__product" data-id="${productInfo.id}">
             <img class="basket-popup__product-img" src="${productInfo.imgSrc}" alt="${productInfo.description}" >
            <div class="basket-popup__product-content">
               <p class="basket-popup__product-description">${productInfo.description}</p>
               <p class="basket-popup__product-price">${productInfo.price}</p>
            </div>
            <div class="basket-popup__product-amout-w">
               <div class="basket-popup__product-minus" data-action='minus'>-</div>
               <div class="basket-popup__product-amout" data-amout>1</div>
               <div class="basket-popup__product-plus" data-action='plus'>+</div>
            </div>
            <div class="basket-popup__product-delete" data-close='del'>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.2">
                     <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round"
                        stroke-linejoin="round" />
                     <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round"
                        stroke-linejoin="round" />
                  </g>
               </svg>
            </div>
      </div >`;
         basketProductsNode.insertAdjacentHTML('beforeend', productItemsHtml)
      }

      productBasketStatus();
      calc();

   }

})

// открытие и закрыьте корзины
const basketPopupNode = document.querySelector('.basket-popup')
const basketNode = document.querySelector('.header__basket')
const basketBodyNode = document.querySelector('.basket-popup__body')
const closeBasketNode = document.querySelector('.basket-popup__close')
window.addEventListener('click', function (e) {
   if (basketNode.contains(e.target)) {
      basketPopupNode.classList.add('basket-popup--js-open')
      document.body.style.overflow = 'hidden'
   } else if (closeBasketNode.contains(e.target)) {
      basketPopupNode.classList.remove('basket-popup--js-open')
      document.body.style.overflow = 'visible'
   }
   else if (basketBodyNode.contains(e.target)) {
      basketPopupNode.classList.add('basket-popup--js-open')
      document.body.style.overflow = 'hidden'
   }
   else {
      basketPopupNode.classList.remove('basket-popup--js-open')
      document.body.style.overflow = 'visible'
   }
});

//увеличение и уменьшение товара в корзине
window.addEventListener('click', (event) => {
   let amout;
   if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
      const wrapperCounter = event.target.closest('.basket-popup__product-amout-w')
      amout = wrapperCounter.querySelector('.basket-popup__product-amout')
   }
   if (event.target.dataset.action === 'plus') {
      amout.innerText = ++amout.innerText
   }
   if (event.target.dataset.action === 'minus') {
      if (parseInt(amout.innerText) > 1)
         amout.innerText = --amout.innerText
   }

   if (event.target.hasAttribute('data-action') && event.target.closest('.basket-popup__products')) {
      calc()
   }
})


//   подсчет товара в корзине
function calc() {
   const productItems = document.querySelectorAll('.basket-popup__product')
   let totalPrice = 0;
   const totalPriceEl = document.querySelector('.basket-popup__price')

   productItems.forEach(function (elem) {
      const amoutEl = elem.querySelector('[data-amout]')
      const priceEl = elem.querySelector('.basket-popup__product-price')
      const currentPrice = parseInt(amoutEl.innerHTML) * parseInt(priceEl.innerHTML);
      totalPrice += currentPrice


   })
   totalPriceEl.innerText = spaceDigits(totalPrice) + '₽'

}

// количество товара в корзине
const productsNode = document.querySelector('.basket-popup__products')
const productBasketStatus = () => {

   const countProductsNode = document.querySelector('.header__basket-count')
   const countBasketProductsNode = document.querySelector('.basket-popup__amount-products')
   countProductsNode.innerText = productsNode.children.length
   countBasketProductsNode.innerText = (productsNode.children.length + ' товара')
}
// удаление товара из корзины
window.addEventListener('click', (event) => {
   if (event.target.dataset.close === 'del') {
      event.target.closest('.basket-popup__product').remove();
      productBasketStatus()
      calc()
   }
})

// удаление всех товаров из корзины
const clearProductsBsket = () => {
   const clearProduct = document.querySelector('.basket-popup__clear-products')
   clearProduct.addEventListener('click', () => {
      const activeProduct = document.querySelectorAll('.basket-popup__product')
      activeProduct.forEach(function (elem) {
         elem.remove()
      })
      const countProductsNode = document.querySelector('.header__basket-count')
      const countBasketProductsNode = document.querySelector('.basket-popup__amount-products')
      countProductsNode.innerText = productsNode.children.length
      countBasketProductsNode.innerText = (productsNode.children.length + ' товара')
      calc()
   })
}
clearProductsBsket()



// открытие и закрытие фильтра
const filterNode = document.querySelector('.filter')
const filterPopupNode = document.querySelector('.filter-popup')
const opacityContent = document.querySelector('.popup-filter')
const filterPopupMenu = document.querySelector('.filter-popup__menu')
window.addEventListener('click', (e) => {
   if (filterNode.contains(e.target)) {
      filterPopupNode.classList.toggle('filter-popup--js-toggle')
      opacityContent.classList.toggle('popup-filter--js-active')
      document.body.style.overflow = 'hidden'

      if (filterNode.contains(e.target) && (filterPopupNode.contains(e.target))) {
         document.body.style.overflow = 'visible'
      }
   }


   else {
      filterPopupNode.classList.remove('filter-popup--js-toggle')
      opacityContent.classList.remove('popup-filter--js-active')

   }
})


const filterItemLink = document.querySelectorAll('.filter-popup__nav-item-link')
const filterValue = document.querySelector('.filter__name')
filterItemLink.forEach(function (e) {
   e.addEventListener('click', function () {
      filterValue.innerText = this.innerText
      filterItemLink.forEach(function (e) {
         e.classList.remove('filter-popup__nav-item-link--active')
      })
      e.classList.add('filter-popup__nav-item-link--active')
   })

})
function spaceDigits(number) {
   return number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// открытие фильра категорий товаров
const filterCategoryProducts = document.querySelector('.products__filters-checkbox')
let productsPopapCategory = document.querySelector('.filter-products-popup')
window.addEventListener('click', (event) => {
   if (filterCategoryProducts.contains(event.target)) {
      productsPopapCategory.classList.add("filter-products-popup--js-active")
      document.body.style.overflow = 'hidden'
   }
   else {
      productsPopapCategory.classList.remove('filter-products-popup--js-active')
   }

})