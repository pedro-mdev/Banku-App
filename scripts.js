// Mobile First Nav

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Income and Expense data
let incomes = [];
let expenses = [];

// DOM elements
const incomeNameInput = document.getElementById('income-name');
const incomeAmountInput = document.getElementById('income-amount');
const addIncomeBtn = document.getElementById('add-income-btn');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const incomesList = document.getElementById('incomes');
const expensesList = document.getElementById('expenses');
const monthlyBudget = document.getElementById('monthly-budget');
const dailyBudget = document.getElementById('daily-budget');


// Function to calculate the monthly and daily budgets
function calculateBudgets() {
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const monthlyBudgetValue = totalIncomes - totalExpenses;
  const dailyBudgetValue = monthlyBudgetValue / 30; // Assuming 30 days in a month
  monthlyBudget.textContent = monthlyBudgetValue.toFixed(2);
  dailyBudget.textContent = dailyBudgetValue.toFixed(2);
}

// Function to add an income
function addIncome() {
  const name = incomeNameInput.value;
  const amount = parseFloat(incomeAmountInput.value);

  if (name && amount) {
    const income = { name, amount };
    incomes.push(income);
    renderIncomes();
    calculateBudgets();
    incomeNameInput.value = '';
    incomeAmountInput.value = '';
  }
}

// Function to add an expense
function addExpense() {
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);

  if (name && amount) {
    const expense = { name, amount };
    expenses.push(expense);
    renderExpenses();
    calculateBudgets();
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
}

// Function to remove an income
function removeIncome(index) {
  incomes.splice(index, 1);
  renderIncomes();
  calculateBudgets();
}

// Function to remove an expense
function removeExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  calculateBudgets();
}

// Function to render the income list
function renderIncomes() {
  incomesList.innerHTML = '';
  incomes.forEach((income, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${income.name}: £${income.amount.toFixed(2)}`;
    const removeBtn = document.createElement('img');
    removeBtn.src = '/assets/imgs/icons8-minus-sign-100.png';
    removeBtn.alt = 'Remove';
    removeBtn.addEventListener('click', () => removeIncome(index));

    // CSS styles to the image button
    removeBtn.style.width = '30px';  
    removeBtn.style.height = '30px'; 
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.float = 'right';
    removeBtn.style.margin = '0 50px';

    listItem.appendChild(removeBtn);
    incomesList.appendChild(listItem);
  });
}

// Function to render the expenses list
function renderExpenses() {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.name}: £${expense.amount.toFixed(2)}`;
    const removeBtn = document.createElement('img');
    removeBtn.src = '/assets/imgs/icons8-minus-sign-100.png';
    removeBtn.alt = 'Remove';

    // CSS styles to the image button
    removeBtn.style.width = '24px';  
    removeBtn.style.height = '24px'; 
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.float = 'right';
    removeBtn.style.margin = '0 50px';

    removeBtn.addEventListener('click', () => removeExpense(index));
    listItem.appendChild(removeBtn);
    expensesList.appendChild(listItem);
  });
}

// Event listeners for adding income and expense
addIncomeBtn.addEventListener('click', addIncome);
addExpenseBtn.addEventListener('click', addExpense);


// Animations

// Function to check if an element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle the scroll event
  function handleScroll() {
    var animatedDivs = document.getElementsByClassName('animated-div');
    for (var i = 0; i < animatedDivs.length; i++) {
      var div = animatedDivs[i];
      if (isInViewport(div)) {
        div.style.opacity = 1;
        div.style.transform = 'translateY(0)';
      }
    }
  }
  
  // Attach the scroll event listener
 window.addEventListener('scroll', handleScroll);