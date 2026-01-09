import { TrendingUp } from "lucide-react";

const Header = ({ totalStocks }) => (
  <div className="mb-8">
    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
      <TrendingUp className="text-blue-400" size={40} />
      Historical Stock Data Player
    </h1>
    <p className="text-gray-400">Playing through {totalStocks} stocks</p>
  </div>
);

export default Header;
