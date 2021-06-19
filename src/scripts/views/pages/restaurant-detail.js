import Page from ".";
import RestaurantSource from "../../data/restaurant-source";
import CONFIG from "../../globals/config";
import { getPathVariable } from "../../utils/query-parser";
import ScrollHandler from "../../utils/scroll-handler";

class RestaurantDetail extends Page{
    async render(){
        const restaurant = await RestaurantSource.getDetail(getPathVariable());
        const colors = ['#d0f4f4', '#eed5ff', '#ffc0d7', '#fff9c1', '#cfebd2']
        const categoryHTML = restaurant.categories.map((category, index) => {
            return /*html*/ `<span class="pill" style="background-color: ${colors[index%colors.length]}">${category.name}</span>`;
        }).toString().replaceAll(',', '')
        const foodHTML = restaurant.menus.foods.map((food, index) => {
            return /*html*/ `<div class="pill" style="background-color: ${colors[index%colors.length]}">${food.name}</div>`;
        }).toString().replaceAll(',', '')
        const drinkHTML = restaurant.menus.drinks.map((drink, index) => {
            return /*html*/ `<div class="pill" style="background-color: ${colors[index%colors.length]}">${drink.name}</div>`;
        }).toString().replaceAll(',', '')
        const reviewsHTML = restaurant.customerReviews.map((customerReview, index) => {
            return /*html*/ `
                <div class="review-container">
                    <div>
                        <b>${customerReview.name}</b>
                    </div>
                    <div class="review__date">
                        <div>${customerReview.date}</div>
                    </div>
                    <div class="review__customer_review">
                        <div>${customerReview.review}</div>
                    </div>
                </div>
            `;
        }).toString().replaceAll(',', '')
        
        return /*html*/`
            <div style="padding-top: 100px" class="restaurant__detail">
                <div class="restaurant__detail_image">
                    <img src="${CONFIG.IMAGE_BASE_URL(restaurant.pictureId, "large")}" alt=${this._name}>
                    <div class="button__add_to_favorite">
                        <button class="button-primary">Add to favorite</button>
                    </div>
                </div>
                <div class="restaurant__detail_wrapper">
                    <div class="restaurant__detail_info">
                        <div>
                            <div><span class="restaurant__title">${restaurant.name}</span> &bull; ${restaurant.rating}</div>
                            <div class="restaurant__detail_categories">${categoryHTML}</div>
                        </div>
                        <div class="restaurant__detail__location">
                            <div class="restaurant__detail_city">
                                ${restaurant.city}
                            </div>
                            <div class="restaurant__detail_address">
                                ${restaurant.address}
                            </div>
                        </div>
                    </div>
                    <div class="restaurant__detail_description">${restaurant.description}</div>
                    <div class="restaurant__detail_menus">
                        <div>
                            <b>Foods</b>
                            <div class="restaurant__detail_menus_item">
                                ${foodHTML}
                            </div>
                        </div>
                        <div>
                            <b>Drinks</b>
                            <div class="restaurant__detail_menus_item">
                                ${drinkHTML}
                            </div>
                        </div>
                    </div>
                    <h2>Reviews</h2>
                    <div class="restaurant__detail_reviews">
                        ${reviewsHTML}
                    </div>
                    <div>
                        <form class="form-container">                            
                            <input name="id" hidden value="${restaurant.id}">
                            <label for="name">Name</label>
                            <input class="form-control" name="name">
                            <label for="review">Review</label>
                            <textarea class="form-control" name="review"></textarea>
                            <button id="button__submit_review" type="button" class="button-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    async _onButtonReviewClick(){
        const form = document.querySelector('form')
        const data = new FormData(form)
        const response = await RestaurantSource.postReview(data);
    }

    async afterRender(){
        ScrollHandler.remove();
        const buttonReview = document.getElementById('button__submit_review');
        buttonReview.addEventListener('click', () => {this._onButtonReviewClick()})
    }
}

// const RestaurantDetail = {
//     async render(){
//         return `
//             <div style="padding-top: 100px">
//                 <h1>Restaurant Detail</h1>
//             </div>
//         `;
//     },
//     async afterRender(){
//         ScrollHandler.init(0);
//         const restaurant = await RestaurantSource.getDetail(getPathVariable());
//     }
// }

export default RestaurantDetail;