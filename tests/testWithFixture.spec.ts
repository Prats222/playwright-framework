import {test} from '../test-options'
import {PageManager} from '../page-objects/pageManager'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import {faker} from '@faker-js/faker'


test('parametrized tests' , async ({pageManager}) =>{
    //const pm = new PageManager(page)

    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','passu','Option 2')  
})