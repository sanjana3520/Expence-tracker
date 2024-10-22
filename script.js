
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Function to update expenses in localStorage and UI
    function updateExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      updateTotal();
    }
  
    // Function to render expenses in the UI
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}</span> - $${expense.amount} - ${expense.category} - ${expense.date || 'N/A'}
          <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }
  
    // Function to calculate total expenses
    function updateTotal() {
      const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      totalAmount.textContent = total.toFixed(2);
    }
  
    // Handle form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('expense-name').value;
      const amount = document.getElementById('expense-amount').value;
      const category = document.getElementById('expense-category').value;
      const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];
  
      if (name === '' || amount <= 0 || category === '') {
        alert('Please fill in all required fields correctly.');
        return;
      }
  
      // If editing an existing expense
      const isEditing = form.dataset.editing === 'true';
      const editingIndex = form.dataset.index;
  
      if (isEditing) {
        expenses[editingIndex] = { name, amount, category, date };
        form.dataset.editing = 'false';
      } else {
        expenses.push({ name, amount, category, date });
      }
  
      updateExpenses();
      form.reset();
    });
  
    // Function to edit an expense
    window.editExpense = function (index) {
      const expense = expenses[index];
      document.getElementById('expense-name').value = expense.name;
      document.getElementById('expense-amount').value = expense.amount;
      document.getElementById('expense-category').value = expense.category;
      document.getElementById('expense-date').value = expense.date;
  
      form.dataset.editing = 'true';
      form.dataset.index = index;
    };
  
    // Function to delete an expense
    window.deleteExpense = function (index) {
      expenses.splice(index, 1);
      updateExpenses();
    };
  
    // Initialize the app
    renderExpenses();
    updateTotal();
  });
  