import { Document, model, models, Schema } from 'mongoose';

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // referance to user
  action: string;
  question: Schema.Types.ObjectId; // referance to question
  answer: Schema.Types.ObjectId; // referance to answer
  tags: Schema.Types.ObjectId[]; // referance to tags
  createdAt: Date;
}

const InteractionSchema = new Schema<IInteraction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;
