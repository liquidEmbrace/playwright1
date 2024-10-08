import { expect } from "@playwright/test";
import { registerAddress } from "./../data/registerAddress.js";
import { Routes } from "./routes.js";

export class DeliveryDetail{

    constructor(page){
        this.page = page;

        this.DDHeader = page.getByRole("heading", {name: "Delivery details"})
        this.firstName = page.getByPlaceholder("First name");
        this.lastName = page.getByPlaceholder("last name");
        this.street = page.getByPlaceholder("street");
        this.postCode = page.getByPlaceholder("post code");
        this.city = page.getByPlaceholder("city");
        this.country = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressBtn = page.getByRole("button", {name: 'Save address for next time'});
        this.addressBoxes = page.locator('[data-qa="saved-address-container"]');
    }

    fillDetail = async () => {
        await this.DDHeader.waitFor();
        await this.firstName.fill(registerAddress.firstName);
        await this.lastName.fill(registerAddress.lastName);
        await this.street.fill(registerAddress.street);
        await this.postCode.fill(registerAddress.postCode);
        await this.city.fill(registerAddress.city);
        await this.country.selectOption(registerAddress.country);
    }

    saveDetails = async () => {
        const addressBoxCount = await this.addressBoxes.count();
        await this.saveAddressBtn.click();
        await expect (this.addressBoxes).toHaveCount(addressBoxCount + 1);
        await this.saveAddressBtn.nth(0).click();

        const routes = new Routes(this.page);
        await routes.toThePaymentPage();
    }
}