import LocationIcon from "../assets/icons/LocationIcon"


const AddressLink = ({ children, className = null }) => {
  return (
    
        <a
        target="_blank"
        href={`https://maps.google.com/?q=${children}`}
        className={"flex gap-1 underline font-semibold text-sm my-3 mb-2 "+className}
      >
        <LocationIcon />
        {children}
      </a>
    
  )
}

export default AddressLink