require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base(process.env.AIRTABLE_REACT_BASE_ID);
const jobsTable = base.table('jobs');
const dutiesTable = base.table('jobs-duties');

exports.handler = async (event, context, callback) => {
  const jobsResponse = await jobsTable.select({}).firstPage();
  const dutiesResponse = await dutiesTable.select({}).firstPage();
  const duties = dutiesResponse.map((duty) => {
    return duty.fields;
  });

  const jobs = jobsResponse
    .map((job) => {
      const getDuty = duties.find((duty) => duty.jobs[0] === job.id);
      const newDuties = Object.values(getDuty);
      newDuties.shift();
      return { id: job.id, ...job.fields, duties: newDuties };
    })
    .sort((a, b) => b.order - a.order);
  return (
    null,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(jobs),
    }
  );
};
