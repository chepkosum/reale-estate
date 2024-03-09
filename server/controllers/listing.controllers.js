import Listing from "../models/listing.models.js"
import { errorHandler } from "../utils/error.js";


// controller for creating a list
export const createListing = async (req, res, next) =>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}




//controller for deleting a user listing 

export const deleteListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404, 'Listing not found!'));
    }
    if(req.user.id !==listing.userRef.toString()){
        return next(errorHandler(401, 'You can only delete your own listing'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
}




// Update listing controller

export const updateListing = async (req, res, next) =>{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404,'Listing not foud!'));
    }
    if(req.user.id.toString() !==listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if (!updatedListing) {
            // Handle the case where the update did not succeed
            return next(errorHandler(500, 'Failed to update the listing.'));
        }
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
}


//Route for get each listing

export const getListing = async (req,res,next) =>{
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found'));
        }
        res.status(200).json(listing);
        
    } catch (error) {
        next(error);
    }
};