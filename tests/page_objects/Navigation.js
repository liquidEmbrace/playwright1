export class Navigation {
    constructor(page){
        this.page = page;

        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    }

        basketCounterToInt = async () => {
            this.basketCounter.waitFor();
            const basketIntCount = await this.basketCounter.innerText();
            return Number(basketIntCount);
        }
    }
    

