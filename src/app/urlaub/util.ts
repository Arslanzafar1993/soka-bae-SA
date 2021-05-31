import { Urlaub } from '@anosrv-core/urlaub.model';

export function urlaubsAnspruchHeader(urlaube: Urlaub[]): string {
  urlaube.sort((a: Urlaub, b: Urlaub) => a.jahr - b.jahr );
  const years: number[] = urlaube.map(urlaub => urlaub.jahr);
  return years.join(' & ');
}
