import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки данными
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            )
        })

    return (data, state, action) => {
        // @todo: #4.2 — добавить очистку полей фильтров
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const input = action.parentElement.querySelector('input, select');
            if (input) {
                input.value = '';
                state[fieldName] = '';
            }
        }

        // @todo: #4.3 — настроить функцию сравнения
        const compare = createComparison(defaultRules);

        // @todo: #4.5 — применить фильтрацию к данным
        return data.filter(row => compare(row, state));
    }
}