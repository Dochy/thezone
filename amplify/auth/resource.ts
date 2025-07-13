import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    'custom:companyId': {
      dataType: "DateTime", 
      mutable: true 
    }, // optional custom attribute
    'custom:brandId': { 
      mutable: true,
      dataType: "DateTime", 
    },   // optional custom attribute
  },
  groups: ['CompanyAdmins', 'BrandManagers'],
});
