import React, { useState } from "react";
import Barcode from "react-barcode";
import { motion } from "framer-motion";
import { Download, BarcodeIcon } from "lucide-react";

function Bar() {
  const [value, setValue] = useState("123456789012");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [lineColor, setLineColor] = useState("#000000");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);

  const downloadBarcode = () => {
    const svg = document.getElementById("barcode");
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
      downloadLink.download = "Barcode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="lg:min-h-screen min-h-auto lg:pt-0 pt-32 bg-gradient-to-br from-indigo-100 via-blue-200 to-indigo-300 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <BarcodeIcon className="w-10 h-10 text-indigo-700" />
            <h1 className="text-4xl font-extrabold text-indigo-900 drop-shadow-lg">
              Modern Barcode Generator
            </h1>
          </div>
          <p className="text-gray-700 text-lg">
            Create customizable barcodes with different sizes and colors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Barcode Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100"
          >
            <div className="flex justify-center mb-6 p-6 bg-gray-50 rounded-xl">
              <Barcode
                id="barcode"
                value={value}
                background={bgColor}
                lineColor={lineColor}
                width={width}
                height={height}
                displayValue={displayValue}
              />
            </div>

            <button
              onClick={downloadBarcode}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
            >
              <Download className="w-5 h-5" />
              Download Barcode
            </button>
          </motion.div>

          {/* Controls */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100"
          >
            {/* Value */}
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-2">
                Barcode Value
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter numbers or text"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Background */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-12 cursor-pointer rounded-lg"
                />
              </div>

              {/* Line Color */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Line Color
                </label>
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className="w-full h-12 cursor-pointer rounded-lg"
                />
              </div>

              {/* Width */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Bar Width
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="text-center text-gray-600">{width}px</div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Bar Height
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="text-center text-gray-600">{height}px</div>
              </div>
            </div>

            {/* Show Value */}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                checked={displayValue}
                onChange={(e) => setDisplayValue(e.target.checked)}
                className="w-5 h-5 accent-indigo-600"
              />
              <span className="text-gray-800 font-medium">
                Show Barcode Value
              </span>
            </div>

            {/* Tips */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-1">💡 Tips</h3>
              <p className="text-indigo-700 text-sm leading-relaxed">
                Use numeric values for compatibility with most barcode
                scanners. Adjust width and height for better readability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Bar;
