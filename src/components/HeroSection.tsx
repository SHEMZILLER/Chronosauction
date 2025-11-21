import { Clock, Zap, Shield, TrendingDown } from 'lucide-react';

interface HeroSectionProps {
  targetSlot: number;
  currentSlot: number;
  timeRemaining: number;
  auctionPhase: 'active' | 'building' | 'executed';
}

export function HeroSection({ targetSlot, currentSlot, timeRemaining, auctionPhase }: HeroSectionProps) {
  const slotsRemaining = targetSlot - currentSlot;
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div className="relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
          <Shield className="size-4 text-purple-400" />
          <span className="text-sm text-purple-300">First Zero-MEV NFT Mint on Solana</span>
        </div>

        <h1 className="text-5xl sm:text-7xl mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Chronos Auction
        </h1>
        
        <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto">
          The first truly fair Dutch + batch NFT mint using <span className="text-purple-400">Raiku deterministic execution</span>.
          100% success rate. Perfect ordering. Zero failed transactions.
        </p>

        {/* Main countdown */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
            {auctionPhase === 'building' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-cyan-400">
                  <Zap className="size-5 animate-pulse" />
                  <span className="text-sm uppercase tracking-wider">Building Raiku Batch</span>
                </div>
                <div className="text-4xl text-white">
                  Preparing deterministic execution...
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm text-purple-300 mb-2 uppercase tracking-wider">Reserved Slot via Raiku AOT</div>
                <div className="text-6xl sm:text-7xl mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
                  {targetSlot.toLocaleString()}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                    <div className="text-2xl text-white tabular-nums">{minutes.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-purple-300 uppercase">Minutes</div>
                  </div>
                  <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                    <div className="text-2xl text-white tabular-nums">{seconds.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-purple-300 uppercase">Seconds</div>
                  </div>
                  <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                    <div className="text-2xl text-white tabular-nums">{currentSlot.toLocaleString()}</div>
                    <div className="text-xs text-purple-300 uppercase">Current Slot</div>
                  </div>
                  <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-4">
                    <div className="text-2xl text-white tabular-nums">{slotsRemaining.toLocaleString()}</div>
                    <div className="text-xs text-purple-300 uppercase">Slots Left</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-900/30 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
            <Clock className="size-8 text-purple-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">AOT Slot Reservation</h3>
            <p className="text-sm text-purple-300">Guaranteed execution at exact slot number</p>
          </div>
          
          <div className="bg-slate-900/30 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
            <Shield className="size-8 text-cyan-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Deterministic Batching</h3>
            <p className="text-sm text-purple-300">Perfect timestamp ordering, 100% success</p>
          </div>
          
          <div className="bg-slate-900/30 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
            <TrendingDown className="size-8 text-pink-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Dutch Auction</h3>
            <p className="text-sm text-purple-300">Fair price discovery for all participants</p>
          </div>
        </div>
      </div>
    </div>
  );
}
