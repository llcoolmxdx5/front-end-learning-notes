class Bank {
  /**
   * @param {number[]} balance
   */
  constructor(balance) {
    this.balance = balance;
  }

  /**
   * @param {number} account1
   * @param {number} account2
   * @param {number} money
   * @return {boolean}
   */
  transfer(account1, account2, money) {
    if (
      this.balance[account1 - 1] < money ||
      account1 > this.balance.length ||
      account2 > this.balance.length
    ) {
      // console.log("false");
      return false;
    }
    this.balance[account1 - 1] -= money;
    this.balance[account2 - 1] += money;
    // console.log("true");
    return true;
  }

  /**
   * @param {number} account
   * @param {number} money
   * @return {boolean}
   */
  deposit(account, money) {
    if (account > this.balance.length) {
      // console.log("false");
      return false;
    }
    this.balance[account - 1] += money;
    // console.log("true");
    return true;
  }

  /**
   * @param {number} account
   * @param {number} money
   * @return {boolean}
   */
  withdraw(account, money) {
    if (this.balance[account - 1] < money || account > this.balance.length) {
      // console.log("false");
      return false;
    }
    this.balance[account - 1] -= money;
    // console.log("true");
    return true;
  }
}

const bank = new Bank([10, 100, 20, 50, 30]);
bank.withdraw(3, 10); // 返回 true ，账户 3 的余额是 $20 ，所以可以取款 $10 。
// 账户 3 余额为 $20 - $10 = $10 。
bank.transfer(5, 1, 20); // 返回 true ，账户 5 的余额是 $30 ，所以可以转账 $20 。
// 账户 5 的余额为 $30 - $20 = $10 ，账户 1 的余额为 $10 + $20 = $30 。
bank.deposit(5, 20); // 返回 true ，可以向账户 5 存款 $20 。
// 账户 5 的余额为 $10 + $20 = $30 。
bank.transfer(3, 4, 15); // 返回 false ，账户 3 的当前余额是 $10 。
// 所以无法转账 $15 。
bank.withdraw(10, 50); // 返回 false ，交易无效，因为账户 10 并不存在
