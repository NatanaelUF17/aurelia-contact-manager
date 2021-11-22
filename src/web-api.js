let latency = 200;

let id = 0;

let contacts = [
  {
    id: getId(),
    firstName: "John",
    lastName: "Tolkien",
    email: "tolkien@inklings.com",
    phoneNumber: "867-5309",
  },
  {
    id: getId(),
    firstName: "Clive",
    lastName: "Lewis",
    email: "lewis@inklings.com",
    phoneNumber: "867-5309",
  },
  {
    id: getId(),
    firstName: "Owen",
    lastName: "Barfield",
    email: "barfield@inklings.com",
    phoneNumber: "867-5309",
  },
  {
    id: getId(),
    firstName: "Charles",
    lastName: "Williams",
    email: "williams@inklings.com",
    phoneNumber: "867-5309",
  },
  {
    id: getId(),
    firstName: "Roger",
    lastName: "Green",
    email: "green@inklings.com",
    phoneNumber: "867-5309",
  },
];

function getId() {
  return ++id;
}

export class WebAPI {
  isRequesting = false;

  getContactList() {
    this.isRequesting = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        let results = contacts.map((x) => {
          return {
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email,
          };
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id) {
    this.isRequesting = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        let contact = contacts.filter((x) => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(contact)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveContact(contact) {
    this.isRequesting = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        let newContact = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter((x) => x.id == contact.id)[0];

        if (found) {
          let index = contacts.indexOf(found);
          contacts[index] = newContact;
        } else {
          instance.id = getId();
          contacts.push(newContact);
        }

        this.isRequesting = false;
        resolve(newContact);
      }, latency);
    });
  }
}
