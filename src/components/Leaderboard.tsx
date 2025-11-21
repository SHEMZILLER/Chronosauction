import { Trophy, Clock, TrendingUp } from 'lucide-react';
import type { Bid } from '../App';

interface LeaderboardProps {
  bids: Bid[];
  currentWallet: string;
}

export function Leaderboard({ bids, currentWallet }: LeaderboardProps) {
  if (bids.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm text-center">
        <Trophy className="size-12 text-purple-400 mb-3 mx-auto opacity-50" />
        <h2 className="text-white mb-2">Bid Leaderboard</h2>
        <p className="text-purple-300">No bids yet. Be the first to participate in this zero-MEV auction!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-yellow-400" />
          <h2 className="text-white">Bid Leaderboard</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
          <TrendingUp className="size-4 text-green-400" />
          <span className="text-sm text-green-300">{bids.length} Total Bids</span>
        </div>
      </div>

      <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="text-sm text-purple-300">
          <Clock className="size-4 inline mr-1" />
          Perfect chronological ordering via <span className="text-purple-400">Raiku deterministic execution</span>
        </div>
      </div>

      <div className="space-y-2">
        {bids.map((bid, index) => (
          <div
            key={bid.id}
            className={`p-4 rounded-xl border transition-all ${
              bid.wallet === currentWallet
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/50'
                : 'bg-slate-900/30 border-purple-500/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' :
                  index === 1 ? 'bg-gray-400/20 border border-gray-400/50' :
                  index === 2 ? 'bg-orange-500/20 border border-orange-500/50' :
                  'bg-purple-500/20 border border-purple-500/30'
                }`}>
                  <span className={`text-sm ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-orange-400' :
                    'text-purple-300'
                  }`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Wallet */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm">{bid.wallet}</span>
                    {bid.wallet === currentWallet && (
                      <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-purple-300 mt-1">
                    <Clock className="size-3 inline mr-1" />
                    {new Date(bid.timestamp).toLocaleTimeString('en-US', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit',
                      fractionalSecondDigits: 3
                    })}
                  </div>
                </div>
              </div>

              {/* Price & Slot */}
              <div className="text-right">
                <div className="text-white">{bid.price.toFixed(2)} SOL</div>
                <div className="text-xs text-purple-300">Slot {bid.slot.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-center">
          <div className="text-xl text-white">{bids.length}</div>
          <div className="text-xs text-purple-300">Total Bids</div>
        </div>
        <div className="p-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-center">
          <div className="text-xl text-white">100%</div>
          <div className="text-xs text-purple-300">Success Rate</div>
        </div>
        <div className="p-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-center">
          <div className="text-xl text-white">0</div>
          <div className="text-xs text-purple-300">Failed Txs</div>
        </div>
      </div>
    </div>
  );
}
