"use client";

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { configureAmplify } from '@/lib/configure-amplify'; // ✅ Import it

configureAmplify(); // ✅ Call it right away

// ... rest of your code



import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const client = generateClient();

export default function AdminDashboard() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  const [newBusiness, setNewBusiness] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [newCampaign, setNewCampaign] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [newAsset, setNewAsset] = useState({ name: '', type: '', fileKey: '' });
  const [selectedCampaign, setSelectedCampaign] = useState('');

  useEffect(() => {
    client.models.Business.list().then(res => setBusinesses(res.data));
    client.models.Brand.list().then(res => setBrands(res.data));
    client.models.Campaign.list().then(res => setCampaigns(res.data));
    client.models.Asset.list().then(res => setAssets(res.data));
  }, []);

  const handleAdd = async (model: string, data: any) => {
    // @ts-ignore
    await client.models[model].create(data);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="businesses">
        <TabsList className="mb-6">
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="businesses">
          <Card>
            <CardHeader><CardTitle>Add Business</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input value={newBusiness} onChange={(e) => setNewBusiness(e.target.value)} placeholder="Business Name" />
              <Button onClick={() => handleAdd('Business', { name: newBusiness })}>Create Business</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands">
          <Card>
            <CardHeader><CardTitle>Add Brand</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input value={newBrand} onChange={(e) => setNewBrand(e.target.value)} placeholder="Brand Name" />
              <Select onValueChange={setSelectedBusiness} value={selectedBusiness}>
                <SelectTrigger><SelectValue placeholder="Select Business" /></SelectTrigger>
                <SelectContent>
                  {businesses.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => handleAdd('Brand', { name: newBrand, businessId: selectedBusiness })} disabled={!selectedBusiness}>
                Create Brand
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader><CardTitle>Add Campaign</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input value={newCampaign} onChange={(e) => setNewCampaign(e.target.value)} placeholder="Campaign Title" />
              <Select onValueChange={setSelectedBrand} value={selectedBrand}>
                <SelectTrigger><SelectValue placeholder="Select Brand" /></SelectTrigger>
                <SelectContent>
                  {brands.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => handleAdd('Campaign', { title: newCampaign, brandId: selectedBrand })} disabled={!selectedBrand}>
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets">
          <Card>
            <CardHeader><CardTitle>Add Asset</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} placeholder="Asset Name" />
              <Input value={newAsset.type} onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })} placeholder="Asset Type (e.g. image)" />
              <Input value={newAsset.fileKey} onChange={(e) => setNewAsset({ ...newAsset, fileKey: e.target.value })} placeholder="File Key (e.g. s3 url)" />
              <Select onValueChange={setSelectedCampaign} value={selectedCampaign}>
                <SelectTrigger><SelectValue placeholder="Select Campaign" /></SelectTrigger>
                <SelectContent>
                  {campaigns.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => handleAdd('Asset', { ...newAsset, campaignId: selectedCampaign })} disabled={!selectedCampaign}>
                Create Asset
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
