const exp = require('express')
const cors = require('cors')
const {SQL} = require('./db')

const app = exp()

app.use(exp.json())
app.use(cors())

app.get('/', async (req, res)=> {
    try {
        const products = await SQL(`SELECT products.*,
        category.type,
        category.gender
        FROM products
        inner join category on category.id = products.category_id`)
        res.send(products)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.post('/', async (req, res)=> {
    try {
        const {sort} = req.body
        switch (sort) {
            case "1":
               const results = await SQL(`SELECT products.*,
               category.type,
               category.gender
               FROM products
               inner join category on category.id = products.category_id`)
               res.send(results)
                break;
            case "2":
               const results1 = await SQL(`SELECT products.*,
               category.type,
               category.gender
               FROM products
               inner join category on category.id = products.category_id
               WHERE category.gender = "male" `)
               res.send(results1)
                break;
            case "3":
                const results2 = await SQL(`SELECT products.*,
                category.type,
                category.gender
                FROM products
                inner join category on category.id = products.category_id
                WHERE category.gender = "female" `)
                res.send(results2)
            break;
            case "4":
                const results3 = await SQL(`SELECT products.*,
                category.type,
                category.gender
                FROM products
                inner join category on category.id = products.category_id
                WHERE category.type = "accessories" `)
                res.send(results3)
            break;
            case "5":
                const results4 = await SQL(`SELECT products.*,
                category.type,
                category.gender
                FROM products
                inner join category on category.id = products.category_id
                WHERE category.type = "shoes" `)
                res.send(results4)
            break;
            case "6":
                const results5 = await SQL(`SELECT products.*,
                category.type,
                category.gender
                FROM products
                inner join category on category.id = products.category_id
                WHERE category.type = "clothes" `)
                res.send(results5)
            break;
        
           
        }
       
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})



app.get('/branches', async (req, res)=> {
    try {
        const branches = await SQL(`SELECT * FROM branches`)
        res.send(branches)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/category', async (req, res)=> {
    try {
        const category = await SQL(`SELECT * FROM category`)
        res.send(category)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.post('/newproduct', async (req, res)=> {
    try {
        const {name , price, img , category_id} = req.body
        if(!name || !price || !img || !category_id ){
            return res.status(400).send({err:"missing some info"})
        }
        await SQL(`insert into products(name , price ,img, category_id)
        values("${name}" , ${price} , "${img}" , ${category_id})`)
        res.send({msg:'product added!'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/product/:productid', async (req, res)=> {
    try {
        const {productid} = req.params
        if(!productid){
            return res.status(400).send({err:"product not found!"})
        }   
        const product = await SQL(`SELECT * FROM products WHERE id = ${productid}`)
        res.send(product)         
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.post('/product/:productid', async (req, res)=> {
    try {
        const {productid} = req.params
        if(!productid){
            return res.status(400).send({err:"product not found!"})
        }   
        await SQL(`update products SET qt = qt+1 WHERE id = ${productid}`)
        res.send({msg:'product added to cart'})         
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})


app.delete('/:productid', async (req, res)=> {
    try {
        const {productid} = req.params
        if(!productid){
            return res.status(400).send({err:'product not found'})
        }
        await SQL(`update products SET qt = qt-1 WHERE id = ${productid}`)
        res.send({msg:'product deleted from cart'}) 
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.delete('/product/:productid', async (req, res)=> {
    try {
        const {productid} = req.params
        if(!productid){
            return res.status(400).send({err:'product not found'})
        }
        await SQL(`DELETE FROM products WHERE id = ${productid}`)
        res.send({msg:'product deleted.'}) 
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.get('/cart', async (req, res)=> {
    try {
        const cart = await SQL(`SELECT * FROM products WHERE qt > 0`)
        res.send(cart)         
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.put('/cleancart', async (req, res)=> {
    try {
        await SQL(`UPDATE products SET qt = 0 WHERE id > 0`)
        res.send({msg:'Payment accepted!'})         
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})

app.put('/product/:productid', async (req, res)=> {
    try {
        const {productid} = req.params
        const {price} = req.body
        if(!price ){
            return res.status(400).send({err:'missing some info'})
        }
        await SQL(`UPDATE products SET price = ${price} WHERE id = ${productid}`)
        res.send({msg:'Information updated.'})
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
})


app.listen(1000 , ()=> console.log("server run on port 1000"))