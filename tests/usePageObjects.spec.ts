import {test,expect} from '@playwright/test'
import {PageManager} from '../page-objects/pageManager'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import {faker} from '@faker-js/faker'
test.beforeEach(async ({page}) =>{
    //hooks(beforeEach , beforeAll,afterall, afterEach) - will run before each test in this describe block
    await page.goto(process.env.URL);
    });

test('navigate to form page', async ({page}) =>{
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized tests' , async ({page}) =>{
    const pm = new PageManager(page)
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    await pm.navigateTo().formLayoutsPage()
    // to generate random data , use faker library
    const randomName = faker.person.fullName

    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','passu','Option 2')  
})