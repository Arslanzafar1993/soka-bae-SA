import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import '@angular/common/locales/global/de';

export const GERMAN = 'de-DE';

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/general/', suffix: '.json' },
    { prefix: './assets/i18n/hilfe/', suffix: '.json' },
    { prefix: './assets/i18n/login/', suffix: '.json' },
    { prefix: './assets/i18n/start/', suffix: '.json' },
    { prefix: './assets/i18n/urlaub/', suffix: '.json' },
    { prefix: './assets/i18n/kontakt/', suffix: '.json' }
  ]);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: GERMAN }],
  exports: [TranslatePipe],
})
export class LokalisationModule {}
