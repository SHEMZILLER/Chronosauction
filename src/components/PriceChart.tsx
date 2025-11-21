import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown } from 'lucide-react';

interface PriceChartProps {
  currentPrice: number;
  startPrice: number;
  endPrice: number;
  auctionStartTime: number;
  auctionDuration: number;
}

interface ChartData {
  time: string;
  price: number;
  timestamp: number;
}

export function PriceChart({ currentPrice, startPrice, endPrice, auctionStartTime, auctionDuration }: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - auctionStartTime;
      const secondsElapsed = Math.floor(elapsed / 1000);
      
      if (elapsed >= auctionDuration) return;

      const progress = elapsed / auctionDuration;
      const price = startPrice - (startPrice - endPrice) * progress;
      const formattedTime = `${Math.floor(secondsElapsed / 60)}:${(secondsElapsed % 60).toString().padStart(2, '0')}`;

      setChartData(prev => {
        const newData = [...prev, { time: formattedTime, price: parseFloat(price.toFixed(2)), timestamp: now }];
        return newData.slice(-60); // Keep last 60 data points
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionStartTime, auctionDuration, startPrice, endPrice]);

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Dutch Auction Price</h2>
          <p className="text-sm text-purple-300">Real-time price decay via Raiku deterministic execution</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-lg">
          <TrendingDown className="size-4 text-pink-400" />
          <span className="text-sm text-pink-300">Decaying</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-5xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
          {currentPrice.toFixed(2)} SOL
        </div>
        <div className="text-sm text-purple-300 mt-1">
          Current mint price • Started at {startPrice} SOL
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" opacity={0.2} />
            <XAxis 
              dataKey="time" 
              stroke="#a78bfa" 
              tick={{ fill: '#c4b5fd', fontSize: 12 }}
            />
            <YAxis 
              stroke="#a78bfa" 
              tick={{ fill: '#c4b5fd', fontSize: 12 }}
              domain={[endPrice - 1, startPrice + 1]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e1b4b', 
                border: '1px solid #7c3aed',
                borderRadius: '8px',
                color: '#e9d5ff'
              }}
              formatter={(value: number) => [`${value.toFixed(2)} SOL`, 'Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#a855f7" 
              strokeWidth={3}
              fill="url(#priceGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="text-xs text-purple-300 mb-1">Algorithm</div>
        <div className="text-sm text-white">
          Price(t) = {startPrice} - ({startPrice - endPrice}) × (t / {auctionDuration / 60000}min)
        </div>
      </div>
    </div>
  );
}
