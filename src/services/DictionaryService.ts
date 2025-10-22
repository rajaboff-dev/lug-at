import type {IDictionary} from "../types/dictionary.ts";
import * as toml from "toml";

const DictionaryService = {
  async get(): Promise<IDictionary[]> {
    return await fetch('https://raw.githubusercontent.com/uzbek-net/dictionary/main/dictionary.toml')
      .then(res => res.text())
      .then(response => {
        try {
          const { translations } = toml.parse(response)
          return translations;
        } catch (error) {
          console.error('Toml parsing error: ', error);
        }
      })
      .then(data => {
        console.log(data)
        return data
      })
  }
}

export default DictionaryService