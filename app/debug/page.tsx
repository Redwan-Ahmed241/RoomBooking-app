"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function DebugPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Environment Debug</h1>
          <p className="text-gray-600">Check your environment variable configuration</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Environment Variables Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <code className="text-sm">NEXT_PUBLIC_SUPABASE_URL</code>
                  <p className="text-xs text-gray-500 mt-1">Your Supabase project URL</p>
                </div>
                <div className="flex items-center gap-2">
                  {supabaseUrl ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Set</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <Badge variant="destructive">Missing</Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <code className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                  <p className="text-xs text-gray-500 mt-1">Your Supabase anonymous key</p>
                </div>
                <div className="flex items-center gap-2">
                  {supabaseKey ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Set</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <Badge variant="destructive">Missing</Badge>
                    </>
                  )}
                </div>
              </div>

              {supabaseUrl && (
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Current URL:</strong> {supabaseUrl.substring(0, 30)}...
                  </p>
                </div>
              )}

              {supabaseKey && (
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Key starts with:</strong> {supabaseKey.substring(0, 20)}...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-medium mb-2">1. Create .env.local file</h3>
                  <code className="text-sm bg-white p-2 rounded block">touch .env.local</code>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-medium mb-2">2. Add your Supabase credentials</h3>
                  <code className="text-sm bg-white p-2 rounded block whitespace-pre">
                    {`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
                  </code>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                  <h3 className="font-medium mb-2">3. Restart your development server</h3>
                  <code className="text-sm bg-white p-2 rounded block">npm run dev</code>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Make sure your .env.local file is in the root directory (same level as
                    package.json) and restart your development server after making changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
