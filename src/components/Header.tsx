import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Chronos Auction</h1>
            <p className="text-xs text-purple-300">Powered by Raiku Deterministic Execution</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-purple-200">Raiku AOT Active</span>
          </div>
          
          <a 
            href="https://raiku.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Learn about Raiku →
          </a>
        </div>
      </div>
    </header>
  );
}
