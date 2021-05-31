/* tslint:disable */
import { Server, Response } from 'miragejs';

const user = [
  {
     "wert":26742.08,
     "tage":69.03,
     "tageGerundet":69,
     "referenzDatum":"2020-09-30"
  },
  {
     "jahr":2021,
     "wert":7277.54,
     "tage":17.50,
     "tageGerundet":17,
     "referenzDatum":"2020-09-30"
  },
  {
     "jahr":2020,
     "wert":12512.59,
     "tage":30.00,
     "tageGerundet":30,
     "referenzDatum":"2020-09-30"
  },
  {
     "jahr":2019,
     "wert":6951.95,
     "tage":21.53,
     "tageGerundet":22,
     "referenzDatum":"2020-09-30"
  },
  {
     "jahr":2019,
     "wert":1222.27,
     "entschaedigbar":true
  }
];

const laender = [{
    name: 'Afghanistan',
    portalId: 111,
    code: 'AF'
  },
  {
    name: 'Ägypten',
    portalId: 138,
    code: 'EG'
  },
  {
    name: 'Albanien',
    portalId: 112,
    code: 'AL'
  },
  {
    name: 'Algerien',
    portalId: 135,
    code: 'DZ'
  },
  {
    name: 'Andorra',
    portalId: 113,
    code: 'AD'
  },
  {
    name: 'Arabische Emirate',
    portalId: 209,
    code: 'AE'
  },
  {
    name: 'Argentinien',
    portalId: 181,
    code: 'AR'
  }, {
    name: 'Armenien',
    portalId: 114,
    code: 'AM'
  }, {
    name: 'Aserbaidschan',
    portalId: 115,
    code: 'AZ'
  }, {
    name: 'Australien',
    portalId: 116,
    code: 'AU'
  }, {
    name: 'Barbados',
    portalId: 118,
    code: 'BB'
  }, {
    name: 'Belgien',
    portalId: 117,
    code: 'BE'
  }, {
    name: 'Bosnien-Herzegowina',
    portalId: 120,
    code: 'BA'
  }, {
    name: 'Brasilien',
    portalId: 122,
    code: 'BR'
  }, {
    name: 'Bulgarien',
    portalId: 119,
    code: 'BG'
  }, {
    name: 'Chile',
    portalId: 182,
    code: 'CL'
  }, {
    name: 'China einschl. Tibet',
    portalId: 203,
    code: 'CN'
  }, {
    name: 'Dänemark',
    portalId: 134,
    code: 'DK'
  }, {
    name: 'Deutschland',
    portalId: 133,
    code: 'DE'
  }, {
    name: 'Estland',
    portalId: 137,
    code: 'EE'
  }, {
    name: 'Färöer',
    portalId: 142,
    code: 'FO'
  }, {
    name: 'Finnland',
    portalId: 140,
    code: 'FI'
  }, {
    name: 'Frankreich',
    portalId: 139,
    code: 'FR'
  }, {
    name: 'Gambia',
    portalId: 213,
    code: 'GM'
  }, {
    name: 'Georgien',
    portalId: 144,
    code: 'GE'
  }, {
    name: 'Ghana',
    portalId: 145,
    code: 'GH'
  }, {
    name: 'Gibraltar',
    portalId: 146,
    code: 'GI'
  }, {
    name: 'Griechenland',
    portalId: 147,
    code: 'GR'
  }, {
    name: 'Großbritannien',
    portalId: 143,
    code: 'GB'
  }, {
    name: 'Insel Man',
    portalId: 167,
    code: 'GB'
  }, {
    name: 'Irak',
    portalId: 154,
    code: 'IQ'
  }, {
    name: 'Iran',
    portalId: 152,
    code: 'IR'
  }, {
    name: 'Irland',
    portalId: 153,
    code: 'IE'
  }, {
    name: 'Island',
    portalId: 155,
    code: 'IS'
  }, {
    name: 'Israel',
    portalId: 151,
    code: 'IL'
  }, {
    name: 'Italien',
    portalId: 150,
    code: 'IT'
  }, {
    name: 'Japan',
    portalId: 156,
    code: 'JP'
  }, {
    name: 'Jemen',
    portalId: 215,
    code: 'YE'
  }, {
    name: 'Jordanien',
    portalId: 157,
    code: 'JO'
  }, {
    name: 'Kamerun',
    portalId: 124,
    code: 'CM'
  }, {
    name: 'Kanada',
    portalId: 125,
    code: 'CA'
  }, {
    name: 'Kanalinseln',
    portalId: 158,
    code: 'GB'
  }, {
    name: 'Kapverden',
    portalId: 130,
    code: 'CV'
  }, {
    name: 'Kasachstan',
    portalId: 159,
    code: 'KZ'
  }, {
    name: 'Katar',
    portalId: 180,
    code: 'QA'
  }, {
    name: 'Kosovo',
    portalId: 214,
    code: 'XK'
  }, {
    name: 'Kroatien',
    portalId: 149,
    code: 'HR'
  }, {
    name: 'Kuwait',
    portalId: 160,
    code: 'KW'
  }, {
    name: 'Lettland',
    portalId: 164,
    code: 'LV'
  }, {
    name: 'Libanon',
    portalId: 184,
    code: 'LB'
  }, {
    name: 'Libyen',
    portalId: 162,
    code: 'LY'
  }, {
    name: 'Liechtenstein',
    portalId: 141,
    code: 'LI'
  }, {
    name: 'Litauen',
    portalId: 163,
    code: 'LT'
  }, {
    name: 'Luxemburg',
    portalId: 161,
    code: 'LU'
  }, {
    name: 'Malediven',
    portalId: 121,
    code: 'MV'
  }, {
    name: 'Mali',
    portalId: 185,
    code: 'ML'
  }, {
    name: 'Malta',
    portalId: 165,
    code: 'MT'
  }, {
    name: 'Marokko',
    portalId: 166,
    code: 'MA'
  }, {
    name: 'Mauretanien',
    portalId: 183,
    code: 'MR'
  }, {
    name: 'Mazedonien',
    portalId: 173,
    code: 'MK'
  }, {
    name: 'Mexiko',
    portalId: 172,
    code: 'MX'
  }, {
    name: 'Moldau',
    portalId: 170,
    code: 'MD'
  }, {
    name: 'Monaco',
    portalId: 169,
    code: 'MC'
  }, {
    name: 'Montenegro',
    portalId: 171,
    code: 'ME'
  }, {
    name: 'Neuseeland',
    portalId: 176,
    code: 'NZ'
  }, {
    name: 'Niederlande',
    portalId: 175,
    code: 'NL'
  }, {
    name: 'Niger',
    portalId: 186,
    code: 'NE'
  }, {
    name: 'Norwegen',
    portalId: 174,
    code: 'NO'
  }, {
    name: 'Oman',
    portalId: 168,
    code: 'OM'
  }, {
    name: 'Österreich',
    portalId: 110,
    code: 'AT'
  }, {
    name: 'Pakistan',
    portalId: 178,
    code: 'PK'
  }, {
    name: 'Polen',
    portalId: 179,
    code: 'PL'
  }, {
    name: 'Portugal',
    portalId: 177,
    code: 'PT'
  }, {
    name: 'Rumänien',
    portalId: 187,
    code: 'RO'
  }, {
    name: 'Russland',
    portalId: 191,
    code: 'RU'
  }, {
    name: 'Sambia',
    portalId: 218,
    code: 'ZM'
  }, {
    name: 'San Marino',
    portalId: 190,
    code: 'SM'
  }, {
    name: 'Saudi-Arabien',
    portalId: 193,
    code: 'SA'
  }, {
    name: 'Schweden',
    portalId: 192,
    code: 'SE'
  }, {
    name: 'Schweiz',
    portalId: 126,
    code: 'CH'
  }, {
    name: 'Senegal',
    portalId: 197,
    code: 'SN'
  }, {
    name: 'Serbien',
    portalId: 189,
    code: 'RS'
  }, {
    name: 'Serbien-Montenegro',
    portalId: 129,
    code: 'CS'
  }, {
    name: 'Singapur',
    portalId: 194,
    code: 'SG'
  }, {
    name: 'Slowakei',
    portalId: 195,
    code: 'SK'
  }, {
    name: 'Slowenien',
    portalId: 196,
    code: 'SI'
  }, {
    name: 'Spanien',
    portalId: 136,
    code: 'ES'
  }, {
    name: 'Sri Lanka',
    portalId: 128,
    code: 'LK'
  }, {
    name: 'Südafrika',
    portalId: 217,
    code: 'ZA'
  }, {
    name: 'Sudan',
    portalId: 198,
    code: 'SD'
  }, {
    name: 'Syrien',
    portalId: 199,
    code: 'SY'
  }, {
    name: 'Tadschikistan',
    portalId: 201,
    code: 'TJ'
  }, {
    name: 'Tansania',
    portalId: 207,
    code: 'TZ'
  }, {
    name: 'Thailand',
    portalId: 200,
    code: 'TH'
  }, {
    name: 'Togo',
    portalId: 202,
    code: 'TG'
  }, {
    name: 'Tschad',
    portalId: 127,
    code: 'TD'
  }, {
    name: 'Tschechien',
    portalId: 132,
    code: 'CZ'
  }, {
    name: 'Tunesien',
    portalId: 205,
    code: 'TN'
  }, {
    name: 'Türkei',
    portalId: 204,
    code: 'TR'
  }, {
    name: 'Turkmenistan',
    portalId: 206,
    code: 'TM'
  }, {
    name: 'Ukraine',
    portalId: 208,
    code: 'UA'
  }, {
    name: 'Ungarn',
    portalId: 148,
    code: 'HU'
  }, {
    name: 'Uruguay',
    portalId: 188,
    code: 'UY'
  }, {
    name: 'Usbekistan',
    portalId: 211,
    code: 'UZ'
  }, {
    name: 'Vatikanstadt',
    portalId: 212,
    code: 'VA'
  }, {
    name: 'Venezuela',
    portalId: 216,
    code: 'VE'
  }, {
    name: 'Vereinigte Staaten',
    portalId: 210,
    code: 'US'
  }, {
    name: 'Weißrussland',
    portalId: 123,
    code: 'BY'
  }, {
    name: 'Zypern',
    portalId: 131,
    code: 'CY'
  }
];

const entschaedigung = {
  instanceId: '41734b10-2f61-11eb-b9c8-005056a0f4f8',
  businessKey: '7605131240100',
  taskModel: {
    id: '41815500-2f61-11eb-b9c8-005056a0f4f8',
    formKey: 'app:zusammenfassungBestaetigen',
    payload: {
      uiSections: []
     }
  },
  payload: {
    anrede: 'HERR',
    vorname: 'Philip',
    name: 'Schlecht',
    email: 'segal@freenet.de',
    mobilnummer: '1751770901',
    geburtsdatum: '1976-05-13',
    bic: 'NOLADE21BOR',
    geldinstitut: 'Bordesholmer Sparkasse',
    iban: 'DE29210512750100030772',
    landId: 133,
    ort: 'Egal',
    plz: '24802',
    strasseUndHausnummer: 'an der Au 22',
    steuerId: '67425393087',
    konfessionSteuer: 'KATHOLISCH',
    hinweise: []
  }
};

export default () => {
  new Server({
    seeds(server) {},
    routes() {
      this.passthrough();

      this.get('/api/v1/grunddaten/laender/de', () => {
        return {
          laender
        }
      })

      this.get('/api/v1/urlaub/7605131240100', () => {
        return {
          user
        }
      })

      this.post('/api/v1/process/entschaedigung', (schema) => {
        return new Response(
          201,
          { Location: 'http://localhost:4200/api/v1/process/entschaedigung/41734b10-2f61-11eb-b9c8-005056a0f4f8' }
        )
      })
      
      this.get('/api/v1/process/entschaedigung/41734b10-2f61-11eb-b9c8-005056a0f4f8', () => {
        return entschaedigung;
      })


      this.put("/api/v1/process/entschaedigung/41734b10-2f61-11eb-b9c8-005056a0f4f8", function (schema, request) {      
        return entschaedigung;
      })
    }
  });
};
