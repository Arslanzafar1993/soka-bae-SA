export interface UrlaubAntragResponse {
  hinweise: Hinweis[];
  payload: UrlaubAntragPayloadResponse;
}

export class UrlaubAntragRequest {
  businessKey: string;
  instanceId: string;
  payload: UserPayload[];
  taskModel: TaskModel;
}

export interface UrlaubAntragPayloadResponse {
  businessKey: string;
  instanceId: string;
  payload: UserPayload[];
  taskModel: TaskModel;
}

export interface Hinweis {
  source: string;
  message: string;
  code: string;
}

export class UserPayload {
  anrede: string;
  bic: string;
  email: string;
  geburtsdatum: string;
  geldinstitut: string;
  iban: string;
  konfessionSteuer: string;
  landId: number;
  name: string;
  ort: string;
  plz: string;
  steuerId: string;
  strasseUndHausnummer: string;
  vorname: string;
  hinweise: Array<Hinweis>;
}

interface TaskModel {
  formKey: string;
  id: string;
  payload: TaskModelPayload;
}

interface TaskModelPayload {
  action: string;
  uiSections: Array<string>;
}
