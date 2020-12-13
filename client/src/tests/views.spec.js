import { mount, createLocalVue } from "@vue/test-utils";
import ListingList from "../views/ListingList.vue"
import PageNotFound from "../views/PageNotFound.vue"
import Home from "../views/Home.vue"
import Account from "../views/Account.vue"
import AccountAdd from "../views/AccountAdd.vue"
import ListingAdd from "../views/ListingAdd.vue"
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("ListingList", () => {
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
    it("no error is displayed when a valid user logs in", async () => {
        const promise = Promise.resolve('success')
        const wrapper = mount(Account, {localVue, router, data: function() {return {Username: 'lskywalker', Password: 'test'}}});
        const login = wrapper.find("button");
        login.trigger('submit');
        await promise;
        expect(wrapper.vm.$data.errorMessage).toMatch('');
        wrapper.destroy();
    })
    it("displays an error message when a field is blank", async () => {
        const promise = Promise.resolve('success');
        const wrapper = mount(Account, {localVue, router});
        const login = wrapper.find("button");
        login.trigger('submit');
        await promise;
        expect(wrapper.vm.$data.errorMessage).toMatch('One or more fields is blank')
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
    it("does not display an error when a user creates a valid account", async () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      
        Username: 'test',
        Email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        Password: 'test',
        verifyPassword: 'test',
        CollegeID: 1,
        }}});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual('');
        wrapper.destroy();
    })

    it("displays an error message when a field is blank", async () => {
        const wrapper = mount(AccountAdd, {localVue, router});
        const create = wrapper.find("button");
        await create.trigger('submit');
        expect(wrapper.vm.$data.errorMessage).toEqual('One or more fields is blank or you have an error with your input');
        wrapper.destroy();
    })

    it ("does not display Other college textbox when a college is chosen", () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      
        Username: 'test',
        Email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        Password: 'test',
        verifyPassword: 'test',
        CollegeID: 2,
        }}});
        expect(wrapper.text()).not.toMatch("Enter College");
        wrapper.destroy();
    })

    it ("displays the Other college textbox when a college is not yet chosen", () => {
        const wrapper = mount(AccountAdd, {localVue, router, data: function() {return {      
        Username: 'test',
        Email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        Password: 'test',
        verifyPassword: 'test',
        CollegeID: 0,
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
    
        it("does not allow submit when an invalid ISBN is entered", async () => {
            const promise = Promise.resolve('success')
            const wrapper = mount(ListingAdd, {localVue, router, data: function() {return{isbn:'123'}}});
            const search = wrapper.find('#search')
            search.trigger('click');
            await promise;
            const submit = wrapper.find('#submit');
            submit.trigger('submit');
            expect(wrapper.vm.$data.errorMessage).toEqual("There is an issue with your input.")
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
                isbn: '9781853260001',
                askingPrice: 5.00,
                BookID: {BookID: 1}
            }}});
            const promise = Promise.resolve('success');
            const submit = wrapper.find("#submit");
            submit.trigger('submit');
            await promise;
            expect(wrapper.vm.$data.errorMessage).not.toEqual('');
            wrapper.destroy();
        })
    })
 })