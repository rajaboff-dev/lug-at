import {useState} from "react";
import Dictionary from "../components/Dictionary.tsx";


function Home() {
  const [search, setSearch] = useState('');
  return (
    <div className='flex flex-col items-center justify-start min-h-screen gap-20 px-5 pt-10'>
      <div className='flex flex-col justify-center text-center lg:flex-row items-center gap-1'>
        <img src='/assets/logo.png' alt='Logo' className='w-20 h-20' />
        <h1 className='text-3xl font-semibold'>O‘zbek Mahalliylashtirish</h1>
      </div>
      <input
        placeholder='Qidirish'
        className='border px-5 py-3 w-full sm:w-72 lg:w-96 rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Dictionary search={search} />
    </div>
  );
}

export default Home;