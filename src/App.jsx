import React, { useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Download, QrCode } from "lucide-react";

function App() {
  const [value, setValue] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState("L");

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-indigo-300 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <QrCode className="w-10 h-10 text-indigo-700" />
            <h1 className="text-4xl font-extrabold text-indigo-900 drop-shadow-lg">
              Modern QR Code Generator
            </h1>
          </div>
          <p className="text-gray-700 text-lg">
            Instantly create stylish QR codes with custom colors, sizes, and
            error correction.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* QR Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100"
          >
            <div className="flex justify-center mb-6 p-6 bg-gray-50 rounded-xl">
              <QRCode
                id="qr-code"
                value={value || "https://portfolio-v2-gray-phi.vercel.app/"}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level={errorLevel}
              />
            </div>

            <button
              onClick={downloadQR}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </button>
          </motion.div>

          {/* Controls */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100"
          >
            {/* Content Input */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">
                Content to Encode
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                rows={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter URL, text, or other content"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Background */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 cursor-pointer rounded"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Foreground */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 cursor-pointer rounded"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Size (px)
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full accent-indigo-600"
                />
                <div className="text-center text-gray-600 font-medium">
                  {size}px
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Error Correction
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-1">💡 Tips</h3>
              <p className="text-indigo-700 text-sm leading-relaxed">
                Always include <span className="font-mono">https://</span> for
                URLs. Higher error correction makes the QR more durable but
                increases complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
