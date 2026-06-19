import {test,expect} from '@playwright/test';

test.describe('Form page navigation', () =>{

    test.beforeEach(async ({page}) =>{
    //hooks(beforeEach , beforeAll,afterall, afterEach) - will run before each test in this describe block
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByTitle('Form Layouts').click();
    });

    test('the first test' , {tag:'@first'},async ({page}) =>{
    await page.getByTitle('Form Layouts').click();
    })

    test('navigate to datePicker page' , async ({page}) =>{
        await page.getByTitle('Datepicker').click();
    })

    test('Locator syntax rules' ,{tag:'@syntax'} ,async ({page}) =>{
     // By tag name
    page.locator('input').first().click(); // finds all input elements
    //by id
    await page.locator('#inputEmail1').click(); // finds the element with id 'inputEmail1'
    //by class
    page.locator('.shape-rectangle'); // finds elements with the class 'shape-rectangle'
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'); // finds elements with the specified classes
    //by attribute
    page.locator('[placeholder="Email"]'); // finds elements with the placeholder attribute equal to "Email"
    // combine diff selectors
    page.locator('input[placeholder="Email"][nbinput]'); // finds input elements with the placeholder attribute equal to "Email"
    //by partial text match
    page.locator(':text("Using")'); // finds elements containing the text "Using"
    //exact text match
    page.locator(':text-is("Using the Grid")'); // finds elements with the exact text "Using the Grid"
    })

    test('User Facing locators',{tag:'@loc2'} ,async ({page}) =>{
    //byRole
    await page.getByRole('textbox',{name:"Email"}).first().click(); // finds the first textbox element with the name "Email"
    await page.getByRole('button',{name:"SIGN IN"}).first().click(); // finds the first button element with the name "SIGN IN"  
    //byLabel
    await page.getByLabel('Email').first().click(); // finds the first element associated with the label "Email"
    //byPlaceholder
    await page.getByPlaceholder('Jane Doe').first().click(); // finds the first element with the placeholder "Email"
    //byText
    await page.getByText('Using the Grid').first().click(); // finds the first element containing the text "Using the Grid"
    //byTitle
    //await page.getByTitle('IoT Dashboard').first().click(); // finds the first element with the title "Form Layouts"
    //byTestId
    await page.getByTestId('SignIn').click(); // finds the first element with the data-testid attribute equal to "test-id"
    })

    test('Locating child elements' , async ({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click(); // finds the first element with the text "Option 1" that is a descendant of an nb-radio element, which is a descendant of an nb-card element
    //chaining
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button',{name:"Sign In"}).first().click();
    //index
    await page.locator('nb-card').nth(2).getByRole('button').click();
    })
    
    test('Locating parent elements' , async ({page}) =>{
    await page.locator('nb-card' , {hasText:"Using the Grid"}).getByRole('textbox' , {name:"Email"}).click(); // finds the first nb-card element that contains the text "Using the Grid" and then clicks on the button element that is a descendant of that nb-card element
    await page.locator('nb-card' , {has:page.locator('#inputEmail1')}).getByRole('textbox' , {name:"Email"}).click(); // finds the first nb-card element that contains an element with the id "inputEmail1" and then clicks on the button element that is a descendant of that nb-card element
    //why filter? - filter will find all the nb-card elements that match the condition and then perform the action on all of them, while has will find the first nb-card element that matches the condition and then perform the action on it.
    await page.locator('nb-card').filter({hasText:"Basic Form"}).getByRole('textbox' , {name:"Email"}).click(); // finds all nb-card elements that contain the text "Using the Grid" and then clicks on the button element that is a descendant of those nb-card elements
    await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox' , {name:"Email"}).click(); // finds all nb-card elements that contain an element with the id "inputEmail1" and then clicks on the button element that is a descendant of those nb-card elements
    })

    test('Resuing Locators' , async ({page}) =>{
    const firstForm = page.locator('nb-card').filter({hasText:"Basic Form"});
    const emailField = firstForm.getByRole('textbox' , {name:"Email"});
    const passwordField = firstForm.getByRole('textbox' , {name:"Password"});
    

    await emailField.fill('test@test.com')
    await passwordField.fill('Password')
    await firstForm.getByRole('button' , {name:"Submit"}).click();

    await expect(emailField).toHaveValue('test@test.com' , {timeout:5000}); // waits for the email field to have the value "[REDACTED_EMAIL_ADDRESS_1]" for up to 5 seconds
    })

    test('Extracting values' , async ({page}) =>{
    const firstForm = page.locator('nb-card').filter({hasText:"Basic Form"});
    const buttonText = await firstForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit');

    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain('Option 1');
    //general asserts and locator asserts(await) diffrence need of await? -
    //  general asserts are used to check the state of the element, 
    // while locator asserts are used to check the state of the locator. 
    // Locator asserts need await because they return a promise that resolves
    //  to the state of the locator, while general asserts do not return a promise and can be used directly. 
    })

    test('timeouts' , async ({page}) =>{
    //test.setTimeout(10000); // sets the timeout for this test to 10 seconds
    test.slow()
    const successButton = page.locator('.bg-success');
    await successButton.click(); // waits for the success button to be clickable for up to 10 seconds
    })
})