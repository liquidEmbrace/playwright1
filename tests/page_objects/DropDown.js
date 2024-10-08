import { expect } from "@playwright/test";

export class DropDown{
    constructor(page){
        this.page = page;

        this.dropDownMenu = page.locator('[data-qa="sort-dropdown"]');
        this.productCards = page.locator('[data-qa="product-card"]')
    }

    checkDrop = async () => {
        const productCardsOrderBefore = await this.productCards.allInnerTexts();
        await this.dropDownMenu.selectOption({label: 'Price ascending'});
        const productCardsOrderAfter = await this.productCards.allInnerTexts();
        expect (productCardsOrderBefore).not.toEqual(productCardsOrderAfter);
    }
}