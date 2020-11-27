// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

// Calculate Results
function calculateResults(e) {
  // UI variables
  const amountEl = document.getElementById("amount");
  const interestEl = document.getElementById("interest");
  const yearsEl = document.getElementById("years");
  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const totalPaymentEl = document.getElementById("total-payment");
  const totalInterestEl = document.getElementById("total-interest");

  const principal = parseFloat(amountEl.value);
  const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsEl.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymentEl.value = monthly.toFixed(2);
    totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestEl.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError("Please check your numbers");
  }

  e.preventDefault();
}

// Shoe Error
function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elemeents
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Classes
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 5 seconds
  setTimeout(clearError, 5000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
