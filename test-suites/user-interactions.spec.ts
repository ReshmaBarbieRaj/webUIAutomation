import {test, Page, expect} from '@playwright/test';
import {UserActions} from '../pages/user-actions.po';
import {HomePage} from '../pages/home-page.po';
import Props from '../resources/TestData/props.prod.json';


test.describe('User and Cart Validation', () =>{
   let page : Page;
   let userActionsObject : UserActions;
   let homePageObject : HomePage;
   let email : string ="";

test.beforeAll(async ({browser})=>{
    page = await browser.newPage();
    userActionsObject = new UserActions(page);
    homePageObject = new HomePage(page);
    await userActionsObject.setupBrowser();
    email = await userActionsObject.generateEmailId();
   })
   

test(" User Signup and Checkout ",async () =>{
   await userActionsObject.clickRegisterLink();
   console.log("User Email Id : "+ email );
   await userActionsObject.userRegistaration(email);
   expect (await userActionsObject.registrationSuccessMessage()).toBe('Your registration completed');
   await userActionsObject.clickcontinueButton();
   //Login and check out 
   await userActionsObject.clickLoginLink();
   await userActionsObject.userLogin(email);
   expect (await userActionsObject.loginSuccess()).toBe('My account');
   await homePageObject.productDisplay(Props.product);
   await homePageObject.addProductToCart("2");
   expect (await homePageObject.addedToCartMesage()).toBe("The product has been added to your shopping cart");
   await homePageObject.clickShoppingCartLink();
   expect(await homePageObject.cartProductName()).toBe(Props.product);
   await homePageObject.productCheckout();
   await homePageObject.enterShippingDeatils();
   //CheckOut Product and User Details Assertions
   expect (await homePageObject.billingName()).toBe(Props.fullName);
   expect (await homePageObject.billingEmail()).toBe(email);
   expect (await homePageObject.billingPhoneNumber()).toBe(Props.phoneNumber);
   expect (await homePageObject.paymentMethod()).toBe(Props.payment);
   expect (await homePageObject.shippingMethod()).toBe(Props.shipping);
   expect (await homePageObject.checkoutProduct()).toBe(Props.product);
   expect (await homePageObject.checkoutProductQty()).toBe('2');
   await homePageObject.clickConfirmOrder();
   //order Success Confirmation
   expect (await homePageObject.orderSuccessMessage()).toBe('Your order has been successfully processed!');
   await  userActionsObject.logOutUser();
})

test("Invaild Signup Attempt",async () =>{
    await userActionsObject.clickRegisterLink();
    await userActionsObject.enterFirstName(Props.firstName);
    expect(await userActionsObject.invaildEmailId()).toBe('Wrong email');
    await userActionsObject.enterEmail(email);
    await userActionsObject.enterPasword(Props.password);
    await userActionsObject.enterConfirmPassword(Props.invalidPassword);
    expect(await userActionsObject.passwordMismatchMessage()).toBe('The password and confirmation password do not match.');
    expect(await userActionsObject.incompleteNameFiledMessage()).toBe('Last name is required.');

})

test("Existing User Login and Checkout Validation", async ()=>{
   await userActionsObject.clickLoginLink();
   await userActionsObject.userLogin(email);
   expect (await userActionsObject.loginSuccess()).toBe('My account');
   await homePageObject.productDisplay(Props.product);
   await homePageObject.addProductToCart("2");
   expect (await homePageObject.addedToCartMesage()).toBe("The product has been added to your shopping cart");
   await homePageObject.clickShoppingCartLink();
   expect(await homePageObject.cartProductName()).toBe(Props.product);
   await homePageObject.productCheckout();
   await homePageObject.enterShippingDeatils();
   //CheckOut Product and User Details Assertions
   expect (await homePageObject.billingName()).toBe(Props.fullName);
   expect (await homePageObject.billingEmail()).toBe(email);
   expect (await homePageObject.billingPhoneNumber()).toBe(Props.phoneNumber);
   expect (await homePageObject.paymentMethod()).toBe(Props.payment);
   expect (await homePageObject.shippingMethod()).toBe(Props.shipping);
   expect (await homePageObject.checkoutProduct()).toBe(Props.product);
   expect (await homePageObject.checkoutProductQty()).toBe('2');
   await homePageObject.clickConfirmOrder();
   expect (await homePageObject.orderSuccessMessage()).toBe('Your order has been successfully processed!');
   await  userActionsObject.logOutUser();
 })

test("Cart Functionality Verfication",async()=>{
    await homePageObject.addProductsToCart(Props.productLaptopName,Props.productLaptopQty);
    await homePageObject.addProductsToCart(Props.productMobileName,Props.productMobileQty);
    expect(await homePageObject.productsCountInCart()).toBe(2);
    //Update shopping cart
    expect (await homePageObject.updateShoppingCart(Props.productMobileName,Props.updateQtyCount)).toBe(Props.updateQtyCount);
    //remove products from Cart 
    let oldProductCount = await homePageObject.productsCountInCart();
    await homePageObject.clickProductDeleteIcon(Props.productMobileName);
    expect (await homePageObject.productsCountInCart()).toBe(oldProductCount-1);
    expect (await homePageObject.isProductVisible(Props.productMobileName)).toBe(false);

})

// test.afterAll (async ()=>{
//     await  userActionsObject.logOutUser();
//    })

});
