// lib/configure-amplify.ts
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json'; // Adjust path if needed

export function configureAmplify() {
  Amplify.configure(outputs);
}
