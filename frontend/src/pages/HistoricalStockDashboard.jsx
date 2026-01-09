import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import DateDisplay from "../components/DateDisplay";
import StockChart from "../components/StockChart";
import PlaybackControls from "../components/PlaybackControls";
import StockMetrics from "../components/StockMetrics";
import StockSelector from "../components/StockSelector";
import { STOCK_SYMBOLS, colors } from "../utils/data.js";

const HistoricalStockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);

  

  /*data loading*/

  useEffect(() => {
    const loadData = async () => {
      try {
        const loaded = {};
        const available = [];

        for (const symbol of STOCK_SYMBOLS) {
          const res = await fetch(`/data/${symbol}.json`);
          if (!res.ok) continue;

          const json = await res.json();
          const closeKey = Object.keys(json).find(k => k.includes("Close"));
          if (!closeKey) continue;

          const close = json[closeKey];
          const open = json[Object.keys(json).find(k => k.includes("Open"))] || {};
          const high = json[Object.keys(json).find(k => k.includes("High"))] || {};
          const low  = json[Object.keys(json).find(k => k.includes("Low"))] || {};
          const vol  = json[Object.keys(json).find(k => k.includes("Volume"))] || {};

          const data = Object.keys(close)
            .map(ts => ({
              date: new Date(+ts).toISOString().split("T")[0],
              close: +close[ts],
              open: +open[ts] || +close[ts],
              high: +high[ts] || +close[ts],
              low: +low[ts] || +close[ts],
              volume: +vol[ts] || 0,
            }))
            .filter(d => !isNaN(d.close))
            .sort((a,b) => a.date.localeCompare(b.date));

          if (data.length) {
            loaded[symbol] = data;
            available.push(symbol);
          }
        }

        if (!available.length) throw new Error("No stock data found");

        setStockData(loaded);
        setStocks(available);
        setSelectedStocks(available.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /*Playback Controls*/

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const max = maxDays - 1;
        if (prev >= max) {
          setIsPlaying(false);
          return max;
        }
        return prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, playbackSpeed]);

  /* helpers */

  const toggleStock = (symbol) => {
    setSelectedStocks(prev =>
      prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const maxDays = Math.max(
    ...selectedStocks.map(s => stockData[s]?.length || 0),
    0
  );

  const chartData = () => {
    const data = [];
    for (let i = 0; i <= currentIndex; i++) {
      const point = { index: i };
      selectedStocks.forEach(s => {
        if (stockData[s]?.[i]) {
          point[s] = stockData[s][i].close;
          point.date = stockData[s][i].date;
        }
      });
      data.push(point);
    }
    return data;
  };

  const getMetrics = (symbol) => {
    const d = stockData[symbol];
    if (!d || !d[currentIndex]) return null;

    const curr = d[currentIndex];
    const prev = d[currentIndex - 1] || curr;
    const change = curr.close - prev.close;

    return {
      price: curr.close,
      change,
      changePercent: (change / prev.close) * 100,
      volume: curr.volume,
    };
  };

  const currentDate =
    chartData().length > 0
      ? chartData()[chartData().length - 1].date
      : "N/A";

  /* Ui*/

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading stock data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <Header totalStocks={stocks.length} />

        <DateDisplay
          currentDate={currentDate}
          currentIndex={currentIndex}
          maxDays={maxDays}
        />

        <StockChart
          data={chartData()}
          selectedStocks={selectedStocks}
          colors={colors}
        />

        <PlaybackControls
          isPlaying={isPlaying}
          togglePlay={() => setIsPlaying(!isPlaying)}
          reset={() => setCurrentIndex(0)}
          skipEnd={() => setCurrentIndex(maxDays - 1)}
          speed={playbackSpeed}
          setSpeed={setPlaybackSpeed}
          index={currentIndex}
          setIndex={setCurrentIndex}
          maxIndex={maxDays - 1}
        />

        <StockMetrics
          stocks={selectedStocks.slice(0, 10)}
          getMetrics={getMetrics}
        />

        <StockSelector
          stocks={stocks}
          selected={selectedStocks}
          toggle={toggleStock}
          colors={colors}
        />

      </div>
    </div>
  );
};

export default HistoricalStockDashboard;
