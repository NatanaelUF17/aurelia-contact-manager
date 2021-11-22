import { WebAPI } from "../../web-api";
import { inject } from 'aurelia-framework';
import { EventAggregator } from "aurelia-event-aggregator"; 
import { ContactUpdated, ContactViewed } from "../../messages";

@inject(WebAPI, EventAggregator)
export class ContactList {
  constructor(api, eventAggregator) {
    this.api = api;
    this.contacts = [];

    eventAggregator.subscribe(ContactViewed, message => this.select(message.contact));
    eventAggregator.subscribe(ContactUpdated, message => {
        let id = message.contact.id;
        let found = this.contacts.find(contact => contact.id == id);
        Object.assign(found, message.contact);
    });
  }

  // this is a hook
  created() {
      this.api.getContactList()
        .then(contacts => this.contacts = contacts);
  }

  select(contact) {
      this.selectedId = contact.id;
      return true;
  }
}
