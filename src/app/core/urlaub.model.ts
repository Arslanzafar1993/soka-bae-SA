import { Hinweis } from '@anosrv-core/urlaub-antrag-payload';

export interface Urlaub {
  wert?:	number;
  netto?:	number;
  jahr?: number;
  tage?: number;
  abzuege?: number;
  tageGerundet?: number;
  entschaedigbar?: boolean;
  referenzDatum?: string;
}

interface UrlaubModelList {
  urlaubModelList: Urlaub[];
}

export interface UrlaubPayload {
  payload: UrlaubModelList;
  hinweise: Hinweis[];
}
