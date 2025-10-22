import type {BadgeProps} from "../components/Badge.tsx";

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const DICTIONARY_STATUSES =  {
  Approved: 'Approved',
  PendingReview: 'Pending review',
  DoNotTranslate: 'Do not translate',
  NeedsTranslation: 'Needs translation',
  Obsolete: 'Obsolete',
}

const DICTIONARY_STATUS_TRANSLATIONS = {
  [DICTIONARY_STATUSES.Approved]: 'Tasdiqlangan',
  [DICTIONARY_STATUSES.PendingReview]: 'Ko‘rib chiqilmoqda',
  [DICTIONARY_STATUSES.DoNotTranslate]: 'Tarjima qilinmasin',
  [DICTIONARY_STATUSES.NeedsTranslation]: 'Tarjima kerak',
  [DICTIONARY_STATUSES.Obsolete]: 'Eski',
};

const DICTIONARY_STATUS_BADGE_COLOR: Record<string, BadgeProps['color']> = {
  'Approved': 'green',
  'Pending review': 'yellow',
  'Do not translate': 'gray',
  'Needs translation': 'blue',
  'Obsolete': 'red',
};


export {
  ALPHABET,
  DICTIONARY_STATUSES,
  DICTIONARY_STATUS_TRANSLATIONS,
  DICTIONARY_STATUS_BADGE_COLOR,
}