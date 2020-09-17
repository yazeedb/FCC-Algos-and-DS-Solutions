const moneyMap = {
  'ONE HUNDRED': 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

const getTotalCid = (cid) =>
  cid.reduce((total, [unit, amount]) => total + amount, 0);

const safelyRoundMoney = (amount) => Math.round(amount * 100) / 100;

const checkCashRegister = (price, cash, cid) => {
  const change = [];
  let changeDue = cash - price;

  if (changeDue === getTotalCid(cid)) {
    return {
      status: 'CLOSED',
      change: cid,
    };
  }

  [...cid].reverse().forEach(([unit, amount]) => {
    const unitValue = moneyMap[unit];

    if (unitValue > changeDue) {
      return;
    }

    let unitsTaken = 0;

    while (changeDue >= unitValue && amount > 0) {
      changeDue = safelyRoundMoney(changeDue - unitValue);
      amount = safelyRoundMoney(amount - unitValue);
      unitsTaken++;
    }

    change.push([unit, unitsTaken * unitValue]);
  });

  if (changeDue > 0) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: [],
    };
  }

  return {
    status: 'OPEN',
    change,
  };
};

console.log(
  '\n--------First test--------\n',
  checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ]),
  {
    status: 'OPEN',
    change: [['QUARTER', 0.5]],
  },

  '\n--------Second test--------\n',
  checkCashRegister(3.26, 100, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ]),
  {
    status: 'OPEN',
    change: [
      ['TWENTY', 60],
      ['TEN', 20],
      ['FIVE', 15],
      ['ONE', 1],
      ['QUARTER', 0.5],
      ['DIME', 0.2],
      ['PENNY', 0.04],
    ],
  },

  '\n--------Third test--------\n',
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]),
  { status: 'INSUFFICIENT_FUNDS', change: [] },

  '\n--------Fourth test--------\n',
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 1],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]),
  { status: 'INSUFFICIENT_FUNDS', change: [] },

  '\n--------Fifth test--------\n',
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ]),
  {
    status: 'CLOSED',
    change: [
      ['PENNY', 0.5],
      ['NICKEL', 0],
      ['DIME', 0],
      ['QUARTER', 0],
      ['ONE', 0],
      ['FIVE', 0],
      ['TEN', 0],
      ['TWENTY', 0],
      ['ONE HUNDRED', 0],
    ],
  }
);
