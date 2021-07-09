//----------------------- inputs -------------------------

const loanSumm = document.getElementById("loan-summ");
const creditTerm = document.getElementById("credit-term");

const loanSummRange = document.getElementById("loan-summ-range");
const creditTermRange = document.getElementById("credit-term-range");

const totalCreditSumm = document.getElementById("total-credit-summ");
const totalMonthlyPayment = document.getElementById("monthly-payment");

const inputsRange = document.querySelectorAll(".range__slider");
const inputValue = document.querySelectorAll(".summ");

const assingValue = () => {
  loanSumm.value = loanSummRange.value;
  creditTerm.value = creditTermRange.value;
};

const assingRange = () => {
  loanSummRange.value = loanSumm.value;
  creditTermRange.value = creditTerm.value;
};
assingValue();

for (let input of inputsRange) {
  input.addEventListener("input", () => {
    assingValue();
    calculation(loanSumm.value, creditTerm.value);
  });
}

for (let value of inputValue) {
  value.addEventListener("input", () => {
    assingRange();
    calculation(loanSumm.value, creditTerm.value);
  });
}

window.onload = function () {
  calculation(loanSumm.value, creditTerm.value);
};

//--------------------- Calculator formula ------------------

const calculation = (loanSumm = 750, creditTerm = 3) => {
  let monthlyPayment;
  let totalCredit;
  let numberOfMonths = creditTerm;
  let interestRate = 9 / 100 / 12;

  monthlyPayment = (
    (loanSumm * interestRate * Math.pow(1 + interestRate, numberOfMonths)) /
    (Math.pow(1 + interestRate, numberOfMonths) - 1)
  ).toFixed(2);
  totalCredit = (monthlyPayment * numberOfMonths).toFixed(2);

  if (loanSumm < 750 || creditTerm < 3) {
    return (
      (totalCreditSumm.innerHTML = `0€`), (totalMonthlyPayment.innerHTML = `0€`)
    );
  } else {
    totalCreditSumm.innerHTML = `${totalCredit}€`;
    totalMonthlyPayment.innerHTML = `${monthlyPayment}€`;
  }
  if (loanSumm > 7500 || creditTerm > 72) {
    return (
      (totalCreditSumm.innerHTML = `0€`), (totalMonthlyPayment.innerHTML = `0€`)
    );
  } else {
    totalCreditSumm.innerHTML = `${totalCredit}€`;
    totalMonthlyPayment.innerHTML = `${monthlyPayment}€`;
  }
};
//-------------------- input range background --------------------

const rangeInputs = document.querySelectorAll(".range__slider");

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

//------------------ localStorage -----------------

window.addEventListener("storage", function (e) {});

if (!localStorage.Loan) localStorage.Loan = "0";

loanSumm.onclick = () => {
  localStorage.Loan++;
};

if (!localStorage.Months) localStorage.Months = "0";

creditTerm.onclick = () => {
  localStorage.Months++;
};
