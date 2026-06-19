import {Page,expect } from '@playwright/test';
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'

export class PageManager{
    private readonly page:Page
    private readonly navigationPage : NavigationPage
    private readonly formsLayoutsPage : FormLayoutsPage

    constructor(page:Page){
        this.page=page
        this.navigationPage = new NavigationPage(this.page)
        this.formsLayoutsPage = new FormLayoutsPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutPage(){
        return this.formsLayoutsPage
    }
}