import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
    const [value, setValue] = useState('');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#000000');
    const [size, setSize] = useState(256);
    const [errorLevel, setErrorLevel] = useState('L');

    const downloadQR = () => {
        const svg = document.getElementById('qr-code');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = 'QRCode.png';
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-800 mb-2 text-center">QR Code Generator</h1>
                <p className="text-gray-600 mb-8 text-center">Create custom QR codes for URLs, text, or contact information</p>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-center mb-6 p-4 bg-gray-50 rounded-lg">
                            <QRCode 
                                id="qr-code"
                                value={value || 'https://portfolio-v2-gray-phi.vercel.app/'} 
                                size={size}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level={errorLevel}
                            />
                        </div>
                        
                        <button 
                            onClick={downloadQR}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Download QR Code
                        </button>
                    </div>
                    
                    <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Content to encode</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                rows={3}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter URL, text, or other content"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Background Color</label>
                                <div className="flex items-center">
                                    <input 
                                        type="color" 
                                        value={bgColor} 
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-10 h-10 cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={bgColor} 
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="ml-2 border border-gray-300 rounded-lg px-3 py-1 w-24"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Foreground Color</label>
                                <div className="flex items-center">
                                    <input 
                                        type="color" 
                                        value={fgColor} 
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="w-10 h-10 cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={fgColor} 
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="ml-2 border border-gray-300 rounded-lg px-3 py-1 w-24"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Size (px)</label>
                                <input 
                                    type="range" 
                                    min="100" 
                                    max="500" 
                                    value={size} 
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full"
                                />
                                <div className="text-center text-gray-600">{size}px</div>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Error Correction</label>
                                <select 
                                    value={errorLevel}
                                    onChange={(e) => setErrorLevel(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="L">Low (7%)</option>
                                    <option value="M">Medium (15%)</option>
                                    <option value="Q">Quartile (25%)</option>
                                    <option value="H">High (30%)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <h3 className="font-medium text-blue-800 mb-1">Tips</h3>
                            <p className="text-blue-700 text-sm">
                                For URLs, include "https://" for best results. Higher error correction makes the QR code 
                                more readable when damaged but increases its size.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;