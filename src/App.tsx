import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

const App: React.FC = () => {
  const API_KEY = "6TSvZ8L_ml4NBk7fHeEGQdkgl0asqwIgIj0rEvYq0zI";
  const [query, setQuery] = useState<string>('cat');
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPhotos(query);
  }, [query]);

  const fetchPhotos = async (query: string): Promise<void> => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query },
        headers: {
          Authorization: `Client-ID ${API_KEY}`
        }
      });
      setPhotos(response.data.results);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleSearch = (): void => {
    const input = (document.getElementById('searchInput') as HTMLInputElement).value;
    setQuery(input);
  };

  return (
    <div className="container">
      <input type="text" id="searchInput" defaultValue="cat" />
      <button onClick={handleSearch}>Search</button>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.urls.small} alt={photo.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
