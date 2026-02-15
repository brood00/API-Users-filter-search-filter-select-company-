const searchInput = document.querySelector('.search__input')
const filterSelect = document.querySelector('.filter__select')
const btnReset = document.querySelector('.reset__filter')
const usersList = document.querySelector('.users__list')
const errorMessage = document.querySelector('.error__message')

let companies = new Set()
let allUsers = []

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
            throw new Error()
        }
        const result = await response.json()
        allUsers = result
        result.forEach((user) => {
            companies.add(user.company.name)
        })
        renderSelectCompany()
        renderUsers(allUsers)
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
}

fetchUsers()

async function renderUsers(users) {
    usersList.innerHTML = ''
    errorMessage.classList.remove('active')
    if(users.length === 0) {
        errorMessage.classList.add('active')
    } else {
        users.forEach(user => {
            const item = document.createElement('li')
            item.textContent = `Name: ${user.name}, - Email: ${user.email}`
            usersList.appendChild(item)
            errorMessage.classList.remove('active')
        });

    }

}

function renderSelectCompany() {
    filterSelect.innerHTML = `<option value="">Все компании</option>`
    companies.forEach((company) => {
        const option = document.createElement('option')
        option.value = company
        option.textContent = company
        filterSelect.appendChild(option)
    })
}

function searchFilter() {
    searchInput.addEventListener('input', () => {
        applyFilters()
    })
}
searchFilter()

function filterCompany() {
    filterSelect.addEventListener('change', () => {
        applyFilters()
    })
}
filterCompany()

function applyFilters() {
    const value = searchInput.value.toLowerCase()
    const selectValue = filterSelect.value
    let filtredUsers = []
    allUsers.forEach((user) => {
    const userName = user.name.toLowerCase()
    const userCompany = user.company.name
        if ((value === '' || userName.includes(value)) && (selectValue === '' || userCompany === selectValue)) {
            filtredUsers.push(user)
        }

    })
    renderUsers(filtredUsers)
}

function resetFilters() {
    btnReset.addEventListener('click', () => {
        searchInput.value = ''
        filterSelect.value = ''
        applyFilters()
    })
}

resetFilters()
