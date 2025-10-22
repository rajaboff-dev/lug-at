import { useEffect, useState} from "react";
import DictionaryService from "../services/DictionaryService.ts";
import type {IDictionary} from "../types/dictionary.ts";

export const useFetchDictionaries = (() => {
  const [data, setData] = useState<IDictionary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    DictionaryService.get()
      .then(res => res.sort((a, b) => a.en.localeCompare(b.en)))
      .then(sorted => {
        setData(sorted);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, isError };
});