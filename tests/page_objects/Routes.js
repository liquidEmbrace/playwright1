import { expect } from "@playwright/test";

export class Routes{
    constructor(page){
        this.page = page;

        this.continueToCheckoutBtn = page.getByRole("button", {name: 'Continue to Checkout'});
        this.loginHeader = page.getByRole("heading", {name: 'Login'});
        this.signUpHeader = page.getByRole("heading", {name: 'Sign up to our platform'});
        this.registerPageLink = page.getByRole("button", {name: 'Register'});
        this.paymentBtn = page.getByRole("button", {name: 'Continue to payment'});
        this.paymentHeader = page.getByRole("heading", {name: 'Payment'});
        this.payBtn = page.getByRole('button', {name: "Pay"});
        this.thankyouHeader = page.getByRole("heading", {name: 'Thank you for shopping with us!'});
        this.backToShopBtn = page.getByRole('button', {name: "Back to shop"});
    }
    toTheMainPage = async () => {
        await this.page.goto("/");
    }
    toTheCheckoutPage = async () => {
        const checkoutLink = this.page.getByRole("link", {name: 'Checkout'});
        await checkoutLink.click();
        await this.page.goto("/basket");
        await expect(this.page).toHaveURL("/basket");
    }
    continueToCheckout = async () => {
        await this.continueToCheckoutBtn.waitFor();
        await this.continueToCheckoutBtn.click();
        await expect(this.loginHeader).toBeVisible();
    }
    continueToRegister = async () => {
        await this.registerPageLink.waitFor();
        await this.registerPageLink.click();
        await expect(this.signUpHeader).toBeVisible();
    }
    toTheDeliveryPage = async () => {
        await this.page.waitForURL(/\/delivery-details/)
    }
    toThePaymentPage = async () => {
        await this.paymentBtn.click();
        await expect(this.paymentHeader).toBeVisible();
    }
    toTheThankyouPage = async () => {
        await this.payBtn.click();
        await expect(this.thankyouHeader).toBeVisible();
    }
    backToShop = async () => {
        await this.backToShopBtn.click();
        await expect(this.page).toHaveURL("/");
    }
}