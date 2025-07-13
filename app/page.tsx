  "use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Page() {
  const { signOut } = useAuthenticator();

  
  return (
    <main>
      <h1 className="text-5xl font-bold underline">Hello world!</h1>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
