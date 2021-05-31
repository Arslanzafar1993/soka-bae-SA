import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { reorderLaender } from '@anosrv-core/util';
import { UserData, SelectData, UserContainer } from '../user/user-view.model';
import { User } from '../user/user.model';
import { DropdownService } from '@anosrv-core/dropdown.service';

export class AuszahlungView {
  containers: Array<UserContainer>;
  items: Array<UserData>;
  userForm: FormGroup;
  user: User;

  showAddressContainer = false;
  showTaxContainer = false;
  showBankContainer = false;
  showKonfessionContainer = false;

  constructor(user: User, private dropwdownService: DropdownService) {
    this.containers = [];
    this.user = user;
    this.userForm = new FormGroup({});
  }

  /* tslint:disable */ 
  fillForm(): void {
    const addressContainer = new UserContainer(true, 'address');
    const taxContainer = new UserContainer(true, 'tax');
    const bankContainer = new UserContainer(true, 'bank');
    const konfessionContainer = new UserContainer(true, 'konfession');

    this.userForm.addControl('vorname', new FormControl(this.user.vorname));
    this.userForm.addControl('name', new FormControl(this.user.name));
    addressContainer.addItem(
      new UserData('Vor- Nachname', this.userForm.get('vorname'), 'vorname',
      { editable: false, maxLength: 35, combinedFields: [this.userForm.get('vorname'), this.userForm.get('name')]}));

    if (this.user.strasseUndHausnummer === null || this.user.strasseUndHausnummer === '' || this.user.strasseUndHausnummer === undefined) {
      this.userForm.addControl('strasseUndHausnummer', new FormControl(this.user.strasseUndHausnummer));
      addressContainer.addItem(new UserData('Straße / Hausnr.', this.userForm.get('strasseUndHausnummer'), 'strasseUndHausnummer', 
        { editable: true, maxLength: 35 }));
      this.showAddressContainer = true;
    }

    if (this.user.plz === null || this.user.plz === '' || this.user.plz === undefined) {
      this.userForm.addControl('plz', new FormControl(this.user.plz));
      addressContainer.addItem(new UserData('Postleitzahl', this.userForm.get('plz'), 'plz', { editable: true, maxLength: 10 }));
      this.showAddressContainer = true;
    }

    if (this.user.ort === null || this.user.ort === '' || this.user.ort === undefined) {
      this.userForm.addControl('ort', new FormControl(this.user.ort));
      addressContainer.addItem(new UserData('Ort', this.userForm.get('ort'), 'ort', { editable: true, maxLength: 35 }));
      this.showAddressContainer = true;
    }

    if (this.user.landId === null || this.user.landId === undefined) {
      this.userForm.addControl('landId', new FormControl(this.user.landId));
      addressContainer.addItem(new UserData('Land', this.userForm.get('landId'), 'landId', 
        { editable: true, selectData: new SelectData(reorderLaender(this.dropwdownService.laender)) }
      ));
      this.showAddressContainer = true;
    }

    if (this.user.steuerId === null || this.user.steuerId === '' || this.user.steuerId === undefined) {
      this.userForm.addControl('steuerId', new FormControl(this.user.steuerId));
      taxContainer.addItem(new UserData('Steuer-ID', this.userForm.get('steuerId'), 'steuerId', 
      { editable: false, info: 'steuerIdModal', maxLength: 11 }));
      this.showTaxContainer = true;
    }

    if (this.user.konfessionSteuer === null || this.user.konfessionSteuer === '' || this.user.konfessionSteuer === undefined) {
      this.userForm.addControl('konfessionSteuer', new FormControl());
      konfessionContainer.addItem(
        new UserData('Steuerpflichtige Konfession', this.userForm.get('konfessionSteuer'), 'konfessionSteuer', { editable: true }));
      this.showKonfessionContainer = true;
    }

    if (this.user.iban === null || this.user.iban === '' || this.user.iban === undefined) {
      this.userForm.addControl('iban', new FormControl(this.user.iban));
      bankContainer.addItem(new UserData('IBAN', this.userForm.get('iban'), 'iban', { editable: true, maxLength: 32,  info: 'ibanModal' }));
      this.showBankContainer = true;
    }

    if (this.user.geldinstitut === null || this.user.geldinstitut === '' || this.user.geldinstitut === undefined) {
      this.userForm.addControl('geldinstitut', new FormControl(this.user.geldinstitut));
      bankContainer.addItem(new UserData('Geldinstitut', this.userForm.get('geldinstitut'), 'geldinstitut', { editable: true }));
      this.showBankContainer = true;
    }

    if (this.user.bic === null || this.user.bic === '' || this.user.bic === undefined) {
      this.userForm.addControl('bic', new FormControl(this.user.bic));
      bankContainer.addItem(new UserData('BIC', this.userForm.get('bic'), 'bic', { editable: false, info: 'bicModalShort', maxLength: 11 }));
      this.showBankContainer = true;
    }

    this.containers.push(taxContainer);
    this.containers.push(konfessionContainer);
    this.containers.push(addressContainer);
    this.containers.push(bankContainer);

  }
}
