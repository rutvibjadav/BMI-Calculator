# BMI Calculator – Veda Technology Internship Day 6

A responsive, browser-based Body Mass Index (BMI) calculator built with plain HTML, CSS, and JavaScript. Enter a height in centimeters and a weight in kilograms to see your BMI, its adult screening category, and a brief explanation.

## Features

- Responsive layout for phones, tablets, and desktop screens.
- Height and weight validation with clear, field-specific error messages.
- Accepts decimal measurements and calculates BMI to two decimal places.
- Displays color-coded Underweight, Normal weight, Overweight, and Obesity categories.
- Calculate by clicking the button or submitting the form with Enter.
- Reset measurements, validation messages, and results in one click.
- Includes a reminder that BMI is a screening measure, not a medical diagnosis.
- No framework, build step, or third-party JavaScript library required.

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript

## BMI calculation formula

Height is converted from centimeters to meters. The calculator then uses:

```text
BMI = weight in kilograms / (height in meters × height in meters)
```

The displayed BMI is rounded to two decimal places. Category thresholds use the unrounded calculated value.

## BMI categories

These standard adult screening categories are used:

| BMI | Category |
| --- | --- |
| Less than 18.5 | Underweight |
| 18.5 to less than 25 | Normal weight |
| 25 to less than 30 | Overweight |
| 30 or above | Obesity |

BMI does not directly measure body fat or diagnose a health condition. Age, body composition, and other factors matter; consult a healthcare professional for personal advice.

## Input limits

To catch likely entry mistakes, the calculator accepts heights from **50 to 300 cm** and weights from **10 to 500 kg**.

## Run locally

1. Download or clone this project.
2. Open `index.html` directly in a modern web browser.

No installation or local server is needed. The page is also ready to publish from a GitHub repository with GitHub Pages.

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
└── README.md
```

## Project details

- **Developer:** Rutvi Jadav
- **Internship:** Veda Technology
- **Task:** Day 6 – BMI Calculator
