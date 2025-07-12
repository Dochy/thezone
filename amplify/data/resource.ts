import { defineData, defineSchema } from '@aws-amplify/backend';

export const data = defineData({
  schema: defineSchema({
    models: {
      Company: {
        fields: {
          id: 'ID',
          name: 'String',
          brands: {
            type: ['Brand'],
            isArray: true,
            association: { connectionType: 'HAS_MANY', associatedWith: 'companyId' },
          },
        },
        authRules: [
          { allow: 'groups', groups: ['CompanyAdmins'], operations: ['create', 'read', 'update', 'delete'] },
        ],
      },

      Brand: {
        fields: {
          id: 'ID',
          name: 'String',
          companyId: 'ID',
          campaigns: {
            type: ['Campaign'],
            isArray: true,
            association: { connectionType: 'HAS_MANY', associatedWith: 'brandId' },
          },
        },
        authRules: [
          { allow: 'groups', groups: ['CompanyAdmins'], operations: ['create', 'read', 'update', 'delete'] },
          { allow: 'groups', groups: ['BrandManagers'], operations: ['read'] }, // limited access
        ],
      },

      Campaign: {
        fields: {
          id: 'ID',
          name: 'String',
          description: 'String',
          mediaUrls: ['String'], // S3 URLs or keys
          brandId: 'ID',
          createdAt: 'AWSDateTime',
        },
        authRules: [
          { allow: 'groups', groups: ['CompanyAdmins'], operations: ['create', 'read', 'update', 'delete'] },
          { allow: 'groups', groups: ['BrandManagers'], operations: ['create', 'read', 'update'] },
        ],
      },
    },
  }),
});
