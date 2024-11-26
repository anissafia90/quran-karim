function SurahList({ surahs, onSurahClick, currentSurah }) {
  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto">
      {surahs.map((surah) => (
        <button
          key={surah.number}
          onClick={() => onSurahClick(surah)}
          className={`w-full text-left p-3 rounded-lg transition-colors ${
            currentSurah?.number === surah.number
              ? "bg-emerald-100 text-emerald-700"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <span className="w-8 h-8  flex items-center justify-center bg-emerald-400 text-white rounded-full text-sm">
              {surah.number}
            </span>
            <div className="ml-3">
              <div className="font-medium">{surah.englishName}</div>
              <div className="text-sm text-gray-500">
                {surah.numberOfAyahs} Ayahs
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default SurahList;
