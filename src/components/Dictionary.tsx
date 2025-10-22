import {useFetchDictionaries} from "../hooks/useFetchDictionaries.ts";
import {useEffect, useState} from "react";
import type {IDictionary} from "../types/dictionary.ts";

const letters = [
  'a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z',
  'o‘', 'gʻ', 'sh', 'ch', 'ng'
];

function Dictionary({search}: { search?: string }) {
  const [data, setData] = useState<IDictionary[] | undefined>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | undefined>();

  const dictionaries = useFetchDictionaries()

  const handleSearch = () => {
    if (search) {
      const isMatch = (word: string) => {
        return word.toLowerCase().includes(search.toLowerCase());
      }

      setData(
        dictionaries.data.filter(dictionary => {
          for (const dictionaryKey of (Object.keys(dictionary) as (keyof IDictionary)[])) {
            if (typeof dictionary[dictionaryKey] === 'string' && isMatch(dictionary[dictionaryKey])) {
              return true
            }
          }
          return false
        })
      )
    } else {
      setData(dictionaries.data)
    }
  }

  const handleFilterByLetter = () => {
    if (selectedLetter) {
      const isMatch = (word: string) => {
        return word?.[0]?.toLowerCase() === selectedLetter.toLowerCase();
      }

      setData(
        dictionaries.data.filter(dictionary => {
          for (const dictionaryKey of (Object.keys(dictionary) as (keyof IDictionary)[])) {
            if (typeof dictionary[dictionaryKey] === 'string' && isMatch(dictionary[dictionaryKey])) {
              return true
            }
          }
          return false
        })
      )
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
    <div className='flex items-center justify-center flex-col gap-10 px-40'>
      <h1 className='text-2xl font-medium'>Lug'at</h1>
      <div className='flex items-center justify-center flex-wrap gap-7'>
        {letters.map((letter, index) => (
          <a
            className={`bg-black/90 text-white shadow-sm cursor-pointer rounded-lg hover:underline w-10 flex items-center justify-center py-2 ${selectedLetter === letter && 'bg-black/70'}`}
            key={index}
            onClick={() => {
              setSelectedLetter(letter);
            }}
          >
            {letter.toUpperCase()}
          </a>
        ))}
      </div>
      {Number(data?.length) > 0 ?
        (
          <div className='w-full grid grid-cols-4 gap-5 py-10'>
            {data?.map((dictionary, index) => {
              return (
                <div key={index} className='w-full p-2 bg-slate-50/30 shadow-sm rounded-lg'>
                  <h1>{dictionary.en} - {dictionary.uz}</h1>
                  {dictionary.status && (
                    <h3>Holati: {dictionary.status}</h3>
                  )}
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