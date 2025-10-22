export interface IDictionary {
  id: string;
  en: string
  uz: string
  part_of_speech: string
  description: string | null
  pronunciation_uz: string
  similar: string[]
  status: string
}


export type IDictionaryParams =  {
  _start?: number,
  _end?: number
  limit?: number
  _page?: number
  _per_page?: number
  _sort?: number
} & Record<string, string>