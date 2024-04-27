import mongoose from 'mongoose';

let mongoDB = function()
{
  this.conn = connectionFactory();
  this.Schema = mongoose.Schema;
  this.CVSchema = new this.Schema({
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
  this.JobSchema = new this.Schema({
    position_title: String,
    job_description: String
  });
}

let connectionFactory = async function () 
{
  const connectionString = 'mongodb://localhost:27017/JobMatchingSystem';
  await mongoose.connect(connectionString)
};

mongoDB.prototype.addCV = async function(CV_JSON)
{
  const CV = mongoose.model('CV', this.CVSchema);
  const newCV = new CV(CV_JSON);
  newCV
  .save()
  .then((savedObject) => {
    // 上面這個savedObject就是再上兩行的newObject
    console.log("data saved is " + savedObject); // 成功儲存
  })
  .catch((e) => {
    console.log(e); // 未成功儲存
  });
}

export {mongoDB}