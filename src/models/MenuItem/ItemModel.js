const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
  CategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemCategories', required: true },
  ItemName: { type: String },
  Description: { type: String },
  UnitPrice: { type: Number },
  RoomCount: { type: Number },
  BathRoomCont: { type: Number },
  GuestCount: { type: Number },
  LocationValue: { type: String },
  ItemImage: { type: String },
  Region: { type: String, Default: 'Asia' },
  ChickIn: { type: Date },
  ChickOut: { type: Date },
  CreatedDate: { type: Date, default: Date.now() },
}, { versionKey: false });
const ItemModel = mongoose.model('Item', DataSchema);
module.exports = ItemModel;
