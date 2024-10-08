import { test } from "@playwright/test";

import { Routes } from "./page_objects/routes.js";
import { ProductsPage } from "./page_objects/ProductsPage.js";
import { Checkout } from "./page_objects/Checkout.js";
import { DropDown } from "./page_objects/DropDown.js";
import { DeliveryDetail } from "./page_objects/DeliveryDetail.js";
import { Register } from "./page_objects/RegisterProcess.js";
import { PaymentPage } from "./page_objects/PaymentPage.js";


test("my first e2e test", async({page})=>{

    const routes = new Routes(page);
    await routes.toTheMainPage();

    const productsPage = new ProductsPage(page);
    await productsPage.atbBtnMethod(0);
    await productsPage.atbBtnMethod(1);
    await productsPage.atbBtnMethod(2);

    const dropDown = new DropDown(page);
    await dropDown.checkDrop();

    await routes.toTheCheckoutPage(); 

    const checkout = new Checkout(page);
    await checkout.removeCheapestItem();

    await routes.continueToCheckout();
    await routes.continueToRegister();

    const register = new Register(page);
    await register.registrationProcess();

    await routes.toTheDeliveryPage();

    const deliveryDetail = new DeliveryDetail(page);
    await deliveryDetail.fillDetail();
    await deliveryDetail.saveDetails();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.paymentDetails();

    await routes.toTheThankyouPage();
    await routes.backToShop();

    // await page.pause();
})