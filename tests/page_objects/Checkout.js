export class Checkout{
    constructor(page){
        this.page = page;

        this.itemPriceText = page.locator('[data-qa="basket-item-price"]');
        this.itemPriceRemoveButton = page.getByRole("button", {name: 'Remove from basket'});
        this.itemCard = page.locator('[data-qa="basket-card"]');
    }

    removeCheapestItem = async ()=> {
        const itemPrice = await this.itemPriceText.allInnerTexts();
        const itemPricePurifier = itemPrice.map((element) => {
            const itemPriceWithoutDollar = element.replace("$", "");
            return Number(itemPriceWithoutDollar);
        })
        const cheapestItem = Math.min(itemPricePurifier);
        const cheaperstItemIndex = itemPricePurifier.indexOf(cheapestItem);
        await this.itemPriceRemoveButton.nth(cheaperstItemIndex).click();
    }

}