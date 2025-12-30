
import React, { useState, useRef } from 'react';
import { InputType } from '../types';
import { FileText, Image as ImageIcon, Type, Upload, CheckCircle2, Loader2, PenTool, ScrollText, Layers, Target, Flag } from 'lucide-react';

interface InputSectionProps {
  inputType: InputType;
  setInputType: (type: InputType) => void;
  textValue: string;
  setTextValue: (val: string) => void;
  // Whitepaper props
  layerConcept?: string;
  setLayerConcept?: (val: string) => void;
  layerData?: string;
  setLayerData?: (val: string) => void;
  layerConclusion?: string;
  setLayerConclusion?: (val: string) => void;
  // File props
  file: File | null;
  setFile: (f: File | null) => void;
  filePreview: string | null;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputType,
  setInputType,
  textValue,
  setTextValue,
  layerConcept,
  setLayerConcept,
  layerData,
  setLayerData,
  layerConclusion,
  setLayerConclusion,
  file,
  setFile,
  filePreview
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [readingProgress, setReadingProgress] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setIsProcessing(true);
    setReadingProgress(0);

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setReadingProgress(percent);
      }
    };

    reader.onloadend = () => {
      setReadingProgress(100);
      setTimeout(() => {
        setFile(selectedFile);
        setIsProcessing(false);
        setReadingProgress(null);
        // Reset input value to allow selecting the same file again if needed
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 400);
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setReadingProgress(null);
      alert("Failed to read file.");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    if (inputType === InputType.CSV) {
      reader.readAsText(selectedFile);
    } else {
      reader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileUpload = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && !isProcessing) {
      const isImage = droppedFile.type.startsWith('image/');
      const isCsv = droppedFile.name.endsWith('.csv') || droppedFile.type === 'text/csv';

      if ((inputType === InputType.IMAGE && isImage) || (inputType === InputType.CSV && isCsv)) {
        processFile(droppedFile);
      }
    }
  };

  return (
    <div className="bg-white/60 rounded-lg woodblock-border overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-giay-diep opacity-50 pointer-events-none"></div>

      {/* Tabs - Styled as paper bookmarks */}
      <div className="flex border-b-2 border-stone-800 bg-stone-100 relative z-10 overflow-x-auto">
        {[
          { type: InputType.TEXT, icon: Type, label: 'Concept' },
          { type: InputType.CSV, icon: FileText, label: 'Data (CSV)' },
          { type: InputType.IMAGE, icon: ImageIcon, label: 'Image' },
          { type: InputType.WHITEPAPER, icon: ScrollText, label: 'Whitepaper' },
        ].map((tab) => (
          <button
            key={tab.type}
            disabled={isProcessing}
            onClick={() => {
              setInputType(tab.type);
              setFile(null);
            }}
            className={`flex-1 py-4 px-2 min-w-[100px] flex items-center justify-center gap-2 font-serif font-bold transition-all duration-200
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
              ${inputType === tab.type 
                ? 'bg-[#fdfbf7] text-red-800 border-b-4 border-red-700 shadow-inner' 
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200'}
            `}
          >
            <tab.icon size={18} />
            <span className="hidden sm:inline uppercase tracking-wider text-sm whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 min-h-[220px] flex flex-col relative z-10 bg-giay-diep">
        {inputType === InputType.TEXT && (
          <div className="relative">
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Describe your idea here... "
              className="w-full h-44 bg-white border-2 border-stone-300 rounded-lg p-4 text-stone-900 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 resize-none transition-all placeholder:text-stone-400 font-serif leading-relaxed shadow-inner"
            />
            <PenTool className="absolute right-4 bottom-4 text-stone-300" size={20} />
          </div>
        )}

        {inputType === InputType.WHITEPAPER && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            {/* Layer 1: Concept */}
            <div className="relative pl-6 border-l-2 border-stone-300">
              <div className="absolute -left-[11px] top-0 bg-stone-100 border-2 border-stone-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600">I</div>
              <label className="block text-sm font-bold text-stone-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Target size={16} className="text-red-700"/> Foundation: The Core Concept
              </label>
              <textarea
                value={layerConcept || ''}
                onChange={(e) => setLayerConcept && setLayerConcept(e.target.value)}
                placeholder="What is the main topic? (e.g., Sustainable Urban Farming in 2050)"
                className="w-full h-24 bg-white border-2 border-stone-300 rounded-lg p-3 text-stone-900 focus:outline-none focus:border-red-700 font-serif text-sm shadow-sm"
              />
            </div>

            {/* Layer 2: Evidence */}
            <div className="relative pl-6 border-l-2 border-stone-300">
              <div className="absolute -left-[11px] top-0 bg-stone-100 border-2 border-stone-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600">II</div>
               <label className="block text-sm font-bold text-stone-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers size={16} className="text-blue-700"/> Evidence: The Supporting Data
              </label>
              <textarea
                value={layerData || ''}
                onChange={(e) => setLayerData && setLayerData(e.target.value)}
                placeholder="What backs this up? (e.g., 40% reduction in water usage, hydroponic vertical grids)"
                className="w-full h-24 bg-white border-2 border-stone-300 rounded-lg p-3 text-stone-900 focus:outline-none focus:border-blue-700 font-serif text-sm shadow-sm"
              />
            </div>

            {/* Layer 3: Conclusion */}
            <div className="relative pl-6 border-l-2 border-stone-300">
               <div className="absolute -left-[11px] top-0 bg-stone-100 border-2 border-stone-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600">III</div>
               <label className="block text-sm font-bold text-stone-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Flag size={16} className="text-green-700"/> Conclusion: The Key Takeaway
              </label>
              <textarea
                value={layerConclusion || ''}
                onChange={(e) => setLayerConclusion && setLayerConclusion(e.target.value)}
                placeholder="What is the final message? (e.g., A greener future for megacities)"
                className="w-full h-24 bg-white border-2 border-stone-300 rounded-lg p-3 text-stone-900 focus:outline-none focus:border-green-700 font-serif text-sm shadow-sm"
              />
            </div>
          </div>
        )}

        {(inputType === InputType.CSV || inputType === InputType.IMAGE) && (
          <div className="flex flex-col gap-4">
             <div 
              onClick={triggerFileUpload}
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={`
                border-2 border-dashed rounded-lg h-44 flex flex-col items-center justify-center cursor-pointer 
                transition-all duration-300 relative overflow-hidden group bg-white
                ${isProcessing ? 'border-red-400 bg-red-50' : 'border-stone-400 hover:bg-stone-50 hover:border-red-600'}
              `}
            >
              {isProcessing ? (
                <div className="z-10 flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-red-700" size={32} />
                  <div className="text-center">
                    <p className="text-red-900 font-serif font-semibold text-lg">Inking...</p>
                    <p className="text-stone-500 text-sm mt-1">{readingProgress}%</p>
                  </div>
                </div>
              ) : filePreview && inputType === InputType.IMAGE ? (
                <>
                  <img src={filePreview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity grayscale hover:grayscale-0 duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/10">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-stone-900 text-sm font-bold flex items-center gap-2 border border-stone-300 shadow-lg">
                      <ImageIcon size={16} />
                      Change Sketch
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Upload className={`text-stone-400 mb-2 transition-transform group-hover:-translate-y-1 group-hover:text-red-600`} size={32} />
                  <p className="text-stone-700 font-serif font-bold text-lg">Select {inputType === InputType.CSV ? 'CSV' : 'Image'}</p>
                  <p className="text-stone-500 text-sm mt-1 italic">
                    {inputType === InputType.CSV ? 'Comma-separated values' : 'JPG, PNG, WebP supported'}
                  </p>
                </>
              )}

              {/* Progress Bar styled as Red Ink */}
              {readingProgress !== null && (
                <div className="absolute bottom-0 left-0 h-2 w-full bg-stone-200">
                  <div 
                    className="h-full bg-red-700 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              )}
            </div>

            {file && !isProcessing && (
              <div className="bg-yellow-50 p-3 rounded border border-yellow-200 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 className="text-green-700" size={20} />
                <div className="flex-1 overflow-hidden">
                  <span className="text-sm font-bold text-stone-800 block truncate font-serif">{file.name}</span>
                  <span className="text-xs text-stone-500">{(file.size / 1024).toFixed(1)} KB • Ready for print</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 font-bold underline"
                >
                  Discard
                </button>
              </div>
            )}
          </div>
        )}
        
        <p className="text-stone-500 text-xs mt-auto pt-4 flex items-center gap-2 italic font-serif">
          <span className="w-2 h-2 rounded-full bg-red-700" />
          {inputType === InputType.TEXT && "The artisan will carve blocks based on your story."}
          {inputType === InputType.CSV && "The artisan will chart your numbers into the scene."}
          {inputType === InputType.IMAGE && "The artisan will use your sketch as the foundation."}
          {inputType === InputType.WHITEPAPER && "The artisan will synthesize your layers into a Royal Scroll."}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={inputType === InputType.CSV ? ".csv,text/csv" : "image/*"}
      />
    </div>
  );
};

export default InputSection;
