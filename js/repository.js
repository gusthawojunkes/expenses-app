class BudgetRepository {
    static KEYS = {
        SALARY: 'budget_salary',
        CATEGORIES: 'budget_categories',
        EXPENSES: 'budget_expenses'
    };

    saveSalary(salary) {
        localStorage.setItem(BudgetRepository.KEYS.SALARY, salary.toString());
    }

    getSalary() {
        const salary = localStorage.getItem(BudgetRepository.KEYS.SALARY);
        return salary ? parseFloat(salary) : 0;
    }

    saveCategories(categories) {
        localStorage.setItem(BudgetRepository.KEYS.CATEGORIES, JSON.stringify(categories));
    }

    getCategories() {
        const categories = localStorage.getItem(BudgetRepository.KEYS.CATEGORIES);
        return categories ? JSON.parse(categories) : [];
    }

    saveExpenses(expenses) {
        localStorage.setItem(BudgetRepository.KEYS.EXPENSES, JSON.stringify(expenses));
    }

    getExpenses() {
        const expenses = localStorage.getItem(BudgetRepository.KEYS.EXPENSES);
        return expenses ? JSON.parse(expenses) : [];
    }

    clearBudgetData() {
        localStorage.removeItem(BudgetRepository.KEYS.SALARY);
        localStorage.removeItem(BudgetRepository.KEYS.CATEGORIES);
        localStorage.removeItem(BudgetRepository.KEYS.EXPENSES);
    }
}