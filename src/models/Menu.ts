import { Schema, model, models } from 'mongoose';

const menuSchema = new Schema({
  label: { type: String, required: true },
  ref: { type: String, required: true },
  icon: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  textColor: { type: String, required: true },
});

const Menu = models.Menu || model('Menu', menuSchema);

export default Menu;
