import { mount } from "@vue/test-utils";
import ListingList from "../views/ListingList.vue"
import PageNotFound from "../views/PageNotFound.vue"
import Home from "../views/Home.vue"
import Account from "../views/Account.vue"
import AccountAdd from "../views/AccountAdd.vue"

describe("ListingList", () => {
    it("lists all of the correct data for the listings", () => {
        const wrapper = mount(ListingList);
        expect(wrapper.text()).toMatch("Buy $9.80");
        expect(wrapper.text()).toMatch("Buy $10.23");
        expect(wrapper.text()).toMatch("Buy $104.99");
        wrapper.destroy();
    })
})

describe("PageNotFound", () => {
    it("displays the correct message when PageNotFound view is created", () => {
        const wrapper = mount(PageNotFound);
        expect(wrapper.text()).toMatch("404 Page Not Found");
        wrapper.destroy();
    })
})

describe("Home", () => {
    it("displays the correct message when Home view is created", () => {
        const wrapper = mount(Home);
        expect(wrapper.text()).toMatch("Welcome to LibTrade");
        wrapper.destroy();
    })
})

describe("Account", () => {
    it("displays the correct text when the Login page is viewed", () => {
        const wrapper = mount(Account);
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Login");
        wrapper.destroy();
    })
    it("redirects to the Home Page upon a successful login", () => {
        const wrapper = mount(Account, {data: function() {return {username: 'test', password: 'test'}}});
        const login = wrapper.find("button");
        login.trigger('click');
        expect (wrapper.find("#homePage")).toEqual({"selector" : "#homePage"});
        wrapper.destroy();
    })
    it("does not redirect when a field is blank", () => {
        const wrapper = mount(Account);
        const login = wrapper.find("#loginButton");
        login.trigger('click');
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Login");
        wrapper.destroy();
    })
})

describe("AccountAdd", () => {
    it("displays the correct text when the Add Account page is viewed", () => {
        const wrapper = mount(AccountAdd);
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
    it("redirects to the Home Page upon a successful account add", () => {
        const wrapper = mount(AccountAdd, {data: function() {return {      username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Iowa State',
        }}});
        const create = wrapper.find("button");
        create.trigger('click');
        expect (wrapper.find("#homePage")).toEqual({"selector" : "#homePage"});
        wrapper.destroy();
    })
    it("does not redirect when a field is blank", () => {
        const wrapper = mount(AccountAdd);
        const create = wrapper.find("button");
        create.trigger('click');
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
    it ("displays college textbox when Other is chosen as college", () => {
        const wrapper = mount(AccountAdd, {data: function() {return {      username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        expect(wrapper.text()).toMatch("Enter College");
        wrapper.destroy();
    })
    it ("does not redirect when emails do not match", () => {
        const wrapper = mount(AccountAdd, {data: function() {return {      username: 'test',
        email: 'test1@gmail.com',
        verifyEmail: 'test2@gmail.com',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        create.trigger('click');
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
    it ("does not redirect when passwords do not match", () => {
        const wrapper = mount(AccountAdd, {data: function() {return {      username: 'test',
        email: 'test@gmail.com',
        verifyEmail: 'test@gmail.com',
        password: 'test1',
        verifyPassword: 'test2',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        create.trigger('click');
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
    it ("does not redirect when the email is invalid", () => {
        const wrapper = mount(AccountAdd, {data: function() {return {      username: 'test',
        email: 'test',
        verifyEmail: 'test',
        password: 'test',
        verifyPassword: 'test',
        college: 'Other',
        }}});
        const create = wrapper.find("button");
        create.trigger('click');
        expect(wrapper.text()).toMatch("Username");
        expect(wrapper.text()).toMatch("Email Address");
        expect(wrapper.text()).toMatch("Verify Email");
        expect(wrapper.text()).toMatch("Password");
        expect(wrapper.text()).toMatch("Verify Password");
        expect(wrapper.text()).toMatch("Select College");
        expect(wrapper.text()).toMatch("Register");
        wrapper.destroy();
    })
})