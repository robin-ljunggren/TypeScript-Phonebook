const submitBtn = document.querySelector('.submit-form-btn') as HTMLButtonElement;
const tBody = document.querySelector('.table-body') as HTMLTableSectionElement;

let id: number = 2;
let unchecked: boolean = true;


interface Contact {
  firstname: string,
  lastname: string,
  phone: string,
  address: string,
  id: number,
}

const inputRefs = {
  fnameRef: '.firstname-input',
  lnameRef: '.lastname-input',
  phoneRef: '.phone-input',
  addressRef: '.address-input',
}

let contacts: Contact[] = [
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
]

createAndAppend();

function extractValue(inputRef: string): string | number {
  let input = document.querySelector(inputRef) as HTMLInputElement;
  return input.value;
}

function extractReferens() {

  // Excracting string out of unkown object type
  let valueArr = Object.keys(inputRefs).map(key => {
    return extractValue(inputRefs[key as keyof typeof inputRefs]);
  });

  if(unchecked === true) {
    let contact: Contact = {
      firstname: valueArr[0] as string,
      lastname: valueArr[1] as string,
      phone: valueArr[2] as string,
      address: valueArr[3] as string,
      id: id,
    }
    contacts.push(contact);
  }else if(unchecked === false) {
    let contact: Contact = {
      firstname: valueArr[0] as string,
      lastname: valueArr[1] as string,
      phone: 'xxxx-xxx-xxx',
      address: valueArr[3] as string,
      id: id,
    }
      contacts.push(contact);
  }
  createAndAppend();
}

function createAndAppend() {
  id += 1

  contacts.forEach(contact => {
    let tr = document.createElement('tr') as HTMLTableRowElement;
    let radioBtnLabel = document.createElement('label') as HTMLLabelElement;
    let description = document.createTextNode('Hide number');
    let radioBtn = document.createElement('input') as HTMLInputElement;
    let deleteBtn = document.createElement('button') as HTMLButtonElement;

    tr.className = 'table-row';
    radioBtnLabel.appendChild(description);
    radioBtnLabel.htmlFor = 'radio-btn';
    radioBtn.type = 'radio';
    radioBtn.id = 'radio-btn';
    radioBtn.className = 'radio-btn';
    deleteBtn.className = 'delete-btn';
    
    radioBtn.addEventListener('click', e => {
    
      if(unchecked === true) {
        radioBtn.checked = false;
      }else {
        radioBtn.checked = true;
      }
    
      if(!radioBtn.checked) {
        unchecked = false;
      }else {
        unchecked = true;
      }
    })

    let values = Object.values(contact);

    values.forEach(value => {
      let td = document.createElement('td') as HTMLTableCellElement;
      td.className = 'table-data';
      td.innerHTML = value;
      deleteBtn.innerText = 'Delete contact';
      tr.append(td, radioBtnLabel, radioBtn, deleteBtn);
    })
    tBody.append(tr);
  })
}

submitBtn.addEventListener('click', e => {
  contacts = [];
  e.preventDefault();
  extractReferens();
});