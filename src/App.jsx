import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";
import SurahList from "./components/SurahList";
import AudioPlayer from "./components/AudioPlayer";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        setSurahs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSurahClick = async (surah) => {
    setCurrentSurah(surah);
    setIsPlaying(false); // Pause the current playback
    try {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surah.number}/ar.ahmedajamy`
      );
      const ayahAudioUrls = response.data.data.ayahs.map((ayah) => ayah.audio);
      if (ayahAudioUrls.length > 0) {
        setAudioUrl(ayahAudioUrls); // Load all Ayahs for the new Surah
        setIsPlaying(true); // Start playback for the new Surah
      } else {
        console.error("No audio available for this Surah");
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-right">
              مشغل الصوت
            </h2>
            {currentSurah ? (
              <AudioPlayer
                surah={currentSurah}
                audioUrl={audioUrl}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                Please select a surah to play
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-right">
              قائمة السور
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <FaSpinner className="animate-spin text-emerald-600 text-2xl" />
              </div>
            ) : (
              <SurahList
                surahs={surahs}
                onSurahClick={handleSurahClick}
                currentSurah={currentSurah}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
