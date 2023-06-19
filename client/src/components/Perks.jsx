import AutomaticIcon from "../assets/icons/AutomaticIcon";
import BookIcon from "../assets/icons/BookIcon";
import CarIcon from "../assets/icons/CarIcon";
import EntranceIcon from "../assets/icons/EntranceIcon";
import FogataIcon from "../assets/icons/FogataIcon";
import PetIcon from "../assets/icons/PetIcon";
import TvIcon from "../assets/icons/TvIcon";
import WifIcon from "../assets/icons/WifIcon";

const Perks = ({values, onChange}) => {
  
  const handleCheckboxCLick = (e) => {
   const {name, checked} = e.target
   const {perks} = values
   
   console.log(name) 
    if(checked) onChange({...values, perks: [...perks, name]})
    else onChange({ ...values, perks: [...perks.filter(selectedName => selectedName !== name)]})//retorna un nuevo array con los perks diferentes al name, en caso de que el checked sea false

    
  }
  
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-2">
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      name="wifi"  
                      onChange={handleCheckboxCLick}
                      checked={values.perks.includes('wifi')}
                    />
                    <WifIcon />
                    <span>Wifi</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      name="tv"  
                      onChange={handleCheckboxCLick}
                      checked={values.perks.includes('tv')}
                    />
                    <TvIcon />
                    <span>TV</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('parking')}
                      onChange={handleCheckboxCLick}
                      name="parking"  
                    />
                    <CarIcon />
                    <span>Lugar de estacionamiento gratuito</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('pets')}
                      onChange={handleCheckboxCLick}
                      name="pets"  
                    />
                    <PetIcon />
                    <span>Mascotas</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('private entrance')}                     
                      onChange={handleCheckboxCLick}
                      name="private entrance"  
                    />
                    <EntranceIcon />
                    <span>Entrada privada o independiente</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('aire')}
                      onChange={handleCheckboxCLick}
                      name="aire"  
                    />
                    <AutomaticIcon />
                    <span>Aire acondicionado</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 ">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('fogata')}
                      onChange={handleCheckboxCLick}
                      name="fogata"  
                    />
                    <FogataIcon />
                    <span>Fogata</span>
                  </label>
                  <label className="border p-4 flex rounded-2xl items-center cursor-pointer gap-2 max-h-[65px]">
                    <input
                      type="checkbox" 
                      checked={values.perks.includes('book')}
                      onChange={handleCheckboxCLick}
                      name="book"  
                    />
                    <BookIcon />
                    <span>biblioteca</span>
                  </label>
                </div>
  );
};

export default Perks;
