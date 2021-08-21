import { Schema, Model, model, ObjectId } from 'mongoose';
import CustomerModel from './customer.model';

export enum CallState {
  RINGING = 'RINGING',
  OFFHOOK = 'OFFHOOK',
  IDLE = 'IDLE',
}

export interface ICallState {
  type: 'incoming';
  timestamp: number;
  state: CallState;
  customerId: ObjectId;
}

const CustomerSchema = new Schema<ICallState, Model<ICallState>, ICallState>({
  type: {
    type: String,
    required: true,
    default: 'incoming',
  },
  timestamp: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: [CallState.IDLE, CallState.RINGING, CallState.OFFHOOK],
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: CustomerModel.modelName,
    required: true,
    index: true,
  },
});

const CallStateModel = model<ICallState>('CallState', CustomerSchema, 'call-states');
export default CallStateModel;
