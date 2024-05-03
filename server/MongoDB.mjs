import mongoose from 'mongoose';

let mongoDB = function()
{
  this.conn = connectionFactory();
  this.Schema = mongoose.Schema;
  this.CVSchema = new this.Schema({
    name: String,
    educationInstitution: String,
    educationDegree: String,
    workExperience: [{
      companyName: String,
      jobTitle: String, 
      occupationIndustry: String,
      seniority: String,
      datesOfEmployment: String, 
      description: String
    }],
    skills: [{
      skillName: String,
      skillLevel: String
    }]
  });
  this.JobSchema = new this.Schema({
    positionTitle: String,
    jobDescription: String
  });
}

let connectionFactory = async function () 
{
  const connectionString = 'mongodb://admin:YPKFeUZ6r0TfCN2R@SG-nickel-feet-3360-62484.servers.mongodirector.com:27017/admin';
  await mongoose.connect(connectionString)
};

mongoDB.prototype.addCV = async function(CV_JSON)
{
  const CV = mongoose.model('CV', this.CVSchema);
  const newCV = new CV(CV_JSON);
  newCV
  .save()
  .then((savedObject) => {
    console.log("data saved is " + savedObject);
  })
  .catch((e) => {
    console.log(e);
  });
}

mongoDB.prototype.getCV = async function(filter)
{
  const CVM = mongoose.model('CV', this.CVSchema);
  const CVResult = await CVM.find(filter).exec();
  //console.log(CVResult);
  return CVResult;
}

export {mongoDB}