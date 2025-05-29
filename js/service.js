class BudgetService {
    constructor() {
        this.repository = new BudgetRepository();
    }

    initialize() {
        const salary = this.repository.getSalary();
        const categories = this.repository.getCategories();
        return { salary, categories };
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
        this.repository.saveCategories(categories);
    }

    recalculateCategories(newSalary, categories) {
        const updatedCategories = categories.map(category => {
            if (category.inputType === 'percentage') {
                const newValue = (category.originalValue / 100) * newSalary;
                return {
                    ...category,
                    value: newValue,
                    percentage: category.originalValue
                };
            }
            return {
                ...category,
                percentage: newSalary > 0 ? (category.value / newSalary) * 100 : 0
            };
        });

        this.repository.saveCategories(updatedCategories);
        return updatedCategories;
    }

    clearBudgetData() {
        this.repository.clearBudgetData();
    }
}