'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentDetailsByPage } from '@/store/slices/documentsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Calendar, 
  HardDrive, 
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export function DocumentDetails() {
  const dispatch = useAppDispatch();
  const { currentDocument, currentDocumentDetails } = useAppSelector(
    (state) => state.documents
  );

  const [currentSection, setCurrentSection] = useState<'headers' | 'body' | 'content'>('headers');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch document details when page changes
  useEffect(() => {
    if (currentDocument) {
      dispatch(getDocumentDetailsByPage({ 
        documentId: currentDocument.id, 
        page: currentPage 
      }));
    }
  }, [currentDocument, currentPage, dispatch]);

  if (!currentDocument || !currentDocumentDetails) {
    return null;
  }

  const { list } = currentDocumentDetails;
  const { metadata, paging } = list;

  const getSectionData = () => {
    switch (currentSection) {
      case 'headers':
        return metadata.headers;
      case 'body':
        return metadata.body;
      case 'content':
        return metadata.content;
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

  const handleDocumentPageChange = (page: number) => {
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

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document Details
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {currentDocument.title}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(currentDocument.uploadedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            {currentDocument.fileSize}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Document Link */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Document Link</h4>
          <a 
            href={list.doc_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all flex items-center gap-1"
          >
            {list.doc_link}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Document Page Navigation */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Document Pages</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {paging.current_page} of {paging.total_pages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDocumentPageChange(paging.current_page - 1)}
                disabled={paging.current_page <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDocumentPageChange(paging.current_page + 1)}
                disabled={paging.current_page >= paging.total_pages}
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
  );
} 