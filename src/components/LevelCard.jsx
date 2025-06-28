function LevelCard({ level, levelIndex, unlocked, scores, selectedChapter, setSelectedChapter }) {
  const chapters = Object.entries(level.sections).map(([subject, data]) => ({
    title: data.topic,
    subject,
    thumbnail: data.thumbnail || 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    resources: {
      video: data.video || "#",
      notes: data.notes || "#",
      test: data.test || "#",
    },
  }));

  const isLevelComplete = chapters.every(
    (ch) => scores[`${levelIndex}-${ch.title}`] >= 70
  );

  const avatarURL = level.avatar || "/logo.png" || "https://cdn.pixabay.com/photo/2023/01/27/20/20/rabbit-7749546_1280.png";

  return (
    <div
      className={`relative border  ${unlocked ? 'border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-700 opacity-50 pointer-events-none'} rounded-3xl shadow-xl p-6 pt-16 bg-white/60 dark:bg-[rgba(255,255,255,0.4)] backdrop-blur-[15px] ring-1 ring-white/30 dark:ring-white/20`}
    >
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
          <img
            src={avatarURL}
            alt="Level Avatar"
            className="w-full h-full object-contain animate-bounce"
          />
        </div>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400  ">Level {level.level}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 italic">Stage: {level.stage}</p>
      </div>
      <div className="grid gap-6 grid-cols-2 grid-rows-2">
        {chapters.map((chapter, j) => {
        const progress = Math.min(scores[`${levelIndex}-${chapter.title}`] || 0, 100);
        return (
          <div
            key={j}
            className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md mb-6 overflow-hidden"
          >
            <div
              onClick={() =>
                setSelectedChapter(
                  selectedChapter?.title === chapter.title ? null : chapter
                )
              }
              className="cursor-pointer"
            >
              <img src={chapter.thumbnail} alt={chapter.title} className="w-full h-40 object-cover" />
              <div className="px-4 py-3">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">
                  {chapter.title} <span className="text-sm text-gray-500">({chapter.subject})</span>
                </h3>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>

            {selectedChapter?.title === chapter.title && (
              <div className="px-4 pb-4">
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center shadow">
                    <p className="font-bold text-blue-600 mb-2">📺 Video Lecture</p>
                    <a
                      href={chapter.resources.video}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      Watch
                    </a>
                  </div>
                  <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center shadow">
                    <p className="font-bold text-blue-600 mb-2">📝 Notes</p>
                    <a
                      href={chapter.resources.notes}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <a
                    href={chapter.resources.test}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700"
                  >
                    🧪 Take Test
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
      </div>
      <div className="text-center mt-6">
        <button
          className={`mt-2 px-6 py-2 rounded-xl text-white font-semibold shadow-md ${isLevelComplete ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isLevelComplete}
        >
          🎯 Level Test
        </button>
      </div>
    </div>
  );
}

export default LevelCard;
