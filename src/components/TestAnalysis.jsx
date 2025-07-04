import React from 'react';

export default function TestAnalysis({ questions, selected, marked, duration, onGoToTests, onShowSolutions }) {
  // Section list
  const sectionList = ['Mathematics', 'Reasoning', 'Computer'];
  // Section marks (example, adjust as needed)
  const sectionMarks = { Mathematics: 600, Reasoning: 240, Computer: 90 };
  // Per question marks (example, adjust as needed)
  const perQuestionMark = 12;

  // Calculate stats
  let totalCorrect = 0, totalIncorrect = 0, totalUnattempted = 0;
  const sectionStats = sectionList.map(section => {
    const qIdxs = questions.map((q, idx) => ({ ...q, idx })).filter(q => q.subject === section);
    let correct = 0, incorrect = 0, unattempted = 0;
    qIdxs.forEach(q => {
      if (selected[q.idx] === null) unattempted++;
      // For demo, treat all answers as unattempted (no answer key in mock)
      // In real use, compare selected[q.idx] === q.answerIdx
    });
    totalCorrect += correct;
    totalIncorrect += incorrect;
    totalUnattempted += unattempted;
    return {
      section,
      correct,
      incorrect,
      unattempted,
      marks: correct * perQuestionMark,
      total: qIdxs.length,
      maxMarks: sectionMarks[section] || 0
    };
  });
  const totalMarks = sectionStats.reduce((sum, s) => sum + s.marks, 0);
  const maxMarks = sectionStats.reduce((sum, s) => sum + s.maxMarks, 0);
  const percent = maxMarks ? Math.round((totalMarks / maxMarks) * 100) : 0;

  // Pie chart data (simple SVG)
  const pieData = [
    { label: 'Correct', value: totalCorrect, color: '#22c55e' },
    { label: 'Incorrect', value: totalIncorrect, color: '#ef4444' },
    { label: 'Unattempted', value: totalUnattempted, color: '#64748b' },
  ];
  const totalPie = totalCorrect + totalIncorrect + totalUnattempted;
  let acc = 0;
  const pieSlices = pieData.map((d, i) => {
    const start = acc / totalPie;
    acc += d.value;
    const end = acc / totalPie;
    const large = end - start > 0.5 ? 1 : 0;
    const a = 2 * Math.PI * start;
    const b = 2 * Math.PI * end;
    const x1 = 60 + 50 * Math.sin(a);
    const y1 = 60 - 50 * Math.cos(a);
    const x2 = 60 + 50 * Math.sin(b);
    const y2 = 60 - 50 * Math.cos(b);
    return d.value === 0 ? null : (
      <path key={d.label} d={`M60,60 L${x1},${y1} A50,50 0 ${large} 1 ${x2},${y2} z`} fill={d.color} />
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Results Summary</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Overall Performance */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-2">Overall Performance</h2>
            <div className="mb-4">
              <div className="font-bold">NIMCET PRACTICE 2007</div>
              <div className="text-sm text-gray-500">Test Duration : {duration}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold mb-2">Marks : {totalMarks} / {maxMarks} ({percent}%)</div>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="#f1f5f9" />
                {pieSlices}
              </svg>
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#22c55e'}}></span> Correct: {totalCorrect}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#ef4444'}}></span> Incorrect: {totalIncorrect}</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:'#64748b'}}></span> Unattempted: {totalUnattempted}</span>
              </div>
            </div>
          </div>
          {/* Category Performance */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Category Performance</h2>
              <div className="flex gap-2">
                <button onClick={onShowSolutions} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold">Show Solutions</button>
                <button onClick={onGoToTests} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold">Go to tests</button>
              </div>
            </div>
            <div className="space-y-4">
              {sectionStats.map(s => (
                <div key={s.section} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="font-semibold mb-1">{s.section}</div>
                  <div className="flex gap-4 text-sm mb-1">
                    <span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 rounded-full inline-block bg-green-500"></span> Correct: {s.correct}</span>
                    <span className="flex items-center gap-1 text-red-500"><span className="w-2 h-2 rounded-full inline-block bg-red-500"></span> Incorrect: {s.incorrect}</span>
                    <span className="flex items-center gap-1 text-gray-600"><span className="w-2 h-2 rounded-full inline-block bg-gray-500"></span> Unattempted: {s.unattempted}</span>
                  </div>
                  <div className="text-xs text-gray-500">Marks: {s.marks} / {s.maxMarks} ({s.maxMarks ? Math.round((s.marks/s.maxMarks)*100) : 0}%)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
