const ProductPj = require('../Models/ProductPj')
const User = require('../Models/User')
module.exports = {
    async create(req, res) {
        const { name, price, author, category, synopsis,year } = req.body

        const { user_id } = req.params

        const { auth } = req.headers
        

        if(user_id !== auth) return res.status(400).send({ message: 'nao autorizando'})
       
        
        try{
            const userInfo = await User.findById(user_id)
            
            const {location} = userInfo
            const latitude = location.coordinates[0]
            const longitude = location.coordinates[1]

            const setLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const createdProductPj = await ProductPj.create({name, price, user: user_id, location: setLocation, author, category, synopsis, year,  src: req.file.path })
            const populatedProductPj = await ProductPj.findById(createdProductPj._id).populate('user')
           

            return res.status(201).send(populatedProductPj)
        }catch(err){
            console.log('foi aqui')
            return res.status(400).send(err)
        }
    },

    async delete(req, res){
        

        const { productPj_id, user_id} = req.params 
        const { auth } = req.headers
       

        if(user_id !== auth) return res.status(400).send({ message: 'nao autorizando' })
       


        try{
            const deletedProduct = await ProductPj.findByIdAndDelete(productPj_id)
            return res.status(200).send({ status: "deleted", user: deletedProduct })  
        }catch (err){
            return res.status(400).send(err)
        }
    },
    async indexByUser(req, res){
        const { user_id }= req.params

        try{
            const allProductsOfAUser = await ProductPj.find({ user: user_id })
            return res.status(200).send(allProductsOfAUser)
        }catch(err){
        return res.status(400).send(err)
        }
    },
    async indexCords(req, res){
        const { latitude, longitude  } = req.query
        const maxDistance = 10000

    try{
        const allProducts = await ProductPj.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude , longitude ]
                    },
                    $maxDistance: maxDistance
                }
            }
        }).populate('user')

        return res.status(200).send(allProducts)
    }
    catch (err){
        return res.sendStatus(400).send(err)
    }
    },

    async indexAll(req, res){
        
    try{
        const allProducts = await ProductPj.find({
        }).populate('user')

        return res.status(200).send(allProducts)
    }
    catch (err){
        return res.sendStatus(400).send(err)
    }
    },

    async indexProd(req, res){
        const {product_id }= req.params

        try{
            const allProducts = await ProductPj.findById(product_id)
            return res.status(200).send(allProducts)
        }catch(err){
        return res.status(400).send(err)
        }
    }

    

}