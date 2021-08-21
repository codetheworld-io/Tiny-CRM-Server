import { Request, Response } from 'express';
import CustomerModel from '../models/customer.model';
import CallStateModel from '../models/call.state.model';
import { emitCallStateChange } from '../socket';
import moment from 'moment';

const callStateController = {
  handleNewCallState: async (req: Request, res: Response) => {
    try {
      const { phone_number: phoneNumber, state, timestamp } = req.body;
      let customer = await CustomerModel.findOne({ phoneNumber }).exec();

      if (!customer) {
        customer = await CustomerModel.create({
          phoneNumber,
          name: 'New customer',
        });
      }

      await CallStateModel.create({
        customerId: customer._id,
        timestamp,
        state,
      });

      emitCallStateChange({
        customerId: customer._id,
        customerName: customer.name,
        state,
        phone: phoneNumber,
        date: moment(timestamp).format('YYYY/MM/DD hh:mma')
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500);

      if (error instanceof Error) {
        res.json({ message: error.message });
      } else {
        res.json({ message: error });
      }
    }
  },
};

export default callStateController;
