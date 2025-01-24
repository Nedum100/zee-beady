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
  console.log("Comparing passwords:");
  console.log("Candidate password:", candidatePassword);
  console.log("Stored hash:", this.password);
  
  try {
    const isValid = await bcrypt.compare(candidatePassword, this.password);
    console.log("Password comparison result:", isValid);
    return isValid;
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
};

// Pre-save hook for password hashing
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    console.log("Hashing new password");
    const hash = await bcrypt.hash(this.password, 10);
    console.log("Generated hash:", hash);
    this.password = hash;
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;