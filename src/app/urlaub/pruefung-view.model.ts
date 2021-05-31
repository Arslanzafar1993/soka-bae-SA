import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Land } from '@anosrv-core/land.model';
import { reorderLaender } from '@anosrv-core/util';
import { UserData, SelectData, UserContainer } from '../user/user-view.model';
import { User } from '../user/user.model';
import { DropdownService } from '@anosrv-core/dropdown.service';

export class PruefungView {
  containers: Array<UserContainer>;
  items: Array<UserData>;
  userForm: FormGroup;
  laender: Land[];
  user: User;

  constructor(user: User, private dropdownService: DropdownService) {
    this.containers = [];
    this.user = user;

    this.userForm = new FormGroup({});

    this.userForm.addControl('strasseUndHausnummer', new FormControl(user.strasseUndHausnummer));
    this.userForm.addControl('plz', new FormControl(user.plz));
    this.userForm.addControl('ort', new FormControl(user.ort));
    this.userForm.addControl('landId', new FormControl(user.landId));
    this.userForm.addControl('steuerId', new FormControl(user.steuerId));
    this.userForm.addControl('konfessionSteuer', new FormControl(user.konfessionSteuer));
    this.userForm.addControl('iban', new FormControl(user.iban));
    this.userForm.addControl('geldinstitut', new FormControl(user.geldinstitut));
    this.userForm.addControl('bic', new FormControl(user.bic));
    this.userForm.addControl('email', new FormControl(user.email));
    this.userForm.addControl('anrede', new FormControl(user.anrede));
    this.userForm.addControl('vorname', new FormControl(user.vorname));
    this.userForm.addControl('name', new FormControl(user.name));
    this.userForm.addControl('geburtsdatum', new FormControl(user.geburtsdatum));
  }

  fillForm(): void {
    this.containers = [];
    const nameAddressContainer = new UserContainer(true, 'ADRESSE', { isSemiEditable: false });
    const emailContainer = new UserContainer(true, 'email', { isSemiEditable: true });
    const bankContainer = new UserContainer(true, 'BANK', { isSemiEditable: false });
    const taxContainer = new UserContainer(true, 'STEUERID', { isSemiEditable: false });
    const konfessionContainer = new UserContainer(true, 'STEUERPFLT_KONFESSION', { isSemiEditable: false });

    nameAddressContainer.addItem(
      new UserData('Vor- Nachname', this.userForm.get('vorname'), 'vorname',
      { editable: false, maxLength: 35, combinedFields: [this.userForm.get('vorname'), this.userForm.get('name')]}));
    nameAddressContainer.addItem(new UserData('Straße / Hausnr.', this.userForm.get('strasseUndHausnummer'),
      'strasseUndHausnummer', { maxLength: 35, editable: true }));
    nameAddressContainer.addItem(new UserData('Postleitzahl', this.userForm.get('plz'), 'plz', { maxLength: 10, editable: true }));
    nameAddressContainer.addItem(new UserData('Ort', this.userForm.get('ort'), 'ort', { maxLength: 35, editable: true }));
    nameAddressContainer.addItem(new UserData('Land', this.userForm.get('landId'), 'landId',
      { selectData: new SelectData(reorderLaender(this.dropdownService.laender)), editable: true }));

    emailContainer.addItem(new UserData('E-Mail', this.userForm.get('email'), '',
      { editable: false, info: 'steuerId', maxLength: 11 }));

    taxContainer.addItem(new UserData('Steuer-ID', this.userForm.get('steuerId'), 'steuerId',
      { editable: true, info: 'steuerId', maxLength: 11, modalId: 'steuerModalLong' }));

    bankContainer.addItem(new UserData('Kontoinhaber', this.userForm.get('vorname'), 'vorname',
      { editable: false, maxLength: 32, combinedFields: [this.userForm.get('vorname'), this.userForm.get('name')] }));
    bankContainer.addItem(new UserData('IBAN', this.userForm.get('iban'), 'iban',
      { maxLength: 32, modalId: 'ibanModal', editable: true }));
    bankContainer.addItem(new UserData('Geldinstitut', this.userForm.get('geldinstitut'), 'geldinstitut', { editable: true }));
    bankContainer.addItem(new UserData('BIC', this.userForm.get('bic'), 'bic', { editable: true, modalId: 'bicModalShort' }));

    konfessionContainer.addItem(
      new UserData('Steuerpflichtige Konfession', this.userForm.get('konfessionSteuer'), 'konfessionSteuer',
      { selectData: this.dropdownService.KONFESSIONEN, modalId: 'konfessionModal', editable: true }
    ));

    this.containers.push(nameAddressContainer);
    this.containers.push(emailContainer);
    this.containers.push(bankContainer);
    this.containers.push(taxContainer);
    this.containers.push(konfessionContainer);
  }

  resetEditable() {
    this.containers.forEach((container: UserContainer) => {
      switch (container.name) {
        case 'BANK':
          container.isSemiEditable = false;
          break;
        case 'ADRESSE':
          container.isSemiEditable = false;
          break;
        case 'STEUERPFLT_KONFESSION':
          container.isSemiEditable = true;
          break;
        case 'STEUERID':
          container.isSemiEditable = true;
          break;
        default:
      }
    });
  }

  getContainer(name: string): UserContainer {
    return this.containers.find(element => element.name === name);
  }
}
