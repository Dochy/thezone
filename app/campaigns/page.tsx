'use client';

import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listCampaigns } from '@/graphql/queries'; // adjust if your path differs
import awsconfig from '@/amplifyconfiguration.json';

Amplify.configure(awsconfig);

const client = generateClient();

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const user = await Auth.currentAuthenticatedUser();
        const brandId = user.signInUserSession.idToken.payload['custom:brandId'];

        if (!brandId) {
          throw new Error('User does not have a brandId assigned.');
        }

        const result = await client.graphql({
          query: listCampaigns,
          variables: {
            filter: { brandId: { eq: brandId } },
          },
        });

        const items = result.data?.listCampaigns?.items ?? [];
        setCampaigns(items);
      } catch (err: any) {
        console.error('Error fetching campaigns:', err);
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>

      {loading && <p>Loading campaigns...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && campaigns.length === 0 && (
        <p>No campaigns found for your brand.</p>
      )}

      <ul className="space-y-4">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{campaign.name}</h2>
            <p className="text-sm text-gray-600">{campaign.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
