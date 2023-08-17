import React from "react";

const Rating = ({ rating }: any) => {
  // const [rating, setRating] = useState(0);

  // const handleStarClick = (value) => {
  //   setRating(value);
  // };

  return (
    <div>
      {/* <p>Rating: {rating}</p> */}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`cursor-pointer text-2xl ${
              value <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            //   onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
