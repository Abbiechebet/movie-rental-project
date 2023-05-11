import { Schema, model, Types, Query} from "mongoose"


const MovieSchema = new Schema({
  producer: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  producerId: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

MovieSchema.pre(/^find/, function (next){
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }
  next()
})

export default model('MovieGenre', MovieSchema)