/**
 * CustomSourceAdder - Add custom job sources (RSS, JSON, HTML)
 */
import { useState } from 'react';
import type { JobSource } from '@/core/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Globe, Code, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CustomSourceAdderProps {
  customSources: JobSource[];
  onAdd: (source: JobSource) => void;
  onRemove: (sourceId: string) => void;
  onTest: (url: string, type: 'rss' | 'json' | 'html') => Promise<boolean>;
}

export function CustomSourceAdder({
  customSources,
  onAdd,
  onRemove,
  onTest,
}: CustomSourceAdderProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'rss' | 'json' | 'html'>('rss');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const success = await onTest(url, type);
      setTestResult(success ? 'success' : 'error');
      if (success) toast.success('Connection successful!');
      else toast.error('Could not fetch from this URL');
    } catch {
      setTestResult('error');
      toast.error('Test failed');
    } finally {
      setTesting(false);
    }
  };

  const handleAdd = () => {
    if (!name || !url) {
      toast.error('Please enter both name and URL');
      return;
    }
    const newSource: JobSource = {
      id: `custom-${Date.now()}`,
      name,
      url,
      type,
      enabled: true,
      category: 'Custom',
      description: `Custom ${type.toUpperCase()} source`,
    };
    onAdd(newSource);
    setName('');
    setUrl('');
    setTestResult(null);
    toast.success('Custom source added!');
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          Add Custom Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Source Type</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'rss' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('rss')}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              RSS Feed
            </Button>
            <Button
              type="button"
              variant={type === 'json' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('json')}
              className="flex-1"
            >
              <Code className="w-4 h-4 mr-2" />
              JSON API
            </Button>
            <Button
              type="button"
              variant={type === 'html' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('html')}
              className="flex-1"
            >
              <Globe className="w-4 h-4 mr-2" />
              HTML Page
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="source-name">Source Name</Label>
          <Input
            id="source-name"
            placeholder="e.g., My Company Jobs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="source-url">Endpoint URL</Label>
          <div className="flex gap-2">
            <Input
              id="source-url"
              placeholder={
                type === 'rss'
                  ? 'https://example.com/jobs.rss'
                  : type === 'json'
                    ? 'https://api.example.com/jobs'
                    : 'https://example.com/careers'
              }
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setTestResult(null);
              }}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleTest} disabled={testing || !url}>
              {testing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : testResult === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : testResult === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-600" />
              ) : (
                'Test'
              )}
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            {type === 'rss' && 'Enter the RSS feed URL for job listings'}
            {type === 'json' && 'Enter the JSON API endpoint URL'}
            {type === 'html' && 'Enter the careers page URL'}
          </p>
        </div>
        <Button onClick={handleAdd} disabled={!name || !url} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Source
        </Button>
        {customSources.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Your Custom Sources ({customSources.length})
            </h4>
            <div className="space-y-2">
              {customSources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {source.type === 'rss' && (
                      <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    )}
                    {source.type === 'json' && (
                      <Code className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    )}
                    {source.type === 'html' && (
                      <Globe className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-slate-700 truncate">{source.name}</p>
                      <p className="text-xs text-slate-500 truncate">{source.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {source.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(source.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
