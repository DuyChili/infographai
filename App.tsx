import React, { useState, useEffect, useRef } from 'react';
import { Wand2, AlertTriangle, Download, RefreshCw, Zap, Languages, MessageSquarePlus, Image as ImageIcon, Upload, X, Palette, Scroll, Library, LogOut } from 'lucide-react'; // Thêm LogOut icon
import { INFOGRAPHIC_STYLES } from './constants';
import { InputType, GenerationRequest, Language } from './types';
import InputSection from './components/InputSection';
import StyleCard from './components/StyleCard';
import LoginScreen from './components/LoginScreen';
import { ensureApiKey, generateInfographic } from './services/geminiService';
import  logos  from './assets/images/logo_header.png';

const App: React.FC = () => {
  // --- THAY ĐỔI 1: Khởi tạo state dựa trên localStorage ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });

  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [language, setLanguage] = useState<Language>(Language.EN);
  
  // Basic Inputs
  const [textValue, setTextValue] = useState('');
  
  // Whitepaper Inputs
  const [layerConcept, setLayerConcept] = useState('');
  const [layerData, setLayerData] = useState('');
  const [layerConclusion, setLayerConclusion] = useState('');

  const [instructions, setInstructions] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  // Logo States
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [selectedStyleId, setSelectedStyleId] = useState<string>(INFOGRAPHIC_STYLES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file && inputType === InputType.IMAGE) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  }, [file, inputType]);

  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(logoFile);
    } else {
      setLogoPreview(null);
    }
  }, [logoFile]);

  // --- THAY ĐỔI 2: Hàm xử lý Login ---
  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // --- THAY ĐỔI 3: Hàm xử lý Logout (Để bạn có thể thoát ra) ---
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const handleInputTypeChange = (type: InputType) => {
    setInputType(type);
    setFile(null); 
    setResultImage(null);
    setError(null);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoFile(file);
  };

  const handleGenerate = async () => {
    setError(null);
    setResultImage(null);

    // Validation
    if (inputType === InputType.TEXT && !textValue.trim()) {
      setError("Please describe the concept for the artisan.");
      return;
    }
    if (inputType === InputType.CSV && !file) {
      setError("Please provide the data ledger (CSV).");
      return;
    }
    if (inputType === InputType.IMAGE && !file) {
      setError("Please provide the base sketch (Image).");
      return;
    }
    if (inputType === InputType.WHITEPAPER) {
      if (!layerConcept.trim()) {
        setError("Please provide the Core Concept (Layer I).");
        return;
      }
      if (!layerData.trim()) {
        setError("Please provide supporting Data (Layer II).");
        return;
      }
      if (!layerConclusion.trim()) {
        setError("Please provide the Conclusion (Layer III).");
        return;
      }
    }

    setIsGenerating(true);

    try {
      const hasKey = await ensureApiKey();
      if (!hasKey) {
        setIsGenerating(false);
        return; 
      }

      let contentData = textValue;
      let mimeType = undefined;
      let fileData = undefined;

      if (inputType === InputType.CSV && file) {
        contentData = await file.text();
      } else if (inputType === InputType.IMAGE && file && filePreview) {
        fileData = filePreview.split(',')[1];
        mimeType = file.type;
      }

      let logoData = undefined;
      let logoMimeType = undefined;
      if (logoPreview && logoFile) {
        logoData = logoPreview.split(',')[1];
        logoMimeType = logoFile.type;
      }

      const request: GenerationRequest = {
        inputType,
        textContent: contentData,
        layerConcept,
        layerData,
        layerConclusion,
        fileData,
        mimeType,
        logoData,
        logoMimeType,
        styleId: selectedStyleId,
        language,
        additionalInstructions: instructions
      };

      const style = INFOGRAPHIC_STYLES.find(s => s.id === selectedStyleId)!;
      const imageUrl = await generateInfographic(request, style);
      setResultImage(imageUrl);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (resultImage) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [resultImage]);

  if (!isAuthenticated) {
    // Truyền hàm handleLoginSuccess mới vào đây
    return <LoginScreen onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-giay-diep text-stone-900 pb-20 font-merriweather">
      {/* Inject Google Font Merriweather for Vietnamese support */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
          .font-merriweather {
            font-family: 'Merriweather', serif;
          }
        `}
      </style>

      {/* Woodblock Header */}
      <header className="border-b-4 border-double border-red-800 bg-[#fefcf8] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <img src={logos} alt="InfographAI" className="h-10 object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <div className="px-3 py-1 border border-stone-300 rounded-full bg-white text-xs font-bold text-stone-400 uppercase tracking-widest">
                Đông Hồ Edition
              </div>
            </div>
            
            {/* Nút Đăng xuất mới */}
            <button 
              onClick={handleLogout}
              className="p-2 text-stone-500 hover:text-red-800 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">
        {/* Step 1: Input Source */}
        <section className="space-y-6 relative">
          <div className="flex items-center gap-4">
             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-800 text-[#fdfbf7] font-bold text-xl border-4 border-stone-200 shadow-md z-10">
               I
             </div>
             <div className="flex-1 border-b-2 border-stone-300 absolute top-6 left-0 w-full -z-0"></div>
            <h2 className="text-3xl font-bold text-stone-800 bg-giay-diep pr-4 pl-2 z-10">The Source Material</h2>
          </div>
          
          <div className="pl-4 sm:pl-0">
             <InputSection 
              inputType={inputType}
              setInputType={handleInputTypeChange}
              textValue={textValue}
              setTextValue={setTextValue}
              layerConcept={layerConcept}
              setLayerConcept={setLayerConcept}
              layerData={layerData}
              setLayerData={setLayerData}
              layerConclusion={layerConclusion}
              setLayerConclusion={setLayerConclusion}
              file={file}
              setFile={setFile}
              filePreview={filePreview}
            />
          </div>
        </section>

        {/* Step 2: Brand Identity (Logo) */}
        <section className="space-y-6 relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-700 text-[#fdfbf7] font-bold text-xl border-4 border-stone-200 shadow-md z-10">
               II
             </div>
             <div className="flex-1 border-b-2 border-stone-300 absolute top-6 left-0 w-full -z-0"></div>
            <h2 className="text-3xl font-bold text-stone-800 bg-giay-diep pr-4 pl-2 z-10">The Maker's Mark <span className="text-stone-400 text-lg font-normal italic">(Logo)</span></h2>
          </div>

          <div className="bg-white rounded-lg woodblock-border p-6 relative">
            <div className="absolute inset-0 bg-giay-diep opacity-30 pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              <div 
                onClick={() => logoInputRef.current?.click()}
                className={`
                  w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group
                  ${logoPreview ? 'border-red-500 bg-white' : 'border-stone-400 hover:border-red-600 hover:bg-red-50'}
                `}
              >
                {logoPreview ? (
                  <>
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <RefreshCw className="text-white" size={24} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-stone-100 p-3 rounded-full mb-2">
                        <Upload className="text-stone-500" size={20} />
                    </div>
                    <span className="text-xs uppercase font-bold text-stone-500">Add Seal</span>
                  </>
                )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold text-xl text-stone-800 font-merriweather">Embed your Seal</h4>
                <p className="text-stone-600 mt-2 max-w-md italic">
                  Upload a transparent PNG. The artisan will place this mark upon the final work.
                </p>
                {logoFile && (
                  <button 
                    onClick={() => {
                      setLogoFile(null);
                      if (logoInputRef.current) logoInputRef.current.value = '';
                    }}
                    className="mt-4 text-sm text-red-700 hover:text-red-900 font-bold flex items-center gap-1 mx-auto sm:mx-0 uppercase tracking-wide"
                  >
                    <X size={16} /> Remove Seal
                  </button>
                )}
              </div>
            </div>
            <input 
              type="file" 
              ref={logoInputRef} 
              onChange={handleLogoChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </section>

        {/* Step 3: Custom Instructions */}
        <section className="space-y-6 relative">
          <div className="flex items-center gap-4">
             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-700 text-[#fdfbf7] font-bold text-xl border-4 border-stone-200 shadow-md z-10">
               III
             </div>
             <div className="flex-1 border-b-2 border-stone-300 absolute top-6 left-0 w-full -z-0"></div>
            <h2 className="text-3xl font-bold text-stone-800 bg-giay-diep pr-4 pl-2 z-10">Artisan Notes</h2>
          </div>
          
          <div className="bg-white rounded-lg woodblock-border p-1">
            <div className="bg-stone-50 p-4 rounded border border-stone-200">
                <div className="flex items-start gap-4">
                <div className="mt-2 text-stone-400">
                    <MessageSquarePlus size={24} />
                </div>
                <div className="flex-1 space-y-2">
                    <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Specific requests for the woodblock carver (e.g., 'Make the mountains taller', 'Use more red ink')..."
                    className="w-full h-24 bg-transparent border-none p-2 text-stone-800 focus:ring-0 resize-none placeholder:text-stone-400 font-merriweather text-lg leading-relaxed"
                    style={{ backgroundImage: 'linear-gradient(transparent 95%, #e5e5e5 95%)', backgroundSize: '100% 2rem', lineHeight: '2rem' }}
                    />
                </div>
                </div>
            </div>
          </div>
        </section>

        {/* Step 4: Visual Style */}
        <section className="space-y-6 relative">
          <div className="flex items-center gap-4">
             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-700 text-[#fdfbf7] font-bold text-xl border-4 border-stone-200 shadow-md z-10">
               IV
             </div>
             <div className="flex-1 border-b-2 border-stone-300 absolute top-6 left-0 w-full -z-0"></div>
            <h2 className="text-3xl font-bold text-stone-800 bg-giay-diep pr-4 pl-2 z-10">The Art Style</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INFOGRAPHIC_STYLES.map(style => (
              <StyleCard 
                key={style.id}
                style={style}
                isSelected={selectedStyleId === style.id}
                onSelect={setSelectedStyleId}
              />
            ))}
          </div>
        </section>

        {/* Step 5: Language */}
        <section className="space-y-6 relative">
          <div className="flex items-center gap-4">
             <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-700 text-[#fdfbf7] font-bold text-xl border-4 border-stone-200 shadow-md z-10">
               V
             </div>
             <div className="flex-1 border-b-2 border-stone-300 absolute top-6 left-0 w-full -z-0"></div>
            <h2 className="text-3xl font-bold text-stone-800 bg-giay-diep pr-4 pl-2 z-10">Language</h2>
          </div>
          <div className="flex gap-4">
            {[Language.EN, Language.VI].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-lg border-2 transition-all duration-200 font-merriweather font-bold text-lg
                  ${language === lang 
                    ? 'bg-red-800 border-red-900 text-[#fdfbf7] woodblock-shadow' 
                    : 'bg-white border-stone-300 text-stone-500 hover:border-stone-500 hover:bg-stone-50'
                  }
                `}
              >
                <Languages size={20} />
                <span>{lang}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Generation Action */}
        <section className="flex flex-col items-center gap-8 pt-8 border-t-2 border-dashed border-stone-300">
           {error && (
            <div className="bg-red-50 border-l-4 border-red-600 text-red-800 px-6 py-4 rounded shadow-sm flex items-center gap-3 w-full max-w-xl justify-center font-merriweather">
              <AlertTriangle size={24} />
              <span className="font-bold">{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`
              relative group overflow-hidden px-16 py-6 text-xl font-black uppercase tracking-widest transition-all duration-300 border-2
              ${isGenerating 
                ? 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed' 
                : 'bg-red-700 text-[#fdfbf7] border-red-900 woodblock-shadow hover:-translate-y-1 hover:bg-red-800'
              }
            `}
          >
             <div className="flex items-center gap-4 relative z-10">
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={24} />
                  <span>Carving Blocks...</span>
                </>
              ) : (
                <>
                  <Wand2 size={24} />
                  <span>Create Masterpiece</span>
                </>
              )}
            </div>
            {/* Texture overlay for button */}
            <div className="absolute inset-0 bg-white opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}></div>
          </button>
        </section>

        {resultImage && (
          <section className="space-y-8 pt-12 pb-12 border-t-4 border-double border-stone-800">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center border-2 border-green-900">
                    <Palette size={20} />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 font-merriweather">The Final Print</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = resultImage;
                      link.download = `dong-ho-print-${Date.now()}.png`;
                      link.click();
                    }}
                    className="flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-[#fdfbf7] px-6 py-3 rounded border-2 border-stone-900 font-bold transition-colors shadow-md"
                  >
                    <Download size={20} />
                    <span>Collect Print</span>
                  </button>
                </div>
             </div>
             
             <div className="bg-white p-4 woodblock-border shadow-2xl">
               <div className="border border-stone-200 p-2">
                <img 
                  src={resultImage} 
                  alt="Generated Infographic" 
                  className="w-full h-auto shadow-inner bg-stone-100"
                />
               </div>
             </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;