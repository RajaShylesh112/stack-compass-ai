'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CompareStacksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Compare Technology Stacks</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Compare different technology stacks side by side
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Stack comparison feature coming soon!
              </p>
              <Button asChild>
                <Link href="/ai-recommendations">
                  Get AI Recommendations Instead
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}