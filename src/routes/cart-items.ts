// require the express module
import express from "express";
import Item from "../models/item";
// create a new Router object
const routes = express.Router();

const items: Item[] = [
    {id: 1, product: "Chicken", price: 10, quantity: 3},
    {id: 2, product: "Cereal", price: 2.99, quantity: 5},
    {id: 3, product: "Oranges", price: 3.99, quantity: 10},
    {id: 4, product: "Bread", price: 4, quantity: 1},
    {id: 5, product: "Chips", price: 2, quantity: 2},
];
let idCounter = 5;

routes.get('/cart-items', (req, res) => {
    let results = items;
    const maxPrice = req.query.maxPrice;
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize;
    if(maxPrice){
        //filter array for values <= max price
        const maxPriceNum = Number(maxPrice);
        results = results.filter(item => item.price <= maxPriceNum);
    }

    if(prefix){
        //filter array for values starting with the given prefix
        results = results.filter(item => item.product.startsWith(prefix as string));
    }

    if(pageSize){
        //filter array with amount for pageSize
        results = results.slice(0, Number(pageSize as string));
    }
    res.status(200);
    res.json(results);
});

routes.get('/cart-items/:id', (req, res) => {
    let id = Number(req.params.id);
    const item = items.find(item => item.id === id);
    if(item){
        res.status(200);
        res.json(item);
    }else{
        res.status(404);
        res.send("ID Not Found")
    }
});

routes.post('/cart-items', (req, res) => {
    let newItem: Item = req.body;
    newItem.id = idCounter += 1;
    items.push(newItem);
    res.json(newItem);
    res.status(200);
});

routes.put('/cart-items/:id', (req, res) => {
    let updatedName: Item = req.body;
    let id = Number(req.params.id);
    const index = items.findIndex(item => item.id === id);
    items[index] = updatedName;
    items[index].id = id
    res.status(200);
    res.json(items[index]);
});

routes.delete('/cart-items/:id', (req, res) => {
    let id = Number(req.params.id);
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1);
    res.status(204);
    res.json();
});
 
export default routes;