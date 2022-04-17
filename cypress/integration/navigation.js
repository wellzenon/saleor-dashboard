/// <reference types="cypress"/>
/// <reference types="../support"/>

import { PERMISSIONS_OPTIONS } from "../fixtures/permissionsUsers";
import filterTests from "../support/filterTests";
import * as permissionsSteps from "../support/pages/permissionsPage";

describe("As a staff user I want to navigate through shop using different permissions", () => {
  Object.keys(PERMISSIONS_OPTIONS).forEach(key => {
    const tags =
      key === "all" ? ["critical", "all", "refactored"] : ["all", "refactored"];
    filterTests({ definedTags: tags }, () => {
      it(`should be able to navigate through shop as a staff member using ${key} permission. ${PERMISSIONS_OPTIONS[key].testCase}`, () => {
        const permissionOption = PERMISSIONS_OPTIONS[key];
        const permissions = permissionOption.permissions;
        cy.clearSessionData();
        permissionsSteps.navigateToAllAvailablePageAndCheckIfDisplayed(
          permissionOption
        );
        if (key === "all") {
          return;
        }
        permissionsSteps
          .getDisplayedSelectors()
          .then(selectors => {
            permissionsSteps.expectAllSelectorsPermitted(
              permissions,
              selectors
            );
          })
          .then(() => {
            if (!permissions) {
              return;
            }
            permissions.forEach(permission => {
              if (permission.parent) {
                cy.get(permission.parent.parentMenuSelector)
                  .click()
                  .then(() => {
                    permissionsSteps.getDisplayedSelectors(
                      permission.parent.parentSelectors
                    );
                  })
                  .then(parentSelectors => {
                    permissionsSteps.expectAllSelectorsPermitted(
                      permissions,
                      parentSelectors
                    );
                  });
              }
            });
          });
      });
    });
  });
});
