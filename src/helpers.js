// Pretend it is hitting the network
function waait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * 2000);
  });
}

// Local storage
function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function deleteItem({ key }) {
  localStorage.removeItem(key);
}

function generateRandomColor() {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
}

function createBudget({ name, amount }) {
  const newBudget = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name: name,
    amount: +amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newBudget]));
}

function createExpense({ name, amount, budgetId }) {
  const newExpense = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name: name,
    amount: +amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newExpense]));
}

function formatCurrency(amount) {
  return amount.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function formatPercentage(amount) {
  return amount.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 });
}

function formatDateToLocaleString(epoch) {
  return new Date(epoch).toLocaleDateString();
}

function calculateSpentByBudget(budgetId) {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) {
      return acc;
    }
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
}

export { waait, fetchData, deleteItem, createBudget, createExpense, formatCurrency, formatPercentage, formatDateToLocaleString, calculateSpentByBudget };
