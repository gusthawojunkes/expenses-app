class BudgetService {
    constructor() {
        this.repository = new BudgetRepository();
    }

    initialize() {
        const salary = this.repository.getSalary();
        const categories = this.repository.getCategories();
        const expenses = this.repository.getExpenses();
        return { salary, categories, expenses };
    }

    updateSalary(salary) {
        this.repository.saveSalary(salary);
    }

    addCategory(category, currentCategories) {
        const updatedCategories = [...currentCategories, category];
        this.repository.saveCategories(updatedCategories);
        return updatedCategories;
    }

    removeCategory(index, currentCategories) {
        const updatedCategories = [...currentCategories];
        updatedCategories.splice(index, 1);
        this.repository.saveCategories(updatedCategories);
        return updatedCategories;
    }

    updateCategories(categories) {
        this.repository.saveCategories(categories);        return categories;    }

    addExpense(expense, currentExpenses) {
        const updatedExpenses = [...currentExpenses, expense];
        this.repository.saveExpenses(updatedExpenses);
        return updatedExpenses;
    }

    removeExpense(id, currentExpenses) {
        const updatedExpenses = currentExpenses.filter(expense => expense.id !== id);
        this.repository.saveExpenses(updatedExpenses);
        return updatedExpenses;
    }

    updateExpenses(expenses) {
        this.repository.saveExpenses(expenses);
        return expenses;
    }

    createCategory(name, expenseIds, currentExpenses, currentCategories) {
        // Create a new category with the selected expenses
        const categoryExpenses = currentExpenses.filter(expense => expenseIds.includes(expense.id));
        const totalValue = categoryExpenses.reduce((sum, expense) => sum + expense.value, 0);
        const percentage = this.repository.getSalary() > 0 ? (totalValue / this.repository.getSalary()) * 100 : 0;
        
        const newCategory = {
            id: Date.now().toString(),
            name,
            value: totalValue,
            percentage,
            expenseIds,
            isExpanded: false
        };
        
        const updatedCategories = [...currentCategories, newCategory];
        this.repository.saveCategories(updatedCategories);
        return updatedCategories;
    }

    recalculateExpensesAndCategories(newSalary, expenses, categories) {
        // Recalculate percentages for expenses
        const updatedExpenses = expenses.map(expense => {
            if (expense.inputType === 'percentage') {
                const newValue = (expense.originalValue / 100) * newSalary;
                return {
                    ...expense,
                    value: newValue,
                    percentage: expense.originalValue
                };
            }
            return {
                ...expense,
                percentage: newSalary > 0 ? (expense.value / newSalary) * 100 : 0
            };
        });
        
        // Recalculate categories based on updated expenses
        const updatedCategories = categories.map(category => {
            const categoryExpenses = updatedExpenses.filter(expense => 
                category.expenseIds && category.expenseIds.includes(expense.id)
            );
            const totalValue = categoryExpenses.reduce((sum, expense) => sum + expense.value, 0);
            const percentage = newSalary > 0 ? (totalValue / newSalary) * 100 : 0;
            
            return {
                ...category,
                value: totalValue,
                percentage
            };
        });
        
        this.repository.saveExpenses(updatedExpenses);
        this.repository.saveCategories(updatedCategories);
        
        return { updatedExpenses, updatedCategories };
    }

    clearBudgetData() {
        this.repository.clearBudgetData();
    }
}