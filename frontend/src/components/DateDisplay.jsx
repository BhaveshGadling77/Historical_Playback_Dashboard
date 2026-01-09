const DateDisplay = ({ currentDate, currentIndex, maxDays }) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-2">Current Date</p>
      <p className="text-3xl font-bold text-blue-400">{currentDate}</p>
      <p className="text-gray-500 text-sm mt-2">
        Day {currentIndex + 1} of {maxDays}
      </p>
    </div>
  </div>
);

export default DateDisplay;
