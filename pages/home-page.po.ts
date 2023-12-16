import {Locator, Page} from '@playwright/test';
import Props from '../resources/TestData/props.prod.json';


export class HomePage{
    readonly page: Page;
    readonly products : Locator;
    readonly addToCartButton : Locator;
    readonly productAddedMessage : Locator;
    readonly productNameInfo : Locator;
    readonly shoppingCartLink : Locator;
    readonly termsCheckBox :Locator;
    readonly checkoutButton : Locator;
    readonly countryDropDown : Locator;
    readonly cityTextbox : Locator;
    readonly addressTextbox : Locator;
    readonly postalCodeTextBox :Locator;
    readonly phoneNumberTextBox : Locator;
    readonly billingAdressContinueButton : Locator;
    readonly shippingMethodRadioButton : Locator;
    readonly shippingMethodContinueButton :Locator;
    readonly paymentMethodContinueButton : Locator;
    readonly paymentinfoContinueButton : Locator;
    readonly orderConfirmButton :Locator;
    readonly billingFullname :Locator;
    readonly billingPhone :Locator;
    readonly billingEmaild :Locator;
    readonly paymentMethodOption :Locator;
    readonly shippingMethodOption :Locator;
    readonly checkoutProductName :Locator;
    readonly productQty :Locator;
    readonly orderConfirmMessage:Locator;
    readonly homePageLink :Locator;
    readonly cartLink :Locator;
    readonly productCartQty : Locator;
    readonly updateShoppingCartButton : Locator;


    
    constructor (page :Page){
        this.page = page;
        this.products = page.locator('.product-item');
        this.addToCartButton =page.locator('.add-to-cart-button');
        this.productAddedMessage= page.locator('.content');
        this.shoppingCartLink = page.locator('.content a');
        this.productNameInfo =page.locator('.product-name');
        this.termsCheckBox = page.locator('#termsofservice');
        this.checkoutButton =page.locator('#checkout');
        this.countryDropDown= page.locator('#BillingNewAddress_CountryId');
        this.cityTextbox = page.locator('#BillingNewAddress_City');
        this.addressTextbox = page.locator('#BillingNewAddress_Address1');
        this.postalCodeTextBox= page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneNumberTextBox = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingAdressContinueButton=page.locator("button:has-text('Continue')").nth(0);
        this.shippingMethodRadioButton = page.locator('#shippingoption_1');
        this.shippingMethodContinueButton=page.locator('.shipping-method-next-step-button');
        this.paymentMethodContinueButton=page.locator('.payment-method-next-step-button');
        this.paymentinfoContinueButton = page.locator('.payment-info-next-step-button');
        this.orderConfirmButton =page.locator('#confirm-order-buttons-container button');
        this.billingFullname= page.locator('li .name').nth(0);
        this.billingEmaild =page.locator('li .email').nth(0);
        this.billingPhone = page.locator('li .phone').nth(0);
        this.paymentMethodOption =page.locator('li .payment-method span').nth(1);
        this.shippingMethodOption =page.locator('li .shipping-method span').nth(1);
        this.checkoutProductName =page.locator('.product-name');
        this.productQty =page.locator('.product-quantity');
        this.orderConfirmMessage =page.locator(".title strong").first();
        this.homePageLink=page.locator('.breadcrumb a').first();
        this.cartLink=page.locator('.cart-label');
        this.productCartQty=page.locator('input.qty-input');
        this.updateShoppingCartButton =page.locator('.update-cart-button');
    }


    async productDisplay(product : string){

        let count = await this.products.count();
        for (let i=0; i< count ; i++){
            if(await this.products.nth(i).locator(' h2 a').innerText()===product){
                await this.products.nth(i).locator(' h2 a').click();
                break;
            }
        }
    }

    async addProductToCart(qty :string){
        await this.page.locator(".qty-input").fill("");
        await this.page.locator(".qty-input").fill(qty)
        await this.addToCartButton.click();       
    }

    async addedToCartMesage(){
       return await this.productAddedMessage.innerText();
    }

    async clickShoppingCartLink(){
        await this.shoppingCartLink.click();
    }

    async cartProductName(){
        return await this.productNameInfo.innerText();
    }


    async productCheckout(){
        await this.termsCheckBox.click();
        await this.checkoutButton.click();
    }

    async enterShippingDeatils(){
        if(await this.page.locator('#edit-billing-address-button').isVisible()){
            await this.page.locator(".new-address-next-step-button").first().click();
        }
        else {
        await this.countryDropDown.selectOption('127');
        await this.cityTextbox.fill(Props.city);
        await this.addressTextbox.fill(Props.address);
        await this.postalCodeTextBox.fill(Props.postalcode);
        await this.phoneNumberTextBox.fill(Props.phoneNumber);
        await this.billingAdressContinueButton.click();
        }
        await this.shippingMethodRadioButton.click();
        await this.shippingMethodContinueButton.click();
        await this.paymentMethodContinueButton.click();
        await this.paymentinfoContinueButton.click();
    }
    
    async billingName(){
        return await this.billingFullname.innerText();
    }

   async billingEmail(){
    let arrayEmail=(await this.billingEmaild.innerText()).split(' ');
    return arrayEmail[1];
   }

   async billingPhoneNumber(){
    let arrayphoneNumber= (await this.billingPhone.innerText()).split(' ');
    return arrayphoneNumber[1];
   }

   async paymentMethod(){
    return await this.paymentMethodOption.innerText();
   }

   async shippingMethod(){
    return await this.shippingMethodOption.innerText();
   }

   async checkoutProduct(){
    return await this.checkoutProductName.innerText();
   }

  async checkoutProductQty(){
    return await this.productQty.innerText();

  }

  async clickConfirmOrder(){
    await this.orderConfirmButton.dblclick();
  }

  async orderSuccessMessage(){
    let arrayOrderId = (await this.page.locator('.order-number strong').innerText()).split(' ');
    console.log("Order Id : " + arrayOrderId[2]);
    return await this.orderConfirmMessage.innerText();
   }

   async addProductsToCart(product :string, qty:string){
    await this.productDisplay(product);
    await this.addProductToCart(qty);
    await this.homePageLink.click();
   }

   async productsCountInCart(){
    await this.cartLink.click();
    let rowcount = await this.page.locator('.sku-number').count();
    console.log("Number of Products in cart : "+ rowcount);
    return rowcount;
   }

   async updateShoppingCart(product :string ,productQty: string){
    let rowcount = await this.page.locator('.sku-number').count();
    let i=0;
    for (i=0; i< rowcount ; i++){
        if(await this.page.locator('a.product-name').nth(i).innerText()===product){
            //await this.page.pause();
            await this.productCartQty.nth(i).click();
            await this.productCartQty.nth(i).fill('');
            await this.productCartQty.nth(i).fill(productQty);  
            await this.updateShoppingCartButton.click();
            break;
        }
    }
    return await this.productCartQty.nth(i).getAttribute('value');
   }

   async clickProductDeleteIcon(productName : string){
    let rowcount = await this.page.locator('.sku-number').count();
    for (let i=0; i< rowcount ; i++){
        if(await this.page.locator('a.product-name').nth(i).innerText()===productName){
            await this.page.locator('.remove-btn').nth(i).click();
            await this.updateShoppingCartButton.click();
            break;
        }
    }
   }

   async isProductVisible(productName : string){
    let rowcount = await this.page.locator('.sku-number').count();
    for (let i=0; i< rowcount ; i++){
        if(await this.page.locator('a.product-name').nth(i).innerText()===productName)
            return true;
        else 
            return false;
        
    }
   }

}