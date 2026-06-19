//class always start with capital
import {Locator, Page} from '@playwright/test'
import {HelperBase} from '../page-objects/helperBase'

export class NavigationPage extends HelperBase{
//readonly page : Page
readonly formLayoutMenuItem : Locator
readonly datePickerMI : Locator
readonly smartTableMi : Locator
readonly toastsMi : Locator
readonly tooltipMi : Locator

constructor(page:Page){
    //this.page=page
    super(page)
    this.formLayoutMenuItem = page.getByText('Form Layouts')
    this.datePickerMI = page.getByText('Datepicker')
    this.smartTableMi = page.getByText('Smart Table')
    this.toastsMi = page.getByText('Toastr')
    this.tooltipMi = page.getByText('Tooltip')
}

async formLayoutsPage(){
    //await this.page.getByText('Forms').click();
    await this.selectGroupMenuItem('Forms')
    await this.formLayoutMenuItem.click();
    await this.waitForNumberOfSecond(2)
}

async datepickerPage(){
//await this.page.getByText('Forms').click();
await this.selectGroupMenuItem('Forms')
await this.datePickerMI.click()
}

async smartTablePage(){
//await this.page.getByText('Tables & Data').click();
await this.selectGroupMenuItem('Tables & Data')
await this.smartTableMi.click();
}

async toastrPage(){
//await this.page.getByText('Modal & Overlays').click();
await this.selectGroupMenuItem('Modal & Overlays')
await this.toastsMi.click();
}

async tooltipPage(){
//await this.page.getByText('Modal & Overlays').click();
await this.selectGroupMenuItem('Modal & Overlays')
await this.tooltipMi.click();
}

private async selectGroupMenuItem(groupItemTitle:string){
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute('aria-expanded')
    if(expandedState == "false") 
        await groupMenuItem.click()
}
}