 import {test, expect} from '@playwright/test'
 
    test('Input fields' ,{tag:'@inputF'} ,async ({page}) =>{
    await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click();
    await page.getByTitle('Form Layouts').click();
    const gridEmaiInput =  page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"})
    await gridEmaiInput.fill('test@test.com')
    await gridEmaiInput.clear()
    await gridEmaiInput.fill('test2@tets.com')
    })