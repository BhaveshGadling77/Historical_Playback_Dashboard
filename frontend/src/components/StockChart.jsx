import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const StockChart = ({ data, selectedStocks, colors }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          stroke="#9ca3af"
          tick={{ fill: "#9ca3af" }}
          tickFormatter={(v) => v ? `${new Date(v).getMonth()+1}/${new Date(v).getDate()}` : ""}
        />
        <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#fff",
          }}
          formatter={(v) => `$${v.toFixed(2)}`}
        />
        <Legend />
        {selectedStocks.map((s, i) => (
          <Line
            key={s}
            type="monotone"
            dataKey={s}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default StockChart;
