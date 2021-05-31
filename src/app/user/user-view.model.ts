import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { reorderLaender } from '@anosrv-core/util';
import { User } from './user.model';
import { DropdownService } from '@anosrv-core/dropdown.service';

export class UserView {
  containers: Array<UserContainer>;
  userForm: FormGroup;

  constructor(user: User, private dropdownService: DropdownService) {
    this.containers = [];

    this.userForm = new FormGroup({
      anrede: new FormControl(user.anrede),
      vorname: new FormControl(user.vorname, Validators.required),
      name: new FormControl(user.name, Validators.required),
      geburtsdatum: new FormControl(user.geburtsdatum),
      strasseUndHausnummer: new FormControl(user.strasseUndHausnummer, Validators.required),
      plz: new FormControl(user.plz, Validators.required),
      ort: new FormControl(user.ort, Validators.required),
      landId: new FormControl(user.landId),
      benutzername: new FormControl(user.benutzername),
      passwort: new FormControl('**********'),
      email: new FormControl(user.email),
      mobilnummer: new FormControl(user.mobilnummer),
      arbeitnehmernr: new FormControl(user.arbeitnehmerNr),
      steuerId: new FormControl(user.steuerId),
      konfessionSteuer: new FormControl(user.konfessionSteuer),
      iban: new FormControl(user.iban),
      geldinstitut: new FormControl(user.geldinstitut),
      bic: new FormControl(user.bic),
    });
  }

  fillForm(): void {
    this.containers = [];

    const nameContainer = new UserContainer(true, 'nameContainer', { isSemiEditable: true });
    const addressContainer = new UserContainer(true, 'address', { isSemiEditable: false });
    const userContainer = new UserContainer(true, 'user', { isSemiEditable: true });
    const emailContainer = new UserContainer(true, 'email', { isSemiEditable: true });
    const bankContainer = new UserContainer(true, 'bank', { isSemiEditable: false });
    const taxContainer = new UserContainer(true, 'tax', { isSemiEditable: true });
    const konfessionContainer = new UserContainer(true, 'konfession', { isSemiEditable: true });
    const mobileContainer = new UserContainer(true, 'mobile', { isSemiEditable: true });
    const arbeitnehmerContainer = new UserContainer(false, 'arbeitnehmer', { isSemiEditable: true });

    nameContainer.addItem(
      new UserData('Anrede', this.userForm.get('anrede'), 'anrede', { editable: true, selectData: this.dropdownService.ANREDEN })
    );
    nameContainer.addItem(new UserData('Vorname', this.userForm.get('vorname'), 'vorname', { editable: true }));
    nameContainer.addItem(new UserData('Nachname', this.userForm.get('name'), 'name', { editable: true }));
    nameContainer.addItem(new UserData('Geburtsdatum', this.userForm.get('geburtsdatum'), 'geburtsdatum', { editable: true }));

    addressContainer.addItem(new UserData('Straße / Hausnr.', this.userForm.get('strasseUndHausnummer'), 'strasseUndHausnummer',
      { editable: true, maxLength: 35 }));
    addressContainer.addItem(new UserData('Postleitzahl', this.userForm.get('plz'), 'plz', { editable: true, maxLength: 10 }));
    addressContainer.addItem(new UserData('Ort', this.userForm.get('ort'), 'ort', { editable: true, maxLength: 35 }));
    addressContainer.addItem(new UserData('Land', this.userForm.get('landId'), 'landId',
      { selectData: new SelectData(reorderLaender(this.dropdownService.laender)), editable: true }
    ));

    userContainer.addItem(new UserData('Benutzername', this.userForm.get('benutzername'), 'benutzername', { editable: false }));
    userContainer.addItem(new UserData('Passwort', this.userForm.get('passwort'), 'passwort', { editable: false }));

    emailContainer.addItem(new UserData('E-Mail', this.userForm.get('email'), 'email'));

    mobileContainer.addItem(new UserData('Mobilnummer', this.userForm.get('mobilnummer'), 'mobilnummer'));

    taxContainer.addItem(new UserData('Steuer-ID', this.userForm.get('steuerId'), 'steuerId',
      { maxLength: 11, modalId: 'steuerIdModal' })
    );

    arbeitnehmerContainer.addItem(
      new UserData('Arbeitnehmer-Nr.', this.userForm.get('arbeitnehmernr'), 'arbeitnehmernr', { modalId: 'annrModal'}
    ));

    konfessionContainer.addItem(
      new UserData('Steuerpflichtige Konfession', this.userForm.get('konfessionSteuer'), 'konfessionSteuer',
      { selectData: this.dropdownService.KONFESSIONEN }
    ));

    bankContainer.addItem(new UserData('Kontoinhaber', this.userForm.get('vorname'), 'vorname',
      { editable: false, maxLength: 32, combinedFields: [this.userForm.get('vorname'), this.userForm.get('name')] }));
    bankContainer.addItem(new UserData('IBAN', this.userForm.get('iban'), 'iban', { editable: true, maxLength: 32, modalId: 'ibanModal' }));
    bankContainer.addItem(new UserData('Geldinstitut', this.userForm.get('geldinstitut'), 'geldinstitut', { editable: true }));
    bankContainer.addItem(new UserData('BIC', this.userForm.get('bic'), 'bic', { editable: true, maxLength: 11, modalId: 'bicModal' }));

    this.containers.push(nameContainer);
    this.containers.push(addressContainer);
    this.containers.push(userContainer);
    this.containers.push(emailContainer);
    this.containers.push(mobileContainer);
    this.containers.push(bankContainer);
    this.containers.push(konfessionContainer);
    this.containers.push(taxContainer);
    this.containers.push(arbeitnehmerContainer);
  }

  getContainer(name: string): UserContainer {
    return this.containers.find(element => element.name === name);
  }
}

export class UserContainer {
  items: Array<UserData>;
  isEditable = true;
  isSemiEditable = false;
  name: string;

  constructor(isEditable: boolean = true, name: string, options?: { isSemiEditable: boolean }) {
    this.items = [];
    this.isEditable = isEditable;
    this.name = name;
    if (options) {
      this.isSemiEditable = options.isSemiEditable;
    }
  }

  addItem(data: UserData): void {
    this.items.push(data);
  }
}

export class SelectData {
  data: Array<any>;

  constructor(data: Array<any>) {
    this.data = data;
  }
}

export class UserData {
  label: string;
  data: AbstractControl;
  controlType = 'input';
  value: string;
  formControlName: string;
  editable = true;
  modalId: string;
  selectData: SelectData = undefined;
  combinedFields = [];
  maxLength: number;
  info: string;

  constructor(
    label: string,
    data: AbstractControl,
    formControlName: string,
    options?: {
      editable?: boolean,
      selectData?: SelectData,
      info?: string,
      maxLength?: number,
      modalId?: string,
      combinedFields?: AbstractControl[]
    }) {
      this.label = label;
      this.data = data;
      this.formControlName = formControlName;

      if (options) {
        this.editable = options.editable;
        this.selectData = options.selectData;
        this.info = options.info;
        this.modalId = options.modalId;
        this.maxLength = options.maxLength;
        this.combinedFields = options.combinedFields;
      }

      if (this.formControlName === 'landId') {
        this.controlType = 'searchSelect';
      }

      if (this.formControlName === 'konfessionSteuer') {
        this.controlType = 'radio';
      }

      this.value = data.value;
    }
}
