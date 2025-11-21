import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PriceChart } from './components/PriceChart';
import { BidInterface } from './components/BidInterface';
import { Leaderboard } from './components/Leaderboard';
import { FinalScreen } from './components/FinalScreen';

export interface Bid {
  id: string;
  wallet: string;
  price: number;
  timestamp: number;
  slot: number;
}

const TARGET_SLOT = 600_000_001;
const AUCTION_START_TIME = Date.now() - 120000; // Started 2 minutes ago
const AUCTION_DURATION = 300000; // 5 minutes
const BATCH_BUILD_TIME = 30000; // 30 seconds before execution
const START_PRICE = 10;
const END_PRICE = 2;

export default function App() {
  const [currentSlot, setCurrentSlot] = useState(599_999_800);
  const [currentPrice, setCurrentPrice] = useState(START_PRICE);
  const [bids, setBids] = useState<Bid[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [auctionPhase, setAuctionPhase] = useState<'active' | 'building' | 'executed'>('active');
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Simulate slot progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlot(prev => {
        if (prev < TARGET_SLOT) {
          return prev + Math.floor(Math.random() * 3) + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Calculate price based on Dutch auction
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - AUCTION_START_TIME;
      const timeRemaining = Math.max(0, AUCTION_DURATION - elapsed);
      
      setTimeRemaining(timeRemaining);

      if (elapsed >= AUCTION_DURATION + BATCH_BUILD_TIME) {
        setAuctionPhase('executed');
      } else if (elapsed >= AUCTION_DURATION) {
        setAuctionPhase('building');
      } else {
        const progress = elapsed / AUCTION_DURATION;
        const price = START_PRICE - (START_PRICE - END_PRICE) * progress;
        setCurrentPrice(Math.max(END_PRICE, price));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleConnectWallet = () => {
    const mockAddress = `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`;
    setWalletAddress(mockAddress);
    setWalletConnected(true);
  };

  const handleSubmitBid = () => {
    if (!walletConnected) return;

    const newBid: Bid = {
      id: Math.random().toString(36).substring(7),
      wallet: walletAddress,
      price: parseFloat(currentPrice.toFixed(2)),
      timestamp: Date.now(),
      slot: currentSlot
    };

    setBids(prev => [...prev, newBid].sort((a, b) => a.timestamp - b.timestamp));
  };

  if (auctionPhase === 'executed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900">
        <Header />
        <FinalScreen bids={bids} targetSlot={TARGET_SLOT} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900">
      <Header />
      
      <HeroSection 
        targetSlot={TARGET_SLOT}
        currentSlot={currentSlot}
        timeRemaining={timeRemaining}
        auctionPhase={auctionPhase}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <PriceChart 
            currentPrice={currentPrice}
            startPrice={START_PRICE}
            endPrice={END_PRICE}
            auctionStartTime={AUCTION_START_TIME}
            auctionDuration={AUCTION_DURATION}
          />
          
          <BidInterface
            currentPrice={currentPrice}
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            onConnectWallet={handleConnectWallet}
            onSubmitBid={handleSubmitBid}
            auctionPhase={auctionPhase}
          />
        </div>

        <Leaderboard bids={bids} currentWallet={walletAddress} />
      </div>
    </div>
  );
}
