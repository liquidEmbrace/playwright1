import { registerAddress } from "../data/registerAddress.js";

export class Register{

    constructor(page){
        this.page = page;

        this.emailInput = page.getByPlaceholder("E-Mail");
        this.passwordInput = page.getByPlaceholder("Password");
        this.registerBtn = page.getByRole("button", {name: 'Register'});
    }

    registrationProcess = async () => {
        await this.emailInput.fill(registerAddress.email);
        await this.passwordInput.fill(registerAddress.password);
        await this.registerBtn.click();
    }
    
}