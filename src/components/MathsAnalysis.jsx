import React from 'react';

const analysisData = {
    headers: [
        "Topic/Year", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
        "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "Total"
    ],
    rows: [
        ["Vectors", 5, 6, 6, 5, 6, 6, 4, 6, 6, 4, 6, 7, 4, 4, 6, 4, 88],
        ["Probability", 6, 5, 4, 4, 5, 5, 6, 5, 5, 6, 7, 4, 5, 5, 5, 6, 79],
        ["Set Relation and Function", 4, 3, 3, 3, 4, 4, 3, 3, 4, 4, 3, 4, 3, 3, 3, 3, 55],
        ["Trigonometry", 4, 6, 5, 4, 4, 4, 4, 4, 4, 5, 4, 3, 3, 2, 2, 3, 60],
        ["Ratio/Identity/Equations", 2, 4, 4, 3, 6, 4, 4, 5, 4, 6, 6, 6, 4, 4, 4, 4, 66],
        ["Permutations and Combinations", 2, 2, 2, 3, 3, 2, 2, 3, 2, 3, 4, 3, 2, 3, 3, 2, 45],
        ["Progression", 2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 38],
        ["Quadratic Equation", 2, 1, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 36],
        ["Definite Integration", 2, 3, 2, 1, 2, 2, 3, 3, 2, 2, 2, 3, 2, 2, 1, 1, 34],
        ["Matrix", 4, 3, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 45],
        ["Cartesian System/Straight Line", 3, 2, 2, 2, 3, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 38],
        ["Properties of Triangle", 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 33],
        ["Statistics", 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 19],
        ["Differentiation/Applications", 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 28],
        ["Minima/Maxima", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Circle", 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 27],
        ["Parabola", 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 27],
        ["Indefinite Integration", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17],
        ["Inverse Trigonometry", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Limits", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Hyperbola", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Tangent & Normal", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Ellipse", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Application of Integration", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Heights and Distances", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16],
        ["Others", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 4]
    ]
};

export default function NimcetMathTable() {

    return (
        <div className={`overflow-x-auto p-4 min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white`}>

            <table className={`table-auto border w-full text-sm text-left transition-colors duration-300
        dark:border-gray-700 border-gray-300 text-gray-700 dark:text-gray-300`}
            >
                <thead className={ 'dark:bg-gray-800 dark:text-gray-100 bg-blue-100 text-gray-900'}>
                    <tr>
                        {analysisData.headers.map((header, index) => (
                            <th
                                key={index}
                                className={`border px-3 py-2 text-xs font-semibold text-center transition-colors duration-300
  dark:bg-gray-800 dark:text-gray-100 text-gray-700`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {analysisData.rows.map((row, idx) => (
                        <tr key={idx} className='dark:hover:bg-gray-700  hover:bg-gray-100'>
                            {row.map((cell, i) => (
                                <td
                                    key={i}
                                    className={`border px-2 py-1 text-center transition-colors duration-300
                   border-gray-700 dark:border-gray-300`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}