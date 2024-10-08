import { expect } from "@playwright/test";
import { creditCardDetails } from "./../data/creditCardDetails.js";

export class PaymentPage{
    constructor(page){
        this.page = page;

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                 .locator('[data-qa="discount-code"]');
        this.discountInput = page.getByPlaceholder("Discount code");
        this.submitDiscount = page.getByRole('button', {name: "Submit Discount"});
        this.newPriceTextLine = page.getByText("Total including discount");
        this.discountActivatedMsg = page.getByText("Discount activated!");
        this.oldPriceStr = page.locator('[data-qa="total-value"]');
        this.newPriceStr = page.locator('[data-qa="total-with-discount-value"]');
        this.cCardOwner = page.getByPlaceholder("Credit card owner");
        this.cCardNo = page.getByPlaceholder("Credit card number");
        this.cCardDate = page.getByPlaceholder("Valid until");
        this.cCardCvv = page.getByPlaceholder("Credit card CVC");
    }

    // text2IntConverter = (index) => {
    //     const noDollarPrice = index.replace("$","");
    //     return price = Number(noDollarPrice);
    // }

    // text2IntConverter = index => Number(index.replace("$", ""));


    activateDiscount = async () => {
        await expect(this.newPriceTextLine).toBeHidden();
        await expect(this.discountActivatedMsg).toBeHidden();
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        //option 1
        this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);
        // //option 2
        // await this.discountInput.focus();
        // await this.page.keyboard.type(code, {delay: 1000});
        // expect(await this.discountInput.inputValue()).toBe(code);
        await this.submitDiscount.click();
        await expect(this.newPriceTextLine).toBeVisible();
        await expect(this.discountActivatedMsg).toBeVisible();

        // expect(this.text2IntConverter(this.oldPriceStr)).toBeLessThan(this.text2IntConverter(this.newPriceStr));
    
        const oldNoDollarText = await this.oldPriceStr.innerText()
        const oldNoDollar = oldNoDollarText.replace("$" , "");
        const oldPriceInt = Number(oldNoDollar);
        const newNoDollarText = await this.newPriceStr.innerText()
        const newNoDollar = newNoDollarText.replace("$" , "");
        const newPriceInt = Number(newNoDollar);

        expect(newPriceInt).toBeLessThan(oldPriceInt);
    }

    paymentDetails = async () => {
        await this.cCardOwner.fill(creditCardDetails.owner);
        await this.cCardNo.fill(creditCardDetails.cardNumber);
        await this.cCardDate.fill(creditCardDetails.date);
        await this.cCardCvv.fill(creditCardDetails.cvv);
    }

}