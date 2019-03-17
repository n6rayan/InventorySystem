import * as mongoose from 'mongoose';

interface Item extends mongoose.Document {
    _id: string,
    itemName: string,
    description?: string,
    price: number
}

const ItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true }
});

const Item = mongoose.model<Item>('Item', ItemSchema);
export default Item;