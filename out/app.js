"use strict";
const submitBtn = document.querySelector('.submit-form-btn');
const tBody = document.querySelector('.table-body');
let theadSix = document.getElementById('thead-six');
theadSix.innerHTML = 'Show contacts &#x2BC6';
let unchecked = true;
let showContacts = false;
let id = 0;
const inputRefs = {
    fnameRef: '.firstname-input',
    lnameRef: '.lastname-input',
    phoneRef: '.phone-input',
    addressRef: '.address-input',
};
let contacts = [
    {
        firstname: 'Bob',
        lastname: 'Bobsson',
        phone: '12345',
        address: 'Campus',
        id: 1,
    },
    {
        firstname: 'Bosse',
        lastname: 'Hundsson',
        phone: '09876',
        address: 'Borås',
        id: 2,
    }
];
function extractValue(inputRef) {
    let input = document.querySelector(inputRef);
    return input.value;
}
function extractReferens() {
    id += 1;
    // Excracting string out of unkown object type
    let valueArr = Object.keys(inputRefs).map(key => {
        return extractValue(inputRefs[key]);
    });
    let contact = {
        firstname: valueArr[0],
        lastname: valueArr[1],
        phone: unchecked ? valueArr[2] : 'xxxx-xxx-xxx',
        address: valueArr[3],
        id: id,
    };
    contacts.push(contact);
}
function createAndAppend() {
    contacts.forEach(contact => {
        let tr = document.createElement('tr');
        let radioBtnLabel = document.createElement('label');
        let description = document.createTextNode('Hide number');
        let radioBtn = document.createElement('input');
        let deleteBtn = document.createElement('button');
        tr.className = 'table-row';
        radioBtnLabel.appendChild(description);
        radioBtnLabel.htmlFor = 'radio-btn';
        radioBtn.type = 'radio';
        radioBtn.id = 'radio-btn';
        radioBtn.className = 'radio-btn';
        deleteBtn.className = 'delete-btn';
        radioBtn.addEventListener('click', e => {
            let textContent = tr.children[2].textContent;
            let textContentKey = tr.children[4].textContent;
            if (unchecked === false && tr.children[2].textContent === 'xxxx-xxx-xxx') {
                radioBtn.checked = false;
                unchecked = true;
                tr.children[2].textContent = getLocalStorage(textContentKey);
            }
            if (radioBtn.checked) {
                unchecked = false;
                setLocalStorage(textContentKey, textContent);
                tr.children[2].textContent = 'xxxx-xxx-xxx';
            }
            else {
                unchecked = true;
            }
            console.log('RB', radioBtn.checked);
            console.log('unC', unchecked);
        });
        let values = Object.values(contact);
        values.forEach(value => {
            let td = document.createElement('td');
            td.className = 'table-data';
            td.innerHTML = value;
            deleteBtn.innerText = 'Delete contact';
            tr.append(td, radioBtnLabel, radioBtn, deleteBtn);
        });
        tBody.append(tr);
    });
}
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    tBody.innerHTML = '';
    if (showContacts === false) {
        theadSix.innerHTML = 'Hide contacts &#x2BC5';
        extractReferens();
        createAndAppend();
        showContacts = true;
    }
    else {
        extractReferens();
        createAndAppend();
    }
});
theadSix.addEventListener('click', e => {
    if (showContacts === false) {
        tBody.innerHTML = '';
        theadSix.innerHTML = 'Hide contacts &#x2BC5';
        createAndAppend();
        showContacts = true;
    }
    else {
        tBody.innerHTML = '';
        theadSix.innerHTML = 'Show contacts &#x2BC6';
        showContacts = false;
    }
});
function setLocalStorage(textContentKey, textContent) {
    localStorage.setItem(textContentKey, textContent);
}
function getLocalStorage(textContentKey) {
    let item = localStorage.getItem(textContentKey);
    return item;
}
