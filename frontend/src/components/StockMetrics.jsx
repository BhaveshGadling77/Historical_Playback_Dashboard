import { TrendingUp, TrendingDown } from "lucide-react";

const StockMetrics = ({ stocks, getMetrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
    {stocks.map((s) => {
      const m = getMetrics(s);
      if (!m) return null;

      return (
        <div key={s} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold">{s}</h3>
            {m.change >= 0 ? (
              <TrendingUp className="text-green-400" />
            ) : (
              <TrendingDown className="text-red-400" />
            )}
          </div>
          <div className="text-2xl font-bold">${m.price.toFixed(2)}</div>
          <div className={m.change >= 0 ? "text-green-400" : "text-red-400"}>
            {m.change.toFixed(2)} ({m.changePercent.toFixed(2)}%)
          </div>
        </div>
      );
    })}
  </div>
);

export default StockMetrics;
