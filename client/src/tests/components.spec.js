import { mount } from "@vue/test-utils";
import Footer from "../components/Footer.vue";
import NavBar from "../components/NavBar.vue";

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
        const wrapper = mount(NavBar, {username: ''});
        const login = wrapper.find("button");
        login.trigger('click');
        expect(wrapper.find("#loginForm")).toEqual({"selector": "#loginForm"});
        wrapper.destroy();
    })
    it("Remains on the Home page when Log Out button is clicked", () => {
        const wrapper = mount(NavBar, {username: "shire"});
        const logout = wrapper.find("button");
        logout.trigger('click');
        expect(wrapper.find("#homePage")).toEqual({"selector": "#homePage"});
        wrapper.destroy();
    })
    it("Displays the Log In and not the Log Out button when a user is not logged in", () => {
        const wrapper = mount(NavBar, {username: ''});
        expect(wrapper.find("button")).toEqual({"isFunctionalComponent": true, "selector": "button"});
        expect(wrapper.find("#logout")) == null
        wrapper.destroy();
    })
    it("Displays the Log Out and not the Log In button when a user is logged in", () => {
        const wrapper = mount(NavBar, {username: "shire"});
        expect(wrapper.find("button")).toEqual({"isFunctionalComponent": true, "selector": "button"});
        expect(wrapper.find("#login")) == null
        wrapper.destroy();
    })
})