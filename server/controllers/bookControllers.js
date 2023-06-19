import Bookings from '../models/Bookings.js'

export const bookPlace = async (req, res) => {
    const {place ,checkin, checkout, guestsNumber, 
        clientName, clientdni, clientEmail, payMethod, 
        clientPhoneNumber, price} = req.body

    const {uid} = req
    try {
      
        const book = new Bookings({
            place, client: uid, checkin, checkout, guestsNumber, clientName, 
            clientdni, clientEmail, payMethod, clientPhoneNumber, price
        })

        const bookDoc= await book.save()
        res.status(200).json(bookDoc)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const getBookedPlaces = async (req, res) => {
    
    console.log(req.uid)

    try {
        
        const books = await Bookings.find({client: req.uid}).populate('place')//populate: forma de conectar los documentos de ls bd por medio del 'ref' puesto en el modelo
        if(!books) return res.status(404).json('no bookings yet')

        return res.status(200).json(books)

    } catch (error) {
        res.status(500).json(error.message)
    }
}