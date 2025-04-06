import mongoose from 'mongoose';

const student = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true 
  },
  password: {
    type: String,
    required: [true, 'password is required']
  }
},{timestamps: true});


student.pre("save",async function(next){
  if(!this.isModified('password'))return next();
  this.password=await bcrypt.hash(this.password,10)
})

// campare function
student.methods.comparePassword = async function( plainPassword){
  return await bcrypt.compare(plainPassword,this.password);
};

// JWT TOKEN
student.methods.generateToken=function(){
  return JWT.sign({ _id:this._id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

const Usermodel = mongoose.model('Usermodel', student);
export default Usermodel;
