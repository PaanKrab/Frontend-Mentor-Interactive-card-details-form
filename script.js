const mediaQueries = window.matchMedia("(min-width: 1441px)");
const alerts = document.querySelectorAll(".alert");
const inputs = document.querySelectorAll("input");
const inputsSection = document.querySelector(".inputs__confirm");
const successSection = document.querySelector(".success");
const cardNumber = document.querySelector(".number");
const cardOwner = document.querySelector(".owner");
const cardExp = document.querySelector(".exp__date");
const cardExpMonths = document.querySelector(".exp__months");
const cardExpYears = document.querySelector(".exp__years");
const cardCVC = document.querySelector(".cvc__back");
const cardHolderInput = document.querySelector(".cardholder__input");
const cardNumberInput = document.querySelector(".cardnumber__input");
const monthsInput = document.querySelector(".months__input");
const yearsInput = document.querySelector(".years__input");
const cvcInput = document.querySelector(".cvc__input");
const alertName = document.querySelector(".alert__name");
const alertNumber = document.querySelector(".alert__number");
const alertYears = document.querySelector(".alert__years");
const alertMonths = document.querySelector(".alert__months");
const alertCvc = document.querySelector(".alert__cvc");
const button = document.querySelector(".button");

button.addEventListener("click", function () {
  //variables
  let cardNumberValue = cardNumberInput.value;
  let cardHolderValue = cardHolderInput.value;
  let cardMonthsValue = monthsInput.value;
  let cardYearsValue = yearsInput.value;
  let cardCvcValue = cvcInput.value;
  //validation function for letters
  const onlyLettersValid = function (string) {
    return /^[A-Za-z\s]*$/.test(string);
  };
  //validation function for numbers
  const onlyNumbersValid = function (string) {
    return /^\d+$/.test(string);
  };

  //when everything is okay
  if (
    onlyLettersValid(`${cardHolderValue}`) === true &&
    cardHolderValue != "" &&
    onlyNumbersValid(`${cardNumberValue}`) === true &&
    cardNumberValue != "" &&
    cardNumberValue.length === 16 &&
    onlyNumbersValid(cardMonthsValue) === true &&
    cardMonthsValue != "" &&
    cardMonthsValue.length === 2 &&
    onlyNumbersValid(cardYearsValue) === true &&
    cardYearsValue != "" &&
    cardYearsValue.length === 2 &&
    onlyNumbersValid(cardCvcValue) === true &&
    cardCvcValue != "" &&
    cardCvcValue.length === 3
  ) {
    //4 digits gap
    let cn = cardNumberValue;
    const cnGap = cn.match(/.{1,4}/g);
    const cnJoin = cnGap.join(" ");
    //adding textContent to fields
    cardOwner.textContent = cardHolderValue;
    cardNumber.textContent = cnJoin;
    cardExpMonths.textContent = cardMonthsValue;
    cardExpYears.textContent = cardYearsValue;
    cardCVC.textContent = cardCvcValue;

    //Resseting layout
    for (const a of alerts) {
      a.style.visibility = "hidden";
    }
    for (let i of inputs) {
      i.style.borderColor = "rgba(223, 222, 224, 1)";
    }

    //prompting success message
    //hiding inputs
    inputsSection.style.visibility = "hidden";
    //prompting message
    successSection.style.visibility = "visible";
    //animation function
    const anim = function (mq) {
      if (mq.matches) {
        inputsSection.style.top = "-50%";
        successSection.style.top = "55%";
      }
    };
    anim(mediaQueries);
    //animation listener
    mediaQueries.addEventListener("click", anim);
  }

  //Functions error
  const error = function (alert, input, text) {
    alert.style.visibility = "visible";
    alert.textContent = text;
    input.style.borderColor = "red";
  };

  const errorElse = function (alert, input) {
    alert.style.visibility = "hidden";
    input.style.borderColor = "rgba(223, 222, 224, 1)";
  };

  //🔴when something is wrong
  //CARD HOLDER ISSUES
  if (cardHolderValue === "") {
    error(alertName, cardHolderInput, "Required");
  } else if (
    onlyLettersValid(`${cardHolderValue}`) === false &&
    cardHolderValue !== ""
  ) {
    error(alertName, cardHolderInput, "Only letters");
  } else {
    alertName.style.visibility = "hidden";
    cardHolderInput.style.borderColor = "rgba(223, 222, 224, 1)";
    // errorElse(alertName, cardHolderInput);
  }
  //CARD NUMBER ISUES
  if (cardNumberValue === "") {
    error(alertNumber, cardNumberInput, "Required");
  } else if (
    onlyNumbersValid(`${cardNumberValue}`) === false &&
    cardNumberValue !== ""
  ) {
    error(alertNumber, cardNumberInput, "Only digits");
  } else if (
    onlyNumbersValid(`${cardNumberValue}`) === true &&
    cardNumberValue.length < "16"
  ) {
    error(alertNumber, cardNumberInput, "16 digits required");
  } else {
    errorElse(alertNumber, cardNumberInput);
  }

  //EXP DATE MONTHS ISSUES
  if (cardMonthsValue.length < "2" && cardMonthsValue !== "") {
    error(alertMonths, monthsInput, "Wrong format");
  } else if (
    onlyNumbersValid(`${cardMonthsValue}`) === false &&
    cardMonthsValue !== ""
  ) {
    error(alertMonths, monthsInput, "Only digits");
  } else if (cardMonthsValue === "") {
    error(alertMonths, monthsInput, "Required");
  } else {
    errorElse(alertMonths, monthsInput);
  }

  //EXP DATE YEARS ISSUES
  if (cardYearsValue.length < "2" && cardYearsValue !== "") {
    error(alertYears, yearsInput, "Wrong format");
  } else if (
    onlyNumbersValid(`${cardYearsValue}`) === false &&
    cardYearsValue !== ""
  ) {
    error(alertYears, yearsInput, "Only digits");
  } else if (cardMonthsValue === "") {
    error(alertYears, yearsInput, "Required");
  } else {
    errorElse(alertYears, yearsInput);
    alertYears.style.visibility = "hidden";
    yearsInput.style.borderColor = "rgba(223, 222, 224, 1)";
  }

  //CVC ISSUES
  if (cardCvcValue.length < "3" && cardCvcValue !== "") {
    error(alertCvc, cvcInput, "3 digits required");
  } else if (
    onlyNumbersValid(`${cardCvcValue}`) === false &&
    cardCvcValue !== ""
  ) {
    error(alertCvc, cvcInput, "Only digits");
  } else if (cardCvcValue === "") {
    error(alertCvc, cvcInput, "Required");
  } else {
    errorElse(alertCvc, cvcInput);
  }
});
