export const Overview = ({ usage = 24, limit = 1000 }) => {
  const usagePercentage = (usage / limit) * 100;

  return (
    <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">CURRENT PLAN</span>
        <button className="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded">
          Manage Plan
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4">Researcher</h2>
      <div>
        <span className="text-sm font-medium">API Limit</span>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
          <div 
            className="bg-white h-2 rounded-full" 
            style={{width: `${usagePercentage}%`}}
          ></div>
        </div>
        <span className="text-sm mt-1 inline-block">
          {usage} / {limit} Requests
        </span>
      </div>
    </div>
  );
}; 