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

  const publicKey = '60bd2f300130e2e67d9be0c3ff7565d7';
  const privateKey = 'fc5d35dc3bdcd1ad3d4e5a8e8d163e81a74bf01e';

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
