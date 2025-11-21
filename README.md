
  # Chronos Auction 
  View live app The original project is available at https://www.figma.com/design/N3rZjafPdz6FbjwAV3lbcv/Chronos-Auction-Submission.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
#Chronos Auction
#Zero-MEV, Truly Fair, Real-Time Dutch + Batch NFT Mint Powered by Raiku Deterministic Execution


#The Problem Everyone Hates
Every NFT mint on Solana today is a lottery:

Bots snipe the first slots
90–99 % of normal user transactions fail and waste priority fees
Snipers front-run the real community
Raffles are gamed, FCFS is impossible, Dutch auctions still get botted
→ Collectors lose money and trust, creators lose reputation.
The Vision: A Mint That Is Mathematically Fair
Chronos Auction is the first NFT minting primitive that is 100 % fair, 100 % successful, and 100 % bot-proof, because the entire mint happens inside one (or a deterministic sequence of) Raiku-reserved slots with perfect ordering and guaranteed execution.

No more failed transactions.
No more MEV.
No more rage.

#How It Works (Only Possible with Raiku)
Creator uses Raiku’s Ahead-Of-Time (AOT) reservation to lock one or more exact future slots (e.g. slot 600_420_069) 2–48 hours in advance for the mint.
Users simply connect their wallet on the Chronos dApp and click “Join Mint”.
→ They sign a single off-chain message containing their max price willingness.
→ Client timestamp + on-chain nonce prevents replay attacks.
All bids are collected in a merkle-ized off-chain order book.
30–60 seconds before the reserved slot, the Chronos sequencer builds ONE giant batched transaction containing every single mint instruction, ordered strictly by user submission timestamp (earliest = cheapest & first NFT ID).
The batch is submitted with Raiku’s AOT guarantee + Ackermann Node retry logic.
→ Raiku ensures the transaction lands exactly in the reserved slot(s) no matter what.
→ If the batch is too big, JIT reservations automatically spill into the next guaranteed slots.
A real-time Dutch decay curve is calculated inside the batch using the exact reserved slot time as the anchor → the earlier you joined, the lower price you pay.
Mint finalizes in 1–3 slots. Every single user gets their NFT. Zero failures. Instant reveal.
Why This Is Literally Impossible Without Raiku
Vanilla Solana: no way to guarantee a batch lands in a specific slot or in perfect user-defined order.
Vanilla Solana: retries are on the user; 95 %+ of txs fail under congestion.
Vanilla Solana: ordering is decided by tip auction, not fairness.
Raiku’s deterministic execution, AOT/JIT reservations, and Ackermann Node are the only primitives that make Chronos Auction possible.
