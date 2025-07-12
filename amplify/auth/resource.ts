import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true, // or username if you prefer
  },
  userAttributes: {
    preferred_username: true, // optional
    custom: {
      companyId: 'String',     // custom attribute for company-level scoping (optional)
      brandId: 'String',       // custom attribute for brand-level scoping (optional)
    },
  },
  groups: ['CompanyAdmins', 'BrandManagers'],
});
