import {test,expect} from '@playwright/test'

test.beforeEach(async ({page}) =>{
    //hooks(beforeEach , beforeAll,afterall, afterEach) - will run before each test in this describe block
    await page.goto('http://localhost:4200/');
    });

test.describe('Form Layouts page', () =>{
    test.beforeEach(async ({page}) =>{
    await page.getByText('Forms').click();
    await page.getByTitle('Form Layouts').click();
    })

    test('Input fields' ,{tag:'@inputF'} ,async ({page}) =>{
    const gridEmaiInput =  page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"})
    await gridEmaiInput.fill('test@test.com')
    await gridEmaiInput.clear()
    await gridEmaiInput.pressSequentially('test2@tets.com',{delay:500})

    //generic assertion
    const inpvalue = await gridEmaiInput.inputValue()
    expect(inpvalue).toEqual('test2@tets.com')
    //locator assert
    await expect(gridEmaiInput).toHaveValue('test2@tets.com')
    })

    test('radio buttons' , async ({page}) =>{
    const gridForm =  page.locator('nb-card',{hasText:"Using the Grid"})
    await gridForm.getByLabel('Option 1').check({force:true})
    await gridForm.getByRole('radio',{name:"Option 1"}).check({force:true})
    const radioStatus = await gridForm.getByRole('radio',{name:"Option 1"}).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(await gridForm.getByRole('radio',{name:"Option 2"}).isChecked()).toBeFalsy()
    })
})

test('checkboxes' , async ({page}) =>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();
    await page.getByRole('checkbox', {name:"Hide on click"}).uncheck({force:true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('dropdown', async ({page}) =>{
const dropDownMenu = page.locator('ngx-header nb-select')
await dropDownMenu.click()
// 2 ways to handle list -
//page.getByRole('list') or page.getByRole('listitem')
// list is used when UL tag , listitem when LI tag.

const optionList = await page.getByRole('list').locator('nb-option')
const ans = await  optionList.allTextContents()
await expect(optionList).toHaveText(ans)
await optionList.filter({hasText:'Dark'}).click()
})

test('tooltip' , async ({page}) =>{
await page.getByText('Modal & Overlays').click();
await page.getByText('Tooltip').click();

const tooltipCard = page.locator('nb-card',{hasText : "Tooltip Placements"})
await tooltipCard.getByRole('button',{name:"Top"}).hover();
const tooltipmsg = page.locator('nb-tooltip').filter({hasText : "This is a tooltip"})
await expect(tooltipmsg).toBeVisible()
})

test('dialouge box',async ({page})=>{
await page.getByText('Tables & Data').click();
await page.getByText('Smart Table').click();

page.on('dialog', dialog=>{
    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()
})
await page.getByRole('table').locator('tr',{hasText:"mdo@gmail.com"}).locator('.nb-trash').click()
await expect(page.locator('table tr').first()).not.toHaveText('')
})

test('Web Tables' ,{tag:'@table'} ,async ({page}) =>{
await page.getByText('Tables & Data').click();
await page.getByText('Smart Table').click();

// for rows in table its ideal to use 'row' 
const targetRow = page.getByRole('row',{name:"twitter@outlook.com"})
await targetRow.locator('.nb-edit').click()
await page.locator('input-editor').getByPlaceholder('Age').clear()
await page.locator('input-editor').getByPlaceholder('Age').fill('35')
await page.locator('.nb-checkmark').click()

//get the row by specific column
page.locator('.ng2-smart-pagination-nav').getByText("2").click()
const targetRowByID = page.getByRole('row',{name:"11"}).filter({has : page.locator('td').nth(1).getByText('11')})
await targetRowByID.locator('.nb-edit').click()
await page.locator('input-editor').getByPlaceholder('E-mail').clear()
await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.comm')
await page.locator('.nb-checkmark').click()
await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@test.comm')

//test filter at table
const ages =["20","30" , "40","48"]
for(let age of ages){
await page.locator('input-filter').getByPlaceholder('Age').clear()
await page.locator('input-filter').getByPlaceholder('Age').fill(age)
await page.waitForTimeout(500)
const ageRows = page.locator('tbody tr')

for(let row of await ageRows.all()){
    const cellValue = await row.locator('td').last().textContent()
    expect(cellValue).toEqual(age)
    }
}

})

//sliders
test('sliders', async ({page}) => {
// Update attribute
const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
await tempGauge.evaluate(node => {
node.setAttribute('cx', '232.630')
node.setAttribute('cy', '232.630')
})
await tempGauge.click()
//Mouse movement
const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
await tempBox.scrollIntoViewIfNeeded()

const box = await tempBox.boundingBox()
const x = box?.x + box.width / 2
const y = box?.y + box.height / 2
await page.mouse.move(x, y)
await page.mouse.down()
await page.mouse.move(x +100, y)
await page.mouse.move(x+100, y+100)
await page.mouse.up()
await expect(tempBox).toContainText('30')
})