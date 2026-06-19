import {Page} from '@playwright/test';

export class FormLayoutsPage{

    private readonly page:Page

    constructor(page:Page){
        this.page=page
    }

    // how to give discription of parameters that can be seen while hovering- @params
    /** 
    @param email - valid format
    @param password - hard pass
    @param optionText - 2 options only
    */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email:string,password:string,optionText:string){
        const usingTheGridForm = this.page.locator ('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }
}