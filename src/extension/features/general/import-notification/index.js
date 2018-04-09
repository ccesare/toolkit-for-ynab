import { Feature } from 'toolkit/extension/features/feature';

export class ImportNotification extends Feature {
  isActive = false;
  importClass = 'import-notification';

  injectCSS() { return require('./index.css'); }

  willInvoke() {
    if (this.settings.enabled !== '0') {
      if (this.settings.enabled === '2') {
        this.importClass += '-red';
      }

      // Hook transaction imports so that we can run our stuff when things change. The idea is for our code to
      // run when new imports show up while the user isn't doing anything in the app. The down side is the
      // handler being called when the user does something like "approve a transaction". That's why this feature
      // has a blocking mechanism (the isActive flag).
      ynab.YNABSharedLib.defaultInstance.entityManager._transactionEntityPropertyChanged.addHandler(this.invoke);
    }
  }

  shouldInvoke() {
    return !this.isActive;
  }

  invoke = () => {
    this.checkImportTransactions();
  }

  observe(changedNodes) {
    if (!this.shouldInvoke()) return;
    // To minimize checking for imported transactions, only do it if the changed nodes includes ynab-grid-body
    // if we're not already actively check.
    if (changedNodes.has('ynab-grid-body') && !this.shouldInvoke()) {
      this.invoke();
    }
  }

  onRouteChanged() {
    if (this.shouldInvoke()) {
      this.invoke();
    }
  }

  checkImportTransactions() {
    this.isActive = true;

    $('.' + this.importClass).remove();
    $('.nav-account-row').each((index, row) => {
      let account = ynabToolKit.shared.getEmberView($(row).attr('id')).get('data');

      // Check for both functions should be temporary until all users have been switched to new bank data
      // provider but of course we have no good way of knowing when that has occurred.
      if (typeof account.getDirectConnectEnabled === 'function' && account.getDirectConnectEnabled() ||
          typeof account.getIsDirectImportActive === 'function' && account.getIsDirectImportActive()) {
        let t = new ynab.managers.DirectImportManager(ynab.YNABSharedLib.defaultInstance.entityManager, account);
        let transactions = t.getImportTransactionsForAccount(account);

        if (transactions.length >= 1) {
          $(row)
            .find('.nav-account-notification')
            .append('<a class="notification ' + this.importClass + '">' + transactions.length + '</a>');
        }
      }
    });
    this.isActive = false;
  }
}
