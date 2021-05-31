import { Urlaub } from '../core/urlaub.model';
import { Hinweis } from '@anosrv-core/urlaub-antrag-payload';

export class User {
  private urlaube: Urlaub[];

  anrede: string;
  vorname: string;
  name: string;
  email: string;
  mobilnummer: string;
  geburtsdatum: Date;
  bic: string;
  geldinstitut: string;
  iban: string;
  landId: number;
  ort: string;
  plz: string;
  strasseUndHausnummer: string;
  steuerId: string;
  konfessionSteuer: string;
  benutzername: string;
  arbeitnehmernr: string;
  urlaubeSorted: Array<Urlaub> = [];
  urlaubTage: number;
  urlaubTageGerundet: number;
  guthaben: number;
  guthabenJahr: number;
  urlaubsGuthabenGesamt: number;
  referenzDatum: Date;
  verfallDatum: Date;
  abzuege: number;
  entschaedigbar: boolean;
  netto: number;
  wert: number;

  guthabenNetto: number;

  arbeitnehmerNr: string;

  set urlaub(urlaube: Urlaub[]) {
    this.urlaube = urlaube;
    this.processUrlaube();
  }

  get urlaubJahre(): number[] {
    return this.urlaubeSorted.map(v => v.jahr);
  }

  get fullname(): string {
    return this.vorname + ' ' + this.name;
  }

  get verfallTage(): number {
    if (!this.verfallDatum) {
      return 0;
    }
    const currentDate = new Date();
    return Math.floor((this.verfallDatum.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);
  }

  private processUrlaube(): void {
    this.urlaube.forEach((urlaub => {
      this.setReferenzDatum(urlaub);
      this.addUrlaubJahr(urlaub);
      this.hasGuthaben(urlaub);
      this.setGesamtWerte(urlaub);
    }));
  }

  private hasGuthaben(urlaub: Urlaub) {
    if (urlaub.hasOwnProperty('entschaedigbar')) {
      const currentDate = new Date();
      this.guthaben = urlaub.netto;
      this.guthabenJahr = currentDate.getFullYear() - 2;
      this.verfallDatum = new Date(currentDate.getFullYear(), 12, 0);
    }
  }

  private setReferenzDatum(urlaub: Urlaub) {
    if (urlaub.hasOwnProperty('referenzDatum')) {
      this.referenzDatum = new Date(urlaub.referenzDatum);
    }
  }

  private addUrlaubJahr(urlaub: Urlaub) {
    if (urlaub.hasOwnProperty('jahr') && !urlaub.hasOwnProperty('entschaedigbar')) {
      this.urlaubeSorted.push(urlaub);
      this.urlaubeSorted.sort((a: Urlaub, b: Urlaub) => {
        return a.jahr > b.jahr ? -1 : 1;
      });
    }
  }

  private setGesamtWerte(urlaub: Urlaub) {
    if (!urlaub.hasOwnProperty('jahr') && !urlaub.hasOwnProperty('entschaedigbar')) {
      this.urlaubTage = urlaub.tage;
      this.urlaubTageGerundet = urlaub.tageGerundet;
      this.urlaubsGuthabenGesamt = urlaub.wert;
    }
  }
}


export interface UserPayload {
  payload: User;
  hinweise: Hinweis[];
}
