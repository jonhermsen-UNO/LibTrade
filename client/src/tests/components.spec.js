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
    it("Displays the correct information on the NavBar when instantiated", () => {
        const wrapper = mount(NavBar, {localVue, router});
        expect(wrapper.text()).toMatch("LibTrade");
        expect(wrapper.text()).toMatch("Home");
        expect(wrapper.text()).toMatch("Register");
        expect(wrapper.text()).toMatch("Book Listings");
    })
    it("Displays the Log In and not the Log Out button when a user is logged out", () => {
        const wrapper = mount(NavBar, {localVue, router, propsData: {Username: null}});
        expect(wrapper.text()).toMatch('Log In');
        wrapper.destroy();
    })
    it("Displays the Log Out and not the Log In button when a user is logged in", () => {
        const wrapper = mount(NavBar, {localVue, router, propsData: {Username: "shire"}});
        expect(wrapper.text()).toMatch('Log Out');
        wrapper.destroy();
    })

    describe("Book.vue", () => {
        it("renders the correct data when valid book data is passed in", () => {
            const bookData = {
                ISBN10: '1853260002',
                ISBN13: '9781853260001',
                Title: 'Pride and Prejudice',
                Author: 'Jane Austen',
                RetailPrice: 0
            }
            const wrapper = mount(Book, {localVue, router, data: function() {return {bookData: bookData}}});
            expect(wrapper.text()).toMatch('Pride and Prejudice')
            expect(wrapper.text()).toMatch('Jane Austen')
            expect(wrapper.text()).toMatch('ISBN: 1853260002 / 9781853260001')
            // Should not display a retail price of 0
            expect(wrapper.text()).not.toMatch('Retail: $0')
            wrapper.destroy();
        })

        it("renders the correct data when valid book data is passed in and the retail price is not 0", () => {
            const bookData = {
                ISBN10: '1853260002',
                ISBN13: '9781853260001',
                Title: 'Pride and Prejudice',
                Author: 'Jane Austen',
                RetailPrice: 2.00
            }
            const wrapper = mount(Book, {localVue, router, data: function() {return {bookData: bookData}}});
            expect(wrapper.text()).toMatch('Pride and Prejudice')
            expect(wrapper.text()).toMatch('Jane Austen')
            expect(wrapper.text()).toMatch('ISBN: 1853260002 / 9781853260001')
            // Should display a retail price because it is > 0
            expect(wrapper.text()).toMatch('Retail: $2')
            wrapper.destroy();
        })
    })
    describe("Listing.vue", () => {
        it("displays a pop-up to buy when the Buy button is clicked", () => {
            const listingData = {
                "BookListingID": '1',
                "AccountID": '2',
                "BookID": '3',
                "AskingPrice": 4.99
            };
            const wrapper = mount(Listing, {localVue, router, propsData: {listingData: listingData}});
            const buy = wrapper.find('button');
            buy.trigger('click');
            // Fails if it does not find the pop-up
            wrapper.find('modal')
            wrapper.destroy();
        })

        it("displays the correct listing data when populated with valid data", () => {
            const listingData = {
                "BookListingID": '1',
                "AccountID": '2',
                "BookID": '3',
                "AskingPrice": 4.99
            }
            const wrapper = mount(Listing, {localVue, router, propsData: {listingData: listingData}});
            expect(wrapper.text()).toMatch("Buy $4.99");
            wrapper.destroy();
        })
    })
})