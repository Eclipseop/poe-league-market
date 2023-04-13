export interface Root {
  lines: Line[];
  language: Language;
}

export interface Line {
  id: number;
  name: string;
  icon: string;
  stackSize: number;
  itemClass: number;
  implicitModifiers: any[];
  flavourText: string;
  chaosValue: number;
  exaltedValue: number;
  divineValue: number;
  count: number;
  detailsId: string;
  listingCount: number;
  links?: number;
}

export interface Language {
  name: string;
  translations: Translations;
}

export interface Translations {}
