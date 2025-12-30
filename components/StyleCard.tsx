
import React from 'react';
import { InfographicStyle } from '../types';
import * as LucideIcons from 'lucide-react';

interface StyleCardProps {
  style: InfographicStyle;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect }) => {
  const IconComponent = (LucideIcons as any)[style.icon] || LucideIcons.HelpCircle;

  return (
    <div
      onClick={() => onSelect(style.id)}
      className={`
        cursor-pointer rounded-lg p-5 border-2 transition-all duration-300 h-full flex flex-col gap-3 relative
        bg-[#fdfbf7]
        ${isSelected 
          ? 'border-red-700 shadow-[4px_4px_0px_0px_rgba(185,28,28,1)] translate-y-[-2px]' 
          : 'border-stone-300 hover:border-stone-500 hover:shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)]'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 text-red-700">
           <LucideIcons.CheckCircle2 size={20} fill="#fdfbf7" />
        </div>
      )}
      
      <div className={`
        p-3 rounded-md w-fit border-2
        ${isSelected 
          ? 'bg-red-50 border-red-200 text-red-800' 
          : 'bg-stone-100 border-stone-200 text-stone-600'
        }
      `}>
        <IconComponent size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className={`font-serif font-bold text-lg mb-1 ${isSelected ? 'text-red-900' : 'text-stone-900'}`}>
          {style.name}
        </h3>
        <p className="text-sm text-stone-500 font-serif leading-relaxed italic border-t border-stone-100 pt-2">
          {style.description}
        </p>
      </div>
    </div>
  );
};

export default StyleCard;
