// global.d.ts
declare global {
    var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null };
  }
  
  export {};
  