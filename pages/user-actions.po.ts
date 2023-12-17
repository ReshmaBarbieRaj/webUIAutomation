import {Locator, Page} from '@playwright/test';
import Props from '../resources/TestData/props.prod.json';

export class UserActions{
    readonly page: Page;
    readonly registerLink : Locator ;
    readonly loginLink : Locator;
    readonly loginButton : Locator;
    readonly emailTextbox : Locator;
    readonly passwordTextBox : Locator;
    readonly genderRadioButton: Locator;
    readonly firstNameTextBox : Locator;
    readonly lastNameTextBox : Locator;
    readonly dayDropDown : Locator;
    readonly monthDropDown : Locator;
    readonly yearDropDown : Locator;
    readonly companyNameTextBox : Locator;
    readonly newsletterCheckBox : Locator;
    readonly confirmPasswordTextBox : Locator;
    readonly registerButton: Locator;
    readonly registrationMessage :Locator;
    readonly continueButton : Locator;
    readonly myAccountLink : Locator;
    readonly logOutButton :Locator;

    constructor (page :Page){
        this.page = page;
        this.registerLink = page.locator('.ico-register');
        this.loginLink = page.locator('.ico-login');
        this.emailTextbox = page.locator('#Email');
        this.passwordTextBox = page.locator('#Password');
        this.loginButton =page.locator('.login-button');
        this.genderRadioButton = page.locator('#gender-female');
        this.firstNameTextBox = page.locator('#FirstName');
        this.lastNameTextBox = page.locator('#LastName');
        this.dayDropDown = page.locator('[name*="Day"]');
        this.monthDropDown = page.locator('[name*="Month"]');
        this.yearDropDown = page.locator('[name*="Year"]');
        this.companyNameTextBox= page.locator('#Company');
        this.newsletterCheckBox= page.locator('#Newsletter').nth(0);
        this.confirmPasswordTextBox= page.locator('#ConfirmPassword');
        this.registerButton=page.locator('#register-button'); 
        this.registrationMessage = page.locator('div .result');
        this.continueButton = page.locator('.register-continue-button');
        this.myAccountLink = page.locator('.ico-account');
        this.logOutButton =page.locator('.ico-logout');
    }

    async setupBrowser(){
        await this.page.goto(Props.baseURL);
    }
    async generateEmailId(){
         let email ='lexig'+ Math.round(new Date().getTime() / 100000)+'@gmail.com';
         return email;
    }
    async clickRegisterLink(){
        await this.registerLink.click();
    }

    async clickLoginLink(){
        await this.loginLink.click();
    }

    async enterFirstName (firstName : string){
        await this.firstNameTextBox.fill(firstName);
    }

    async enterLastName(lastName : string){
        await this.lastNameTextBox.fill(lastName);
    }

    async enterEmail(email : string){
        await this.emailTextbox.fill(email);
    }

    async enterPasword(password : string){
        await this.passwordTextBox.fill(password);
    }

    async enterConfirmPassword(confirmPassword : string){
        await this.confirmPasswordTextBox.fill(confirmPassword)
    }
    async userLogin(email : string){
        await this.emailTextbox.fill(email);
        await this.passwordTextBox.fill(Props.password);
        await this.loginButton.click();
    }

    async userRegistaration(email : string){
        await this.genderRadioButton.click();
        await this.enterFirstName(Props.firstName);
        await this.enterLastName(Props.lastName);
        await this.dayDropDown.selectOption(Props.day);
        await this.monthDropDown.selectOption(Props.month);
        await this.yearDropDown.selectOption(Props.year);
        await this.enterEmail(email);
        await this.companyNameTextBox.fill(Props.companyName)
        await this.newsletterCheckBox.click();
        await this.enterPasword(Props.password);
        await this.enterConfirmPassword(Props.confirmPassword);
        await this.registerButton.click();
    }

    async registrationSuccessMessage(){
     return await this.registrationMessage.innerText();
    }

    async clickcontinueButton(){
        await this.continueButton.click();
    }

    async loginSuccess(){
        return await this.myAccountLink.innerText();
    }

   async  logOutUser(){
     await this.logOutButton.click();
   }

   async invaildEmailId(){
    await this.enterEmail(Props.invaildEmail);
    await this.newsletterCheckBox.click();
    return this.page.locator('#Email-error').innerText();

   }

   async passwordMismatchMessage(){
    await this.registerButton.click();
    return await this.page.locator('#ConfirmPassword-error').innerText();
   }

   async incompleteNameFiledMessage(){
    await this.registerButton.click();
    return await this.page.locator('#LastName-error').innerText();
   }

}