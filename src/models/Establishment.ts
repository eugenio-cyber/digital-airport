import { Schema, model, models } from 'mongoose';

const establishmentSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  segments: {
    type: [String],
    enum: ['restaurant', 'store', 'service'],
    required: true,
  },
  serviceCategories: { type: [String], required: true },
  address: { type: String, required: true },
  openingHours: {
    type: Object,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        if (value.toString().length > 11 || value.toString().length < 8) {
          return false;
        }
        return true;
      },
      message: 'Wrong phone number',
    },
  },
});

const Establishment =
  models.Establishment || model('Establishment', establishmentSchema);

export default Establishment;
