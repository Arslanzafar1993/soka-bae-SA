import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@anosrv-core/modal.service';
import { IconService } from '@anosrv-core/icon.service';
import { DropdownService } from '@anosrv-core/dropdown.service';
import { AntragService } from '@anosrv-core/antrag.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'anosrv-antragsdaten',
  templateUrl: './antragsdaten.component.html',
  styleUrls: ['./antragsdaten.component.scss']
})
export class AntragsdatenComponent implements OnInit {
  public antragForm = null;
  public preloadForm = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public iconService: IconService,
    public modalService: ModalService,
    public formBuilder: FormBuilder,
    private antragsdatenService: AntragService,
    public dropdownService: DropdownService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { laender: any }) => {
      this.dropdownService.laender = data.laender.payload.landDTOList;
    });

    this.preloadForm = this.formBuilder.group({
      arbeitnehmerNummer: [''],
    });

    this.antragForm = this.formBuilder.group({
      vertragNummer: [''],
      arbeitnehmerNummer: [''],
      anrede: [''],
      vorname: [''],
      nachname: [''],
      strasseUndHausnummer: [''],
      postleitzahl: [''],
      ort: [''],
      land: [''],
      telefonNummer: [''],
      email: [''],
      kontoinhaber: [''],
      iban: [''],
      bic: [''],
      geldinstitut: [''],
      geburtsdatum: [''],
      steuerId: [''],
      krankenversicherungsart: [''],
      ikNummer: [''],
      nachweisKind: [false],
      rentenart: [''],
      versicherungNummer: [''],
      rentenBeginn: [''],
      versicherungsfall: [''],
      postabrechnungNummer: [''],
      einverstaendniserklaerungDatenschutz: [false],
      bevollmaechtigungDatenaustausch: [false],
      ausloeser: [''],
      eingangskanal: [''],
      eingangsdatum: [''],
    });
  }

  submit() {
    this.antragsdatenService.save(this.antragForm.value).subscribe((data) => {
      console.log(data);
    }, (errData: HttpErrorResponse) => {
      console.error(errData);
    });
  }

  preload() {
    this.antragsdatenService.load(this.preloadForm.value.arbeitnehmerNummer).subscribe((data) => {
      this.antragForm.setValue({
        vertragNummer: data.body.vertragNummer,
        arbeitnehmerNummer: data.body.arbeitnehmerNummer,
        anrede: data.body.anrede,
        vorname: data.body.vorname,
        nachname: data.body.nachname,
        strasseUndHausnummer: data.body.strasseUndHausnummer,
        postleitzahl: data.body.postleitzahl,
        ort: data.body.ort,
        land: data.body.land,
        telefonNummer: data.body.telefonNummer,
        email: data.body.email,
        kontoinhaber: data.body.kontoinhaber,
        iban: data.body.iban,
        bic: data.body.bic,
        geldinstitut: data.body.geldinstitut,
        geburtsdatum: this.convertDate(data.body.geburtsdatum),
        steuerId: data.body.steuerId,
        krankenversicherungsart: data.body.krankenversicherungsart,
        ikNummer: data.body.ikNummer,
        nachweisKind: data.body.nachweisKind,
        rentenart: data.body.rentenart,
        versicherungNummer: data.body.versicherungNummer,
        rentenBeginn: this.convertDate(data.body.rentenBeginn),
        versicherungsfall: this.convertDate(data.body.versicherungsfall),
        postabrechnungNummer: data.body.postabrechnungNummer,
        einverstaendniserklaerungDatenschutz: data.body.einverstaendniserklaerungDatenschutz,
        bevollmaechtigungDatenaustausch: data.body.bevollmaechtigungDatenaustausch,
        ausloeser: data.body.ausloeser,
        eingangskanal: data.body.eingangskanal,
        eingangsdatum: data.body.eingangsdatum,
      });
    }, (errData: HttpErrorResponse) => {
      console.error(errData);
    });
  }

  private convertDate(date: string): string {
    if (date !== null && date !== undefined) {
      const split = date.split('.');
      const newDate = new Date();
      newDate.setDate(Number(split[0]));
      newDate.setMonth(Number(split[1]) - 1);
      newDate.setFullYear(Number(split[2]));

      newDate.setUTCHours(0, 0, 0, 0);
      const s = newDate.toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit'
      }).split('/');
      return `${s[2]}-${s[0]}-${s[1]}`;
    }
    return '';
  }
}
