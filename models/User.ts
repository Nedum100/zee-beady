import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Add password comparison method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  console.log("Comparing Password:", candidatePassword, "Stored Hash:", this.password);
  try {
     const result = await bcrypt.compare(candidatePassword, this.password);
     console.log("Password match result:", result);
     return result;
  } catch (error){
    console.error("Error comparing password:", error);
    return false;
  }
};

// Add password hashing pre-save
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
     const hash = await bcrypt.hash(this.password, 10);
      console.log("Hashing password:", this.password, "Resulting Hash:", hash);
    this.password = hash;
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;