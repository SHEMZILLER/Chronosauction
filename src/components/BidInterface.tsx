import { Wallet, Send, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface BidInterfaceProps {
  currentPrice: number;
  walletConnected: boolean;
  walletAddress: string;
  onConnectWallet: () => void;
  onSubmitBid: () => void;
  auctionPhase: 'active' | 'building' | 'executed';
}

export function BidInterface({ 
  currentPrice, 
  walletConnected, 
  walletAddress, 
  onConnectWallet, 
  onSubmitBid,
  auctionPhase 
}: BidInterfaceProps) {
  const [bidSubmitted, setBidSubmitted] = useState(false);

  const handleSubmitBid = () => {
    onSubmitBid();
    setBidSubmitted(true);
    setTimeout(() => setBidSubmitted(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="size-5 text-cyan-400" />
        <h2 className="text-white">Submit Your Bid</h2>
      </div>

      {/* Wallet Connection */}
      {!walletConnected ? (
        <div className="space-y-4">
          <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
            <Wallet className="size-12 text-purple-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Connect Wallet to Participate</h3>
            <p className="text-sm text-purple-300 mb-4">
              Your bid will be recorded with microsecond timestamp precision for perfect ordering
            </p>
            <Button 
              onClick={onConnectWallet}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Wallet className="size-4 mr-2" />
              Connect Phantom Wallet
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <CheckCircle2 className="size-4 text-green-400" />
              <span>Guaranteed execution via Raiku AOT</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <CheckCircle2 className="size-4 text-green-400" />
              <span>100% success rate with deterministic batching</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <CheckCircle2 className="size-4 text-green-400" />
              <span>Perfect timestamp ordering, no MEV</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Wallet Info */}
          <div className="p-4 bg-slate-900/50 border border-purple-500/20 rounded-lg">
            <div className="text-xs text-purple-300 mb-1">Connected Wallet</div>
            <div className="text-sm text-white font-mono">{walletAddress}</div>
          </div>

          {/* Bid Amount */}
          <div className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl">
            <div className="text-sm text-purple-300 mb-2">Your Bid Amount</div>
            <div className="text-4xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tabular-nums mb-2">
              {currentPrice.toFixed(2)} SOL
            </div>
            <div className="text-xs text-purple-300">Current Dutch auction price</div>
          </div>

          {/* Bid Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <span className="text-sm text-purple-300">Mint Quantity</span>
              <span className="text-white">1 NFT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-purple-500/20 rounded-lg">
              <span className="text-sm text-purple-300">Network Fee</span>
              <span className="text-white">0.000005 SOL</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <span className="text-sm text-purple-300">Total Cost</span>
              <span className="text-white">{(currentPrice + 0.000005).toFixed(6)} SOL</span>
            </div>
          </div>

          {/* Submit Button */}
          {auctionPhase === 'building' ? (
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <Zap className="size-4 animate-pulse" />
                <span className="text-sm">Building Raiku Batch</span>
              </div>
              <p className="text-xs text-cyan-300">Your bid has been recorded and will execute in the batch</p>
            </div>
          ) : (
            <Button 
              onClick={handleSubmitBid}
              disabled={bidSubmitted}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {bidSubmitted ? (
                <>
                  <CheckCircle2 className="size-4 mr-2" />
                  Bid Recorded!
                </>
              ) : (
                <>
                  <Send className="size-4 mr-2" />
                  Submit Bid @ {currentPrice.toFixed(2)} SOL
                </>
              )}
            </Button>
          )}

          {bidSubmitted && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <CheckCircle2 className="size-4" />
                <span className="text-sm">Bid submitted successfully!</span>
              </div>
              <p className="text-xs text-green-300">
                Timestamp: {new Date().toISOString()}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="text-xs text-purple-300 space-y-1">
              <div>✓ Your bid is timestamped with microsecond precision</div>
              <div>✓ All bids will execute via Raiku deterministic execution</div>
              <div>✓ Ackermann retry ensures 100% success rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
