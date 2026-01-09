const StockSelector = ({ stocks, selected, toggle, colors }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
    <h2 className="text-xl font-bold mb-4">Select Stocks</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
      {stocks.map((s) => (
        <button
          key={s}
          onClick={() => toggle(s)}
          className="p-3 rounded-lg font-semibold transition hover:cursor-pointer bg-gray-700 hover:bg-gray-600"
          style={
            selected.includes(s)
              ? { backgroundColor: colors[selected.indexOf(s) % colors.length] }
              : {}
          }
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

export default StockSelector;
