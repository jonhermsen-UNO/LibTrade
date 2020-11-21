import { mount } from "@vue/test-utils";
import Footer from "../components/Footer.vue";
import NavBar from "../components/NavBar.vue";
import Book from "../components/Book.vue";
import Listing from "../components/Listing.vue";

describe("Footer.vue", () => {
    it("renders the correct footer message when instantiated", () => {
        const msg = "LibTrade © 2020 | All Rights Reserved";
        const wrapper = mount(Footer);
        expect(wrapper.text()).toMatch(msg);
        wrapper.destroy();
    })
})

describe("NavBar.vue", () => {
    it("Remains on the Home page when the Home link is clicked", () => {
        const wrapper = mount(NavBar);
        const home = wrapper.find("#home");
        home.trigger('click');
        expect (wrapper.find("#homePage")).toEqual({"selector" : "#homePage"});
        wrapper.destroy();
    })
    it("Redirects to Register page when Register link is clicked", () => {
        const wrapper = mount(NavBar);
        const register = wrapper.find("#register");
        register.trigger('click');
        expect(wrapper.find("#registerForm")).toEqual({"selector": "#registerForm"});
        wrapper.destroy();
    })
    it("Redirects to Login page when Login button is clicked", () => {
        const wrapper = mount(NavBar, {propsData: {username: ''}});
        const login = wrapper.find("button");
        login.trigger('click');
        expect(wrapper.find("#loginForm")).toEqual({"selector": "#loginForm"});
        wrapper.destroy();
    })
    it("Remains on the Home page when Log Out button is clicked", () => {
        const wrapper = mount(NavBar, {propsData: {username: "shire"}});
        const logout = wrapper.find("button");
        logout.trigger('click');
        expect(wrapper.find("#homePage")).toEqual({"selector": "#homePage"});
        wrapper.destroy();
    })
    it("Displays the Log In and not the Log Out button when a user is logged out", () => {
        const wrapper = mount(NavBar, {propsData: {username: ""}});
        expect(wrapper.text()).toMatch('Log In');
        wrapper.destroy();
    })
    it("Displays the Log Out and not the Log In button when a user is logged in", () => {
        const wrapper = mount(NavBar, {propsData: {username: "shire"}});
        expect(wrapper.text()).toMatch('Log Out');
        wrapper.destroy();
    })

    describe("Book.vue", () => {
        it("renders the correct data when a book ID is passed in", () => {
            const wrapper = mount(Book, {id: "Lj-4ZUY4QQsC"});
            expect(wrapper.text()).toMatch("Calculus Cengage Learning, 2005");
            expect(wrapper.text()).toMatch("Ron Larson, Robert P. Hostetler, Bruce Edwards");
            expect(wrapper.text()).toMatch("ISBN: 061850298X/9780618502981");
            expect(wrapper.text()).toMatch("Retail: $12.90");
            // TODO: Pass in legit ID number and change expected data accordingly
            wrapper.destroy();
        })
    })

    describe("Listing.vue", () => {
        it("renders the correct data when a book ID is passed in", () => {
            const listingData = {
                "BookListingID": 10,
                "AccountID": 2,
                "BookID": "Lj-4ZUY4QQC",
                "AskingPrice": 10.23
            }
            const wrapper = mount(Listing, {propsData: {listingData: listingData}});
            expect(wrapper.text()).toMatch("Buy $10.23");
            expect(wrapper.text()).toMatch("Calculus Cengage Learning, 2005");
            expect(wrapper.text()).toMatch("Ron Larson, Robert P. Hostetler, Bruce Edwards");
            expect(wrapper.text()).toMatch("ISBN: 061850298X/9780618502981");
            expect(wrapper.text()).toMatch("Retail: $12.90");
            // TODO: Pass in legit ID number and change expected data accordingly
            wrapper.destroy();
        })
    })
})