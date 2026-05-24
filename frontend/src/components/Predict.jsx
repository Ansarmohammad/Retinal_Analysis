import React, { useState } from "react";
import axios from "axios";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return alert("Choose an image first");

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:5000/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setResult(res.data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-purple-400 text-center">
        Retina Analysis
      </h1>

      <div className="max-w-xl mx-auto mt-10 bg-[#0d0d0d] p-6 rounded-3xl border border-purple-600">

        <input type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-3 bg-[#1a1a1a] rounded-xl mb-4 border border-purple-700"
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-purple-600 p-4 rounded-xl text-xl"
        >
          Analyze Image
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="mt-12">

          <div className="grid grid-cols-2 gap-10">
            {/* Original */}
            <div className="bg-[#111] p-6 rounded-3xl border border-purple-700">
              <h2 className="text-xl text-purple-400 text-center">Original</h2>
              <img
                src={`data:image/png;base64,${result.original}`}
                className="w-full rounded-xl mt-4"
              />
            </div>

            {/* Reconstructed */}
            <div className="bg-[#111] p-6 rounded-3xl border border-purple-700">
              <h2 className="text-xl text-purple-400 text-center">Reconstructed</h2>
              <img
                src={`data:image/png;base64,${result.reconstructed}`}
                className="w-full rounded-xl mt-4"
              />
            </div>
          </div>

          {/* PREDICTION */}
          <div className="mt-10 bg-[#131313] p-8 rounded-3xl border border-purple-600">
            <h2 className="text-3xl text-purple-300 font-bold text-center">
              Prediction Results
            </h2>

            <p className="text-xl mt-4"><b>Stage:</b> {result.stage}</p>
            <p className="text-xl mt-2"><b>Description:</b> {result.description}</p>
            <p className="text-xl mt-2">
              <b>Confidence:</b> {result.confidence ? result.confidence.toFixed(2) : "0"}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
