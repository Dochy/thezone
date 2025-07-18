import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

export const schema = a.schema({

  Business: a.model({
    name: a.string().required(),
    brands: a.hasMany('Brand', 'businessId')
  }).authorization(allow => [
    allow.group('Admin'),
    allow.group('User'),
  ]),
  
  Brand: a.model({
    name: a.string().required(),
    businessId: a.id(),
    business: a.belongsTo('Business','businessId'),
    campaigns: a.hasMany('Campaign','brandId'),
  }).authorization(allow => [
    allow.group('Admin'),
    allow.group('User'),
  ]),

  Campaign: a.model({
    title: a.string().required(),
    brandId: a.id(),
    brand: a.belongsTo('Brand','brandId'),
    assets: a.hasMany('Asset','campaignId'),
  }).authorization(allow => [
    allow.group('Admin'),
    allow.group('User'),
  ]),

  Asset: a.model({
    name: a.string().required(),
    type: a.string(),
    fileKey: a.string(),
    campaignId: a.id(),
    campaign: a.belongsTo('Campaign','campaignId'),
  }).authorization(allow => [
    allow.group('Admin'),
    allow.group('User'),
  ]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
    //defaultAuthorizationMode: 'apiKey',
    //apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
