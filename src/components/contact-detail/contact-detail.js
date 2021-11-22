import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { WebAPI } from "../../web-api";
import { areEqual } from "../../utility";
import { ContactUpdated, ContactViewed } from "../../messages";

@inject(WebAPI, EventAggregator)
export class ContactDetail {
  constructor(api, eventAggregator) {
    this.api = api;
    this.eventAggregator = eventAggregator;
  }

  // another life-cycle hook for routed components
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then((contact) => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.eventAggregator.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return (
      this.contact.firstName && this.contact.lastName && !this.api.isRequesting
    );
  }

  save() {
    this.api.saveContact(this.contact).then((contact) => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      this.eventAggregator(new ContactUpdated(this.contact));
    });
  }

  // another life-cycle hook for routed components
  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm("You have unsaved changes. Are you sure you wish to leave?");

      if(!result) {
        this.eventAggregator.publish(new ContactViewed(this.contact));
      }

      return result;
    }
    return true;
  }
}
