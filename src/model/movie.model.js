import { Schema, model, Types, Query} from "mongoose"


const MovieSchema = new Schema({
  creator: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorId: String,
  status: {
    type:String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  genre: {
    type: String,
    required: true
  },
  startDate: Date,
  endDate: Date
},{
  timestamps: true
})

MovieSchema.pre(/^find/, function (next){
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }
  next()
})

export default model('MovieGenre', MovieSchema)