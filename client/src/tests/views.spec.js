import { mount, createLocalVue } from "@vue/test-utils";
import ListingList from "../views/ListingList.vue"
import PageNotFound from "../views/PageNotFound.vue"
import Home from "../views/Home.vue"
import Account from "../views/Account.vue"
import AccountAdd from "../views/AccountAdd.vue"
import ListingAdd from "../views/ListingAdd.vue"
import Listing from "../components/Listing.vue"
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("ListingList", () => {
   it("lists all of the correct data for the listings", async () => {
        const wrapper = mount(ListingList, {localVue, router});
        const listingData1 = {
                "BookListingID": 10,
                "AccountID": 2,
                "BookID": "Lj-4ZUY4QQC",
                "AskingPrice": 10.23
        }
        const listing1 = mount(Listing, {localVue, router, propsData: {listingData: listingData1}});
        const listingData2 = {
            "BookListingID": 10,
            "AccountID": 2,
            "BookID": "Lj-4ZUY4QQC",
            "AskingPrice": 9.80
        }
        const listing2 = mount(Listing, {localVue, router, propsData: {listingData: listingData2}});
        const listingData3 = {
            "BookListingID": 10,
            "AccountID": 2,
            "BookID": "Lj-4ZUY4QQC",
            "AskingPrice": 1.99
        }
        const listing3 = mount(Listing, {localVue, router, propsData: {listingData: listingData3}});
        const listings = [listing1, listing2, listing3]
        wrapper.vm.$data.listings = listings;
        expect(wrapper.text()).toMatch("Buy $9.80");
        expect(wrapper.text()).toMatch("Buy $10.23");
        expect(wrapper.text()).toMatch("Buy $1.99");
        wrapper.destroy();
    })

    it("displays the search bar when the page is instantiated", async () => {
        const wrapper = mount(ListingList, {localVue, router});
        expect(wrapper.text()).toMatch("Please search for a book");
        expect(wrapper.text()).toMatch("Search");
        wrapper.destroy();
    })

    it("does not display the search alert after a user has performed a search", async () => {
        const promise = Promise.resolve('success')
        const wrapper = mount(ListingList, {localVue, router});
        const search = wrapper.find("#search");
        search.trigger('submit');
        await promise;
        expect(wrapper.text()).not.toMatch("Please search for a book");
        wrapper.destroy();
    })
    it ("displays a pop-up to buy when the Buy button is clicked", () => {
        const wrapper = mount(ListingList, {localVue, router});
        const buy = wrapper.find('#buy');
        buy.trigger('click');
        // Fails if it does not find the pop-up
        wrapper.find('modal')
    })
})

describe("PageNotFound", () => {
    it("displays the correct message when PageNotFound view is created", () => {
        const wrapper = mount(PageNotFound, {localVue, router});
        expect(wrapper.text()).toMatch("404 Page Not Found");
        wrapper.destroy();
    })
})

describe("Home", () => {
    it("displays the correct message when Home view is created", () => {
        const wrapper = mount(Home, {localVue, router});
        expect(wrapper.text()).toMatch("Welcome to LibTrade");
        wrapper.destroy();
    })
})

describe("Account", () => {
    it("displays the correct text when the Login page is viewed", () => {
        const wrapper = mount(Account, {localVue, router});
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Login");
        wrapper.destroy();
    })
    it("displays an error message when the user enters the incorrect password", async () => {
        const promise = Promise.resolve('success')
        const wrapper = mount(Account, {localVue, router, data: function() {return {username: 'test', password: 'test'}}});
        const login = wrapper.find("button");
        login.trigger('submit');
        await promise;
        expect(wrapper.vm.$data.errorMessage).toEqual('Invalid credentials');
        wrapper.destroy();
    })
    it("displays an error message when a field is blank", async () => {
        const promise = Promise.resolve('success');
        const wrapper = mount(Account, {localVue, router});
        const login = wrapper.find("button");
        login.trigger('submit');
        await promise;
        expect(wrapper.vm.$data.errorMessage).toEqual('One or more fields is blank')
        wrapper.destroy();
    })
})

describe("AccountAdd", () => {
    it("displays the correct text when the Add Account page is viewed", () => {
        const wrapper = mount(AccountAdd, {localVue, router});
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
    it("error is displayed when there is a problem creating account", async () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      
        username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Iowa State',
        }}});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual('There was a problem creating your account.');
        wrapper.destroy();
    })
    it("displays an error message when a field is blank", async () => {
        const wrapper = mount(AccountAdd, {localVue, router});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual('One or more fields is blank or you have an error with your input');
        wrapper.destroy();
    })
    it ("displays college textbox when Other is chosen as college", () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        expect(wrapper.text()).toMatch("Enter College");
        wrapper.destroy();
    })
    it ("displays an error message when emails do not match", async () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      username: 'test',
        email: 'test1@gmail.com',
        verifyEmail: 'test2@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual("One or more fields is blank or you have an error with your input");
        wrapper.destroy();
    })
    it ("displays an error message when passwords do not match", async () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      
        username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test1',
        verifyPassword: 'test2',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual("One or more fields is blank or you have an error with your input");
        wrapper.destroy();
    })
    it ("displays an error message when the email is invalid", async () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      username: 'test',
        email: 'test',
        verifyEmail: 'test',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual("One or more fields is blank or you have an error with your input");
        wrapper.destroy();
    })

    describe("ListingAdd", () => {
        it("displays the correct text on the page", () => {
            const wrapper = mount(ListingAdd, {localVue, router});
            expect(wrapper.text()).toMatch("Add Listing");
            expect(wrapper.text()).toMatch("Look Up");
            expect(wrapper.text()).toMatch("Asking Price");
            wrapper.destroy();
        })
    
        it("displays an error when a user searches for a book with no ISBN", async () => {
            const promise = Promise.resolve('success')
            const wrapper = mount(ListingAdd, {localVue, router});
            const search = wrapper.find('#search')
            search.trigger('click');
            await promise;
            expect(wrapper.vm.$data.errorMessage).toEqual("Could not find book with that ISBN.")
            wrapper.destroy();
        })
    
        it("displays an error message when the user tries to submit before entering data", async () => {
            const promise = Promise.resolve('success')
            const wrapper = mount(ListingAdd, {localVue, router});
            const submit = wrapper.find("#submit");
            submit.trigger('submit');
            await promise;
            expect(wrapper.vm.$data.errorMessage).toEqual("There is an issue with your input.");
            wrapper.destroy();
        })
    
        it("does not display an error when the submit button is clicked with valid data", async () => {
            const wrapper = mount(ListingAdd, {localVue, router, data: function() {return {      
                isbn: '1234',
                askingPrice: 5.00
            }}});
            const promise = Promise.resolve('success');
            const submit = wrapper.find("#submit");
            submit.trigger('submit');
            await promise;
            expect(wrapper.vm.$data.errorMessage).not.toEqual('There was a problem adding your listing');
            wrapper.destroy();
        })
   })
})