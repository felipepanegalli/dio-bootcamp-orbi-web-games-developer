class BankAccount {
    constructor(agency, numberAccount, typeAccount) {
        this.agency = agency;
        this.numberAccount = numberAccount;
        this.typeAccount = typeAccount;
        this._balance = 0;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    withdraw(value) {
        if (value > this._balance) {
            return 'Operação negada';
        }
        this._balance = this._balance - value;
        return this._balance;
    }

    deposit(value) {
        this._balance = this._balance + value;
        return this._balance;
    }
}

class CheckingAccount extends BankAccount {
    constructor(agency, numberAccount, creditCard) {
        super(agency, numberAccount);
        this.typeAccount = 'checking';
        this._creditCard = creditCard;
    }

    get creditCard() {
        return this._creditCard;
    }

    set creditCard(value) {
        this._creditCard = value;
    }
}

class SavingAccount extends BankAccount {
    constructor(agency, numberAccount) {
        super(agency, numberAccount);
        this.typeAccount = 'saving';
    }
}

class UniversityAccount extends BankAccount {
    constructor(agency, numberAccount) {
        super(agency, numberAccount);
        this.typeAccount = 'university';
    }

    withdraw(value) {
        if (value > 500) {
            return 'Operação negada';
        }
        this._balance = this._balance - value;
    }
}