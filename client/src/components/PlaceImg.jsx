const PlaceImg = ({ place, index = 0, className = null }) => {
  
if(!place.photos?.length) return ''  
  
if(!className) className = "w-32 h-32 rounded-bl-2xl rounded-tl-2xl object-cover"

return (
    <img
      src={place.photos[index]}
      alt="photo here"
      key={place.photos[0]}
      className={className}
    />
  );
};

export default PlaceImg;
