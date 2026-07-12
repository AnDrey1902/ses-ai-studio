import React from 'react';
import { useApp } from '../../context/AppContext';

export const Logo: React.FC<{ className?: string; onClick?: () => void }> = ({ className = '', onClick }) => {
  const { setView, tr } = useApp();

  const handleClick = () => {
    if (onClick) onClick();
    else setView('home');
  };

  // Two-tone wordmark: first part black, remainder dark green.
  // Split at the space for two-word brands (EN "POWER SUPPLY"),
  // otherwise after the "ЕНЕРГО"/"ЭНЕРГО" prefix (6 chars) for the compounds.
  const brand = tr('logo_brand_tag');
  const splitAt = brand.includes(' ') ? brand.indexOf(' ') : 6;
  const brandFirst = brand.slice(0, splitAt);
  const brandSecond = brand.slice(splitAt);

  return (
    <div 
      onClick={handleClick}
      className={`flex items-center gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* Badge Monogram */}
      <div className="relative flex items-center justify-center bg-[#07140F] px-2.5 py-1 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-105">
        <span className="font-extrabold text-2xl tracking-tighter leading-none flex items-center">
          <span className="text-[#22C55E] drop-shadow-[0_1px_2px_rgba(34,197,94,0.3)]">G</span>
          <span className="text-white -ml-0.5">E</span>
        </span>
      </div>

      {/* Brand Typography — Sora (hero display face), all caps, two-tone */}
      <div className="flex flex-col justify-center leading-none">
        <span className="font-display font-extrabold tracking-tight text-base md:text-lg uppercase">
          <span className="text-[#07140F]">{brandFirst}</span>
          <span className="text-emerald-deep">{brandSecond}</span>
        </span>
      </div>
    </div>
  );
};
