import {useFetchDictionaries} from "../hooks/useFetchDictionaries.ts";
import {useEffect, useState} from "react";
import type {IDictionary} from "../types/dictionary.ts";
import levenshtein from "../utils/levenshtein.ts";
import {ALPHABET, DICTIONARY_STATUS_BADGE_COLOR, DICTIONARY_STATUS_TRANSLATIONS} from "../utils/consts.ts";
import Badge from "./Badge.tsx";
import {cn} from "../lib/cn.ts";


interface IDictionaryProps {
  search?: string
}

function Dictionary({search}: IDictionaryProps) {
  const [data, setData] = useState<IDictionary[] | undefined>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | undefined>();

  const dictionaries = useFetchDictionaries()

  const handleSearch = () => {
    if (search) {
      const searchLowerCase = search.toLowerCase();

      const filtered = dictionaries.data
        .filter(dictionary => {
          return dictionary.en.includes(searchLowerCase) ||
            dictionary.uz.includes(searchLowerCase) ||
            dictionary.similar.some(similar => similar.toLowerCase().includes(searchLowerCase));
        })
        .sort((a, b) => levenshtein(searchLowerCase, a.en.toLowerCase()) - levenshtein(searchLowerCase, b.en.toLowerCase()))
        .sort((a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()));

      setData(filtered);
    } else {
      setData(dictionaries.data);
    }
  };

  const handleFilterByLetter = () => {
    if (selectedLetter) {
      const isMatch = (word: string) => {
        return word?.[0]?.toLowerCase() === selectedLetter.toLowerCase();
      }

      setData(dictionaries.data.filter(dictionary => isMatch(dictionary.en)))
    } else {
      setData(dictionaries.data)
    }
  }

  useEffect(() => {
    handleFilterByLetter();
  }, [selectedLetter]);

  useEffect(() => {
    console.log(search)
    handleSearch()
  }, [search, dictionaries.data]);

  useEffect(() => {
    setData(dictionaries.data)
  }, [dictionaries.data]);


  if (dictionaries.isLoading) return (
    <h1>Yuklanmoqda...</h1>
  )

  if (dictionaries.isError) return (
    <h1>Xatolik yuz berdi. Iltimos keyinroq urinib ko'ring!</h1>
  )

  return (
    <div className='flex items-center justify-center flex-col gap-10 px-5 lg:px-20 xl:px-40'>
      <h1 className='text-2xl font-medium'>Lug'at</h1>
      <div className='flex items-center justify-center flex-wrap gap-7'>
        {ALPHABET.map((letter, index) => (
          <a
            className={cn(
              `cursor-pointer rounded-lg shadow-sm w-10 flex items-center justify-center py-2 transition`,
              selectedLetter === letter ? 'bg-gray-700 text-white shadow-md scale-105' : 'bg-black/70 text-white hover:bg-gray-800'
            )}
            key={index}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter.toUpperCase()}
          </a>
        ))}
      </div>
      {Number(data?.length) > 0 ?
        (
          <div className='w-full grid gap-5 py-10 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]'>
            {data?.map((dictionary, index) => {
              return (
                <div key={index} className='w-full p-2 bg-slate-50/30 shadow-sm rounded-lg'>
                  <div className='flex items-start justify-between'>
                    <h1 className='text-lg font-medium'>{dictionary.en} - {dictionary.uz}</h1>
                    {dictionary.status && (
                      <Badge className='min-w-32' color={DICTIONARY_STATUS_BADGE_COLOR[dictionary.status]}>{DICTIONARY_STATUS_TRANSLATIONS[dictionary.status]}</Badge>
                    )}
                  </div>
                  {dictionary.description && (
                    <h3>Tavsif: {dictionary.description}</h3>
                  )}
                </div>
              )
            })}
          </div>
        ) :
        (
          <h1 className='text-center w-full flex items-center justify-center'>Hech nima topilmadi!</h1>
        )
      }

    </div>
  )
    ;
}

export default Dictionary;