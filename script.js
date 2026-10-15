"use strict";

const bmiForm = document.querySelector("#bmi-form");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const heightError = document.querySelector("#height-error");
const weightError = document.querySelector("#weight-error");
const formError = document.querySelector("#form-error");
const resultCard = document.querySelector("#result");
const bmiValue = document.querySelector("#bmi-value");
const categoryBadge = document.querySelector("#category-badge");
const categoryMessage = document.querySelector("#category-message");
const resetButton = document.querySelector("#reset-button");

const inputRules = {
  height: { input: heightInput, error: heightError, min: 50, max: 300, unit: "cm" },
  weight: { input: weightInput, error: weightError, min: 10, max: 500, unit: "kg" },
};

/**
 * Validate one measurement and show a helpful message beside its field.
 * The limits reject implausible values while allowing a broad adult range.
 */
function validateMeasurement(rule) {
  const rawValue = rule.input.value.trim();
  let message = "";

  if (rawValue === "") {
    message = "Please enter your " + rule.unit + " value.";
  } else if (rule.input.validity.badInput) {
    message = "Please enter a valid number.";
  } else {
    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
      message = "Please enter a valid number.";
    } else if (value <= 0) {
      message = "Value must be greater than zero.";
    } else if (value < rule.min || value > rule.max) {
      message = "Enter a value from " + rule.min + " to " + rule.max + " " + rule.unit + ".";
    }
  }

  rule.error.textContent = message;
  rule.input.setAttribute("aria-invalid", String(message !== ""));
  return message === "" ? Number(rawValue) : null;
}

/**
 * Return the category and supportive, non-diagnostic message for a BMI.
 */
function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return {
      name: "Underweight",
      className: "underweight",
      message: "Your BMI is below the typical adult range. A healthcare professional can help put this result in context.",
    };
  } else if (bmi < 25) {
    return {
      name: "Normal weight",
      className: "normal",
      message: "Your BMI is within the typical adult range. Keep in mind that BMI is only one measure of health.",
    };
  } else if (bmi < 30) {
    return {
      name: "Overweight",
      className: "overweight",
      message: "Your BMI is above the typical adult range. Consider discussing your overall health with a professional.",
    };
  }

  return {
    name: "Obesity",
    className: "obesity",
    message: "Your BMI is in the obesity range. A healthcare professional can help you understand what this means for you.",
  };
}

/**
 * Calculate BMI from the form values and present the result.
 */
function calculateBmi(event) {
  event.preventDefault();
  formError.hidden = true;
  formError.textContent = "";
  resultCard.hidden = true;

  const heightCm = validateMeasurement(inputRules.height);
  const weightKg = validateMeasurement(inputRules.weight);

  if (heightCm === null || weightKg === null) {
    formError.textContent = "Please correct the highlighted fields to calculate your BMI.";
    formError.hidden = false;
    return;
  }

  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  const roundedBmi = bmi.toFixed(2);
  const category = getBmiCategory(bmi);

  bmiValue.textContent = "Your BMI is " + roundedBmi;
  categoryBadge.textContent = category.name;
  categoryMessage.textContent = category.message;
  resultCard.className = "result-card " + category.className;
  resultCard.hidden = false;
}

/**
 * Restore all controls and messages to their initial state.
 */
function resetCalculator() {
  bmiForm.reset();

  Object.values(inputRules).forEach(function (rule) {
    rule.error.textContent = "";
    rule.input.removeAttribute("aria-invalid");
  });

  formError.textContent = "";
  formError.hidden = true;
  resultCard.hidden = true;
  resultCard.className = "result-card";
  bmiValue.textContent = "";
  categoryBadge.textContent = "";
  categoryMessage.textContent = "";
  heightInput.focus();
}

bmiForm.addEventListener("submit", calculateBmi);
resetButton.addEventListener("click", resetCalculator);

Object.values(inputRules).forEach(function (rule) {
  rule.input.addEventListener("input", function () {
    if (rule.input.getAttribute("aria-invalid") === "true") {
      validateMeasurement(rule);
    }
    formError.hidden = true;
  });
});
