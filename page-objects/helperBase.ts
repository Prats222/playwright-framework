import {Page,expect} from '@playwright/test'

export class HelperBase{

    protected readonly page:Page


    constructor(page:Page){
        this.page = page
    }

    async waitForNumberOfSecond(timeInSeconds : number){
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
}