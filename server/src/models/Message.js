const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    
    members: {
      type: Array,
      require: true,
    },
    senderName:{
        type: Array,
    },
    messages:[{
      sender: {
        type: String,
        require: true,
      },
      text:{
          type: String,
          required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
      // { timestamps: true }
  }]
  },
  { timestamps: true }
);


MessageSchema.methods.addmap = async function(sender, text){
  try{
    // console.log("HELLO");
    this.messages = this.messages.concat({sender, text});
    await this.save();

    return this.messages;
  }catch(e){
    console.log("MEssage ERROR", e);
  }
}









const Message = new   mongoose.model("Message", MessageSchema);

module.exports = Message;