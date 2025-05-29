class BudgetRepository {
    static KEYS = {
        SALARY: 'budget_salary',
        CATEGORIES: 'budget_categories'
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

    clearBudgetData() {
        localStorage.removeItem(BudgetRepository.KEYS.SALARY);
        localStorage.removeItem(BudgetRepository.KEYS.CATEGORIES);
    }
}