import { Schema, Model, model } from 'mongoose';

export interface ICustomer {
  name: string;
  phoneNumber: string;
}

const CustomerSchema = new Schema<ICustomer, Model<ICustomer>, ICustomer>({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const CustomerModel = model<ICustomer>('Customer', CustomerSchema, 'customers');
export default CustomerModel;
