import { mount, createLocalVue } from "@vue/test-utils";
import Footer from "../components/Footer.vue";
import NavBar from "../components/NavBar.vue";
import Book from "../components/Book.vue";
import Listing from "../components/Listing.vue";
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("Footer.vue", () => {
    it("renders the correct footer message when instantiated", () => {
        const msg = "LibTrade © 2020 | All Rights Reserved";
        const wrapper = mount(Footer, {localVue, router});
        expect(wrapper.text()).toMatch(msg);
        wrapper.destroy();
    })
})

describe("NavBar.vue", () => {
    it("Displays the correct information on the NavBar", () => {
        const wrapper = mount(NavBar, {localVue, router});
        expect(wrapper.text()).toMatch("LibTrade");
        expect(wrapper.text()).toMatch("Home");
        expect(wrapper.text()).toMatch("Register");
        expect(wrapper.text()).toMatch("Book Listings");
    })
    it("Displays the Log In and not the Log Out button when a user is logged out", () => {
        const wrapper = mount(NavBar, {localVue, router, propsData: {username: null}});
        expect(wrapper.text()).toMatch('Log In');
        wrapper.destroy();
    })
    it("Displays the Log Out and not the Log In button when a user is logged in", () => {
        const wrapper = mount(NavBar, {localVue, router, propsData: {username: "shire"}});
        expect(wrapper.text()).toMatch('Log Out');
        wrapper.destroy();
    })

    describe("Book.vue", () => {
        it("renders the correct data when a book ID is passed in", () => {
            // TODO - May need to update after API calls are working
            const wrapper = mount(Book, {localVue, router, id: "Lj-4ZUY4QQsC"});
            wrapper.vm.$data.bookData = {
                ISBN10: '061850298X',
                ISBN13: '9780618502981',
                Title: 'Calculus Cengage Learning, 2005',
                Author: 'Ron Larson, Robert P. Hostetler, Bruce Edwards',
                RetailPrice: 12.90
            }
            expect(wrapper.text()).toMatch("Calculus Cengage Learning, 2005");
            expect(wrapper.text()).toMatch("Ron Larson, Robert P. Hostetler, Bruce Edwards");
            expect(wrapper.text()).toMatch("ISBN: 061850298X / 9780618502981");
            expect(wrapper.text()).toMatch("Retail: $12.90");
            wrapper.destroy();
        })
    })

    // describe("Listing.vue", () => {
    //     it("renders the correct data when a book ID is passed in", () => {
    //         // TODO: May need to update this when API calls work
    //         const listingData = {
    //             "BookListingID": 10,
    //             "AccountID": 2,
    //             "BookID": "Lj-4ZUY4QQC",
    //             "AskingPrice": 10.23
    //         }
    //         const wrapper = mount(Listing, {localVue, router, propsData: {listingData: listingData}});
    //         expect(wrapper.text()).toMatch("Buy $10.23");
    //         expect(wrapper.text()).toMatch("Calculus Cengage Learning, 2005");
    //         expect(wrapper.text()).toMatch("Ron Larson, Robert P. Hostetler, Bruce Edwards");
    //         expect(wrapper.text()).toMatch("ISBN: 061850298X / 9780618502981");
    //         expect(wrapper.text()).toMatch("Retail: $12.90");
    //         wrapper.destroy();
    //     })
    //})
 })