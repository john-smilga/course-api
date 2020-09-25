require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base(process.env.AIRTABLE_JAVASCRIPT_BASE_ID);
const table = base.table('store');

exports.handler = async (event, context, callback) => {
  const response = await table.select({}).firstPage();
  let data = response.map((product) => {
    delete product.fields.description;
    const id = product.id;
    const name = product.fields.name;
    const url = product.fields.image[0].url;
    const price = product.fields.price / 100;
    return { id, name, image: { url }, price };
  });
  const product = { ...data[5], price: undefined, image: undefined };

  data = [...data.splice(-4), product];

  return (
    null,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(data),
    }
  );
};
