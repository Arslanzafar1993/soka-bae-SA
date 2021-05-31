import { Land } from './land.model';

export function reorderLaender(laender: Land[]): Land[] {
  const isDeutschland = (element: any) => element.code === 'DE';
  const isPolen = (element: any) => element.code === 'PL';
  const isRumänien = (element: any) => element.code === 'RO';
  const isTschechien = (element: any) => element.code === 'CZ';
  const isFrankreich = (element: any) => element.code === 'FR';
  const isKroatien = (element: any) => element.code === 'HR';

  laender = moveLand(isDeutschland, 0, laender);
  laender = moveLand(isPolen, 1, laender);
  laender = moveLand(isRumänien, 2, laender);
  laender = moveLand(isTschechien, 3, laender);
  laender = moveLand(isFrankreich, 4, laender);
  laender = moveLand(isKroatien, 5, laender);

  return laender;
}

function moveLand(f: any, position: number, laender: Land[]): Land[] {
  const index = laender.findIndex(f);

  if (index > 0) {
    laender = move(laender, index, position);
  }
  return laender;
}

function move(input: Land[], from: number, to: number): Land[] {
  let numberOfDeletedElm = 1;
  const elm = input.splice(from, numberOfDeletedElm)[0];
  numberOfDeletedElm = 0;
  input.splice(to, numberOfDeletedElm, elm);
  return input;
}
