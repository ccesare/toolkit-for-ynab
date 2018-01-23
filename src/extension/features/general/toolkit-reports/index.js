import { Feature } from 'toolkit/extension/features/feature';

export class ToolkitReports extends Feature {
  // Always invoke ToolkitReports -- invoke() adds the button to the sidebar
  shouldInvoke() {
    return true;
  }

  invoke() {

  }

  // The navigation options get updated in some cases, make sure our button
  // is always there so users can always see reports :D
  observe(changedNodes) {
    console.log(changedNodes);
    if (
      changedNodes.has('nav-main')
    ) {
      this.ensureToolkitReportsNavItem();
    }
  }

  ensureToolkitReportsNavItem() {
    const navItemExists = $('.nav-main .ynab-toolkit-navlink-reports').length !== 0;

    if (!navItemExists) {
      const toolkitReportsNavItem = $('<li>', { class: 'ynab-toolkit-navlink-reports' })
        .append($('<a>', { class: 'ynab-toolkit-reports-link', text: 'Toolkit Reports' })
          .prepend($('<span>', { class: 'flaticon stroke document-4' })));

      $('.ynab-toolkit-navlink-reports', toolkitReportsNavItem)
        .click(() => {

        });

      $('.nav-main .navlink-accounts')
        .before(toolkitReportsNavItem);
    }
  }
}
