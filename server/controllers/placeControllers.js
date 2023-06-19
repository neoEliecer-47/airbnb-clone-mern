import Places from "../models/Places.js"

export const createUserPlaces = async (req, res) => {
    //res.json('creating places here')//data

        const { title, 
                address, 
                perks, 
                placeDescription, 
                extraInfo, 
                checkin, 
                checkout, 
                maxguests, 
                addedPhotos,
                price           } = req.body
    
        
    
    try {
        

        const place = new Places({ owner: req.uid, title, address, 
                                   photos: addedPhotos, placeDescription, perks, extrainfo: extraInfo, 
                                   checkin, checkout, maxGuests: maxguests, price })
        
        const placeDoc = await place.save()//los metodos de mongoose son asíncronos porque requieren de la conexion a la bd

        res.status(200).json(placeDoc)

    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const getUserPlace = async (req, res) => {
    try {
        
        const {placeid} = req.params

        console.log(placeid)    
        const place = await Places.findById(placeid)
        if(!place) return res.status(404).json('alojamiento no encontrado')

        return res.json(place)

    } catch (error) {
        res.status(500).json(error.message)
    }
}




export const getUserPlaces = async (req, res) => {
    try {
        
        const places = await Places.find({owner: req.uid})

        if(!places) return res.status(404).json('este usuario no tiene sitios registrados todavia')

        return res.status(200).json(places)

    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getAllPlaces = async (req, res) => {
    try {
        const places = await Places.find().lean()
        res.json(places)
    } catch (error) {
        
    }
}



export const updateUserPlace = async (req, res) => {
    
    const {placeid} = req.params
    const {uid} = req
    const {title, address, perks, placeDescription, extraInfo, checkin, checkout, maxguests, addedPhotos, price} = req.body
    
    try {
    
    const place = await Places.findById(placeid)

    if(!place) return res.status(404).json('no existe este alojamiento')
    if(!place.owner.equals(uid)) return res.status(401).json('alojamiento no autorizado')//equals de mongoose te permito comparar un objectId de mongoose con un string
        
    const updatedPlace = place.set({title, address, photos: addedPhotos, placeDescription, perks, extrainfo: extraInfo, checkin, checkout, maxGuests: maxguests, price})
        await updatedPlace.save()

    res.status(200).json('place updated')
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getOnePlaceFromTheMain = async (req, res) => {
    
    const {placeid} = req.params
    
    try {
        
        const docPLaces = await Places.findById(placeid).lean()
        if(!docPLaces) return res.status(404).json('alojamiento no disponible')

        res.status(200).json(docPLaces)

    } catch (error) {
        
    }
}