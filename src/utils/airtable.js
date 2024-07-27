import Airtable from 'airtable';

Airtable.configure({
  apiKey: 'patKZS22VdVr3V1UN.0f79392385afe66bc56f8ece8b0b528068c587f26d0cc8aeadd7600639f48656'
});

const base = Airtable.base('appNrQJQPZrmdWIww.');

// Create a new record in Airtable
export async function createRecord(fields) {
  const createdRecord = await base('Files').create([
    {
      fields,
    },
  ]);
  return createdRecord;
}