import { Injectable } from '@angular/core';
import { SelectData, UserData } from '../user/user-view.model';
import { Land } from './land.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  laender: Land[];

  constructor() {}

  readonly KONFESSIONEN = new SelectData([
    { label: 'evangelisch', value: 'EVANGELISCH' },
    { label: 'römisch-katholisch', value: 'KATHOLISCH' },
    { label: 'nicht kirchensteuerpflichtig', value: 'KEINE' }
  ]);

  readonly ANREDEN = new SelectData([
    { label: '', value: '' },
    { label: 'Herr', value: 'HERR' },
    { label: 'Frau', value: 'FRAU' }
  ]);

  readonly KRANKENVERSICHERUNGSART = new SelectData([
    { label: '', value: '' },
    { label: 'Gesetzlich', value: 'GESETZLICH' },
    { label: 'Privat', value: 'PRIVAT' },
    { label: 'Ausland', value: 'AUSLAND' }
  ]);

  readonly RENTENART = new SelectData([
    { label: '', value: '' },
    { label: 'Regel', value: 'REGEL' },
    { label: 'langjaehrig', value: 'LANGJAEHRIG' },
    { label: 'Besonders langjaehrig', value: 'BESONDERS_LANGJAEHRIG' },
    { label: 'Schwerbehindert', value: 'SCHWERBEHINDERT' },
    { label: 'Bergleute', value: 'BERGLEUTE' },
    { label: 'Sonstige', value: 'SONSTIGE' }
  ]);

  readonly AUSLOESER = new SelectData([
    { label: '', value: '' },
    { label: 'Kunde', value: 'KUNDE' },
    { label: 'Sachbearbeiter', value: 'SACHBEARBEITER' },
    { label: 'Dprs Rav', value: 'DPRS_RAV' },
    { label: 'ITSG Beitragssatzdatei', value: 'ITSG_BEITRAGSSATZDATEI' },
    { label: 'Bav Leistung', value: 'BAV_LEISTUNG' },
    { label: 'DPRS Zahlauftrag', value: 'DPRS_ZAHLAUFTRAG' }
  ]);

  readonly EINGANGSKANAL = new SelectData([
    { label: '', value: '' },
    { label: 'Portal', value: 'PORTAL' },
    { label: 'Email', value: 'SCHIRIFTLICH_EMAIL' },
    { label: 'Post', value: 'SCHRIFTLICH_POST' },
    { label: 'Technische Schnittstelle Beitragssatzdatei', value: 'TECHNISCHE_SCHNITTSTELLE' }
  ]);

  displayValue(item: UserData): string {
    if (item.formControlName !== 'landId') {
      if (item.selectData) {
        const e = item.selectData.data.find(element => element.value === item.data.value);
        if (e) {
          return e.label;
        }
      } else {
        if (item.formControlName === 'geburtsdatum') {
          const value = item.data.value;
          return value === null ? '' : formatDate(item.data.value, 'dd.MM.yyyy', 'de');
        } else {
          if (item.combinedFields && item.combinedFields.length === 2) {
            if (item.combinedFields[0].value !== null && item.combinedFields[0].value !== null) {
              return `${item.combinedFields[0].value} ${item.combinedFields[1].value}`;
            } else {
              return '';
            }
          } else { return item.data.value; }
        }
      }
    } else {
      const land = this.laender.find(element => element.portalId === item.data.value);
      if (land !== null && land !== undefined) {
        return land.name;
      }
    }
  }

  displayValueString(item: string, selectData: SelectData): string {
    const e = selectData.data.find(element => element.value === item);
    if (e) {
      return e.label;
    }
    return '';
  }
}
