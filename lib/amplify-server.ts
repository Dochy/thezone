// lib/amplify-server.ts
import { runWithAmplifyServerContext } from "aws-amplify/adapter-nextjs"
import { Amplify } from "aws-amplify"
import amplifyConfig from "../amplify_outputs.json"

Amplify.configure(amplifyConfig)

export { runWithAmplifyServerContext }
