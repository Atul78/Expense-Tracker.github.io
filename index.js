const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const local = JSON.parse(localStorage.getItem('transactions'));
let Transaction = localStorage.getItem('transactions') !== null ? upddateLocalStorage : [];


function addTransaction(e) {
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please Enter Text And Value");
    }
    else {
        const transaction = {
            id : generateId(),
            text :text.value,
            amount : +amount.value,
        };
        Transaction.push(transaction);
        AddTransactionDOM(transaction);
        updateValues();
        upddateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}
function generateId() {
    return Math.floor(Math.random()*1000000000);
}



function AddTransactionDOM(transaction) {
    const Sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `${transaction.text}<span>${Sign}${Math.abs(transaction.amount)}</span>
    <button class = 'delete-btn' onclick = "removeItem(${transaction.id})">X</button>`;
    list.appendChild(item);
}

function removeItem(id) {
    Transaction = Transaction.filter((Transaction) => {
       return Transaction.id !== id
    })
    upddateLocalStorage();
    Init();
}




// UpdateValues
function updateValues() {
    const amounts = Transaction.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0)*-1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//local storage
function upddateLocalStorage() {
    localStorage.setItem(
        "transactions", JSON.stringify(Transaction)
    );
}


// init
function Init() {
    list.innerHTML = "";
    Transaction.forEach(AddTransactionDOM);
    updateValues();
}
Init();

form.addEventListener('submit', addTransaction)