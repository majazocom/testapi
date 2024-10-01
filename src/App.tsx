import { useEffect, useState } from 'react'
import './App.css'
import md5 from 'md5';

interface IComic {
  characters: ICharacters;
  title: string;
}
interface ICharacters {
  title: string;
}

function App() {
  const [comics, setComics] = useState<IComic[]>([]);
  const [loading, setLoading] = useState(true);

  const publicKey = '';
  const privateKey = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ts = Date.now();
        const hash = md5(`${ts}${privateKey}${publicKey}`);

        const apiUrl = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error('API-anropet misslyckades');
        }

        const data = await response.json();
        setComics(data.data.results);
        console.log(data.data.results);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      {comics ? comics.map((comic, i) => (
        <p key={i}>{comic.title}</p>
      )) : null}
    </>
  )
}

export default App
