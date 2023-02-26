import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('check sunglasses event', async () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };
    test.beforeEach(async ({ homePage, categoryPage, productPage }) => {
        await homePage.goto();
        await homePage.WizardContainer.gotoSunglasses();
        await categoryPage.getProducts();
        await categoryPage.getFirstProduct();
        await productPage.selectLensesClick();
        await productPage.WizardContainer.selectOptionClick();
        await productPage.WizardContainer.continueButtonClick();
        await productPage.WizardContainer.continueButtonClick();
    });

    test('catch events by steps', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        await productPage.WizardContainer.continueButtonClick();

        await verifyEvent('No Coating Added');

        await productPage.WizardContainer.backButtonClick();
        await productPage.WizardContainer.hydraphobicBtnClick();
        await productPage.WizardContainer.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Add');

        await productPage.WizardContainer.backButtonClick();
        await productPage.WizardContainer.hydraphobicBtnClick();
        await productPage.WizardContainer.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Remove');

        await productPage.WizardContainer.backButtonClick();
        await productPage.WizardContainer.openPopupBtnClick();
        await productPage.WizardContainer.addHydrophobicBtnClick();
        await productPage.WizardContainer.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Add - PopUp');

        await productPage.WizardContainer.backButtonClick();
        await productPage.WizardContainer.openPopupBtnClick();
        await productPage.WizardContainer.addedHydrophobicBtnClick();
        await productPage.WizardContainer.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Remove - PopUp');
    });
});
