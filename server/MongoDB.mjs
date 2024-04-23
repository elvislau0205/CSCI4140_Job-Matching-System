import mongoose from 'mongoose';

let connectionFactory = async function () {
  const connectionString = 'mongodb://localhost:27017/JobMatchingSystem';
  const conn = await mongoose.createConnection(connectionString);

  conn.on('connected', () => console.log('connected'));
  conn.on('open', () => console.log('open'));
  conn.on('disconnected', () => console.log('disconnected'));
  conn.on('reconnected', () => console.log('reconnected'));
  conn.on('disconnecting', () => console.log('disconnecting'));
  conn.on('close', () => console.log('close'));

  const Schema = mongoose.Schema;

  const CVSchema = new Schema({
    name: String,
    education_institution: String,
    education_degree: String,
    work_experience: [{
      company_name: String,
      job_title: String, 
      dates_of_employment: String, 
      description: String
    }],
  });

  const JobSchema = new Schema({
    position_title: String,
    job_description: String
  });

  conn.model('CV', CVSchema);
  conn.model('Job', JobSchema);

  return conn;
};
connectionFactory();

export {connectionFactory}