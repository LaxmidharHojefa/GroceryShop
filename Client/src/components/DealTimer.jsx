import { useEffect, useState } from "react";

const getRemainingTime = (endTime) => {
  const total = new Date(endTime) - new Date();

  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / 1000 / 60 / 60) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

  return { days, hours, minutes, seconds };
};

const DealTimer = ({ endTime }) => {
  const [time, setTime] = useState(getRemainingTime(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex justify-between text-center text-xs text-gray-600 bg-green-50 py-2 px-4">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
        <div key={idx}>
          <p className="font-semibold">
            {Object.values(time)[idx].toString().padStart(2, "0")}
          </p>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default DealTimer;
