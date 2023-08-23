"use strict";
const submitBtn = document.querySelector('.submit-form-btn');
const tBody = document.querySelector('.table-body');
let id = 2;
let unchecked = true;
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
createAndAppend();
function extractValue(inputRef) {
    let input = document.querySelector(inputRef);
    return input.value;
}
function extractReferens() {
    // Excracting string out of unkown object type
    let valueArr = Object.keys(inputRefs).map(key => {
        return extractValue(inputRefs[key]);
    });
    if (unchecked === true) {
        let contact = {
            firstname: valueArr[0],
            lastname: valueArr[1],
            phone: valueArr[2],
            address: valueArr[3],
            id: id,
        };
        contacts.push(contact);
    }
    else if (unchecked === false) {
        let contact = {
            firstname: valueArr[0],
            lastname: valueArr[1],
            phone: 'xxxx-xxx-xxx',
            address: valueArr[3],
            id: id,
        };
        contacts.push(contact);
    }
    createAndAppend();
}
function createAndAppend() {
    id += 1;
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
            if (unchecked === true) {
                radioBtn.checked = false;
            }
            else {
                radioBtn.checked = true;
            }
            if (!radioBtn.checked) {
                unchecked = false;
            }
            else {
                unchecked = true;
            }
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
    contacts = [];
    e.preventDefault();
    extractReferens();
});
