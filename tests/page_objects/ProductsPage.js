import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
// import { Routes } from "./routes.js";
import { ViewPortChecker } from "./ViewPortChecker.js";

export class ProductsPage{
    constructor(page){
        this.page = page;

        this.atbButton = page.locator('[data-qa="product-button"]');
    }

    atbBtnMethod = async (index) => {
        const addButton = this.atbButton.nth(index);
        await addButton.waitFor();
        await expect(addButton).toHaveText('Add to Basket');
        const navigation = new Navigation(this.page);
        let basketCounterBeforeAdding = await navigation.basketCounterToInt();
        await addButton.click();
        await expect(addButton).toHaveText('Remove from Basket');
        const basketCounterAfterAdding = await navigation.basketCounterToInt();
        expect (basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding);
    }
}