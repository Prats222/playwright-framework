import {test as base} from '@playwright/test'
import {PageManager} from '../pw-practice-app/page-objects/pageManager';
export type TestOptions = {
formLayoutPage : string
pageManager : PageManager
}

export const test = base.extend<TestOptions>({
    formLayoutPage: [async({page},use)=>{
        await page.goto(process.env.URL);
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    },{auto:true}],

    pageManager: async({page,formLayoutPage},use) =>{
        const pm = new PageManager(page)
        await use(pm)
    }
})