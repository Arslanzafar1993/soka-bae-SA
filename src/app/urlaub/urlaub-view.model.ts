export class UrlaubView {

  urlaubstageSumme: number;
  urlaubsgeldSumme: number;

  constructor(urlaubstageSumme: number, urlaubsgeldSumme: number) {
    this.urlaubsgeldSumme = urlaubsgeldSumme;
    this.urlaubstageSumme = urlaubstageSumme;
  }
}

export class UrlaubJahre {
  jahr: number;
  urlaubstage: number;
  urlaubsgeld: number;

  constructor(jahr: number, urlaubstage: number, urlaubsgeld: number) {
    this.jahr = jahr;
    this.urlaubstage = urlaubstage;
    this.urlaubsgeld = urlaubsgeld;
  }
}

