  "use client";

import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
//import { generateClient } from "aws-amplify/data";
//import type { Schema } from "@/amplify/data/resource";

//import "./../app/app.css";
//import "@aws-amplify/ui-react/styles.css";

import Link from "next/link";
import { Button } from "@/components/ui/button"

import outputs from "@/amplify_outputs.json";

//import { useAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);
//onst client = generateClient<Schema>();

export default function Page() {
  
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button asChild>
        <Link href="/login">Log In</Link>
      </Button>
    </main>
  );
}
