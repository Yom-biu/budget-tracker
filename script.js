const transactions = [];
const transactionForm = document.getElementById('transactionForm');
const transactionsTableBody = document.querySelector('#transactionsTable tbody');
const totalIncomeElement = document.getElementById('totalIncome');
const totalExpenseElement = document.getElementById('totalExpense');
const netBalanceElement = document.getElementById('netBalance');

transactionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = new Date();

    transactions.push({ description, amount, type, date });
    renderTransactions();
    updateSummary();
    transactionForm.reset();
});

function renderTransactions() {
    transactionsTableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date.toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
        `;
        transactionsTableBody.appendChild(row);
    });
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }
    });

    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpenseElement.textContent = `$${totalExpense.toFixed(2)}`;
    netBalanceElement.textContent = `$${(totalIncome - totalExpense).toFixed(2)}`;
}

function updateView() {
    const viewBy = document.getElementById('viewBy').value;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let filteredTransactions = transactions;

    if (viewBy === 'year') {
        filteredTransactions = transactions.filter(transaction => transaction.date.getFullYear() === currentYear);
    } else if (viewBy === 'month') {
        filteredTransactions = transactions.filter(transaction =>
            transaction.date.getFullYear() === currentYear && transaction.date.getMonth() === currentMonth
        );
    }

    transactionsTableBody.innerHTML = '';
    filteredTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date.toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
        `;
        transactionsTableBody.appendChild(row);
    });

    let totalIncome = 0;
    let totalExpense = 0;

    filteredTransactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense += transaction.amount;
        }
    });

    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpenseElement.textContent = `$${totalExpense.toFixed(2)}`;
    netBalanceElement.textContent = `$${(totalIncome - totalExpense).toFixed(2)}`;
}