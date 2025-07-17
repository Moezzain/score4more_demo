'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDocumentById, getDocumentDetailsById } from '@/lib/mockData';
import { Document, DocumentDetails } from '@/store/slices/documentsSlice';
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Calendar, 
  HardDrive, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function DocumentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;
  
  const [document, setDocument] = useState<Document | null>(null);
  const [documentDetails, setDocumentDetails] = useState<DocumentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentSection, setCurrentSection] = useState<'headers' | 'body' | 'content'>('headers');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const doc = getDocumentById(documentId);
        const details = getDocumentDetailsById(documentId, currentPage);
        
        if (!doc) {
          setError('Document not found');
          return;
        }
        
        setDocument(doc);
        setDocumentDetails(details || null);
      } catch {
        setError('Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      loadDocument();
    }
  }, [documentId, currentPage]);

  const handleDocumentPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Document Not Found</h2>
              <p className="text-muted-foreground mb-4">{error || 'The requested document could not be found.'}</p>
              <Button onClick={() => router.push('/documents')}>
                Back to Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getSectionData = () => {
    if (!documentDetails) return [];
    
    switch (currentSection) {
      case 'headers':
        return documentDetails.list.metadata.headers;
      case 'body':
        return documentDetails.list.metadata.body;
      case 'content':
        return documentDetails.list.metadata.content;
      default:
        return [];
    }
  };

  const sectionData = getSectionData();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sectionData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sectionData.slice(startIndex, endIndex);

  const handleSectionChange = (section: 'headers' | 'body' | 'content') => {
    setCurrentSection(section);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'headers':
        return <FileText className="w-4 h-4" />;
      case 'body':
        return <FileText className="w-4 h-4" />;
      case 'content':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'h1':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'h2':
        return <FileText className="w-4 h-4 text-orange-500" />;
      case 'h3':
        return <FileText className="w-4 h-4 text-yellow-500" />;
      case 'body':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'text':
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-8 h-8" />;
      case 'docx':
        return <FileText className="w-8 h-8" />;
      case 'pptx':
        return <Presentation className="w-8 h-8" />;
      case 'xlsx':
        return <FileSpreadsheet className="w-8 h-8" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={() => router.push('/documents')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        {/* Document Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground">
                {getFileIcon(document.fileType)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">{document.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(document.uploadedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3" />
                    {document.fileSize}
                  </span>
                  <span className="uppercase text-xs">{document.fileType}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Document Details */}
        {documentDetails ? (
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Document Link */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Document Link</h4>
                <a 
                  href={documentDetails.list.doc_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all flex items-center gap-1"
                >
                  {documentDetails.list.doc_link}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Document Page Navigation */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Document Pages</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Page {documentDetails.list.paging.current_page} of {documentDetails.list.paging.total_pages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentPageChange(documentDetails.list.paging.current_page - 1)}
                      disabled={documentDetails.list.paging.current_page <= 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentPageChange(documentDetails.list.paging.current_page + 1)}
                      disabled={documentDetails.list.paging.current_page >= documentDetails.list.paging.total_pages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="flex gap-2">
                {(['headers', 'body', 'content'] as const).map((section) => (
                  <Button
                    key={section}
                    variant={currentSection === section ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSectionChange(section)}
                  >
                    {getSectionIcon(section)}
                    <span className="ml-1">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                  </Button>
                ))}
              </div>

              {/* Content Display */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium flex items-center gap-2">
                    {getSectionIcon(currentSection)}
                    {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} 
                    ({sectionData.length} items)
                  </h4>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>Page {currentPage} of {totalPages}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage <= 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage >= totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {currentItems.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">
                    No {currentSection} found in this document.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentItems.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {getTypeIcon(item.type)}
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground mb-1">
                              Type: {item.type}
                            </div>
                            <div className="text-sm leading-relaxed">
                              {item.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination Info */}
              {totalPages > 1 && (
                <div className="text-center text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, sectionData.length)} of {sectionData.length} items
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Details Available</h3>
              <p className="text-muted-foreground">
                This document hasn&apos;t been parsed yet or doesn&apos;t have detailed content available.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 