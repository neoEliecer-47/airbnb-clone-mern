import { Router } from "express";
import { createUserPlaces, getUserPlaces, getUserPlace, updateUserPlace, getAllPlaces, getOnePlaceFromTheMain } from "../controllers/placeControllers.js";
import { requireUserToken } from "../middlewares/requireUserToken.js";



//GET           /api/v1/links           all links
//GET           /api/v1/links/:id       single link    
//POST          /api/v1/links           create link
//PATCH/PUT     /api/v1/links/:id       update link
//DELETE        /api/v1/links/:id       remove link

//----------------------------------------------------



const router = Router()

router.get("/all-places", getAllPlaces)//get all the user´s places only
router.get("/places/:placeid", getOnePlaceFromTheMain)
router.get("/get-place/:placeid", requireUserToken, getUserPlace)
router.get("/get-places", requireUserToken, getUserPlaces)
router.post("/new-places", requireUserToken, createUserPlaces)
router.patch("/update-place/:placeid", requireUserToken, updateUserPlace)

export default router