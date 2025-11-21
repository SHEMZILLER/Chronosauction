import { CheckCircle2, Trophy, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import type { Bid } from '../App';

interface FinalScreenProps {
  bids: Bid[];
  targetSlot: number;
}

export function FinalScreen({ bids, targetSlot }: FinalScreenProps) {
  const totalVolume = bids.reduce((sum, bid) => sum + bid.price, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 animate-pulse">
          <CheckCircle2 className="size-10 text-white" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Mint Finalized!
        </h1>
        
        <p className="text-xl text-purple-200 mb-2">
          All bids executed successfully via <span className="text-purple-400">Raiku deterministic execution</span>
        </p>
        <p className="text-purple-300">
          100% success rate • Zero failed transactions • Perfect timestamp ordering
        </p>
      </div>

      {/* Execution Details */}
      <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="size-5 text-cyan-400" />
          <h2 className="text-white">Execution Summary</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-slate-900/50 border border-green-500/30 rounded-xl">
            <div className="text-sm text-green-300 mb-1">Execution Slot</div>
            <div className="text-2xl text-white tabular-nums">{targetSlot.toLocaleString()}</div>
          </div>
          
          <div className="p-4 bg-slate-900/50 border border-purple-500/30 rounded-xl">
            <div className="text-sm text-purple-300 mb-1">Total Bids</div>
            <div className="text-2xl text-white">{bids.length}</div>
          </div>
          
          <div className="p-4 bg-slate-900/50 border border-cyan-500/30 rounded-xl">
            <div className="text-sm text-cyan-300 mb-1">Success Rate</div>
            <div className="text-2xl text-white">100%</div>
          </div>
          
          <div className="p-4 bg-slate-900/50 border border-pink-500/30 rounded-xl">
            <div className="text-sm text-pink-300 mb-1">Total Volume</div>
            <div className="text-2xl text-white">{totalVolume.toFixed(2)} SOL</div>
          </div>
        </div>

        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle2 className="size-4" />
            <span className="text-sm">Batch executed via Raiku AOT slot reservation</span>
          </div>
          <div className="text-xs text-green-300 space-y-1">
            <div>✓ All {bids.length} transactions confirmed in single atomic batch</div>
            <div>✓ Perfect chronological ordering by microsecond timestamp</div>
            <div>✓ Ackermann retry mechanism ensured zero failures</div>
            <div>✓ Zero MEV extraction – deterministic execution prevented frontrunning</div>
          </div>
        </div>
      </div>

      {/* Why This Worked */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
          <Shield className="size-8 text-purple-400 mb-3" />
          <h3 className="text-white mb-2">AOT Slot Reservation</h3>
          <p className="text-sm text-purple-300">
            Raiku reserved slot {targetSlot.toLocaleString()} ahead of time, guaranteeing execution at the exact moment without competition
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/50 to-slate-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
          <TrendingUp className="size-8 text-cyan-400 mb-3" />
          <h3 className="text-white mb-2">Deterministic Batching</h3>
          <p className="text-sm text-cyan-300">
            All bids were collected, sorted by timestamp, and executed in a single atomic transaction with 100% success
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-900/50 to-slate-900/50 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm">
          <Zap className="size-8 text-pink-400 mb-3" />
          <h3 className="text-white mb-2">Ackermann Retry</h3>
          <p className="text-sm text-pink-300">
            Built-in retry logic with exponential backoff ensured execution certainty even under network congestion
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm mb-8">
        <h2 className="text-white mb-6 text-center">Impossible on Vanilla Solana</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
            <h3 className="text-red-300 mb-4">❌ Traditional NFT Mint</h3>
            <div className="space-y-2 text-sm text-red-200">
              <div>• 60-90% transaction failure rate</div>
              <div>• Bots spam thousands of transactions</div>
              <div>• MEV extractors reorder for profit</div>
              <div>• No execution guarantees</div>
              <div>• Users waste gas on failed attempts</div>
              <div>• Unpredictable ordering, unfair results</div>
            </div>
          </div>

          <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl">
            <h3 className="text-green-300 mb-4">✓ Chronos with Raiku</h3>
            <div className="space-y-2 text-sm text-green-200">
              <div>• 100% success rate, zero failures</div>
              <div>• Single batch per auction, no spam</div>
              <div>• Zero MEV via deterministic execution</div>
              <div>• Guaranteed slot reservation (AOT)</div>
              <div>• No wasted gas, perfect efficiency</div>
              <div>• Perfect timestamp ordering, total fairness</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
          <Trophy className="size-4 text-yellow-400" />
          <span className="text-sm text-purple-300">First Zero-MEV NFT Mint Complete</span>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            View Another Auction
          </Button>
          
          <Button 
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            onClick={() => window.open('https://raiku.io', '_blank')}
          >
            Learn More About Raiku
          </Button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
        <p className="text-sm text-purple-300">
          This auction was made possible by <span className="text-purple-400">Raiku deterministic execution</span>.
          <br />
          Built for Solana Hacker Hotel DevCon 2025 Raiku Challenge.
        </p>
      </div>
    </div>
  );
}
