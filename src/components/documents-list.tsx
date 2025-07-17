'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentsList } from '@/store/slices/documentsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Calendar, 
  HardDrive, 
  CheckCircle, 
  Clock, 
  Pause,
  BookOpen,
  File,
  FileSpreadsheet,
  Presentation
} from 'lucide-react';
import Link from 'next/link';

export function DocumentsList() {
  const dispatch = useAppDispatch();
  const { documents, loading, paginationLoading, error, pagination } = useAppSelector(
    (state) => state.documents
  );

  const [nextLoading, setNextLoading] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);

  useEffect(() => {
    dispatch(getDocumentsList({ page: 1, limit: 5 }));
  }, [dispatch]);

  const handleLoadNextPage = () => {
    console.log('Next page clicked. Current page:', pagination.page, 'Total pages:', pagination.totalPages);
    if (pagination.page < pagination.totalPages) {
      console.log('Loading next page:', pagination.page + 1);
      setNextLoading(true);
      dispatch(getDocumentsList({ page: pagination.page + 1, limit: pagination.limit }));
    } else {
      console.log('Already on last page');
    }
  };

  const handleLoadPreviousPage = () => {
    console.log('Previous page clicked. Current page:', pagination.page);
    if (pagination.page > 1) {
      console.log('Loading previous page:', pagination.page - 1);
      setPrevLoading(true);
      dispatch(getDocumentsList({ page: pagination.page - 1, limit: pagination.limit }));
    } else {
      console.log('Already on first page');
    }
  };

  // Reset loading states when pagination completes
  useEffect(() => {
    if (!paginationLoading) {
      setNextLoading(false);
      setPrevLoading(false);
    }
  }, [paginationLoading]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'parsed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'parsing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiting_queue':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'parsed':
        return <CheckCircle className="w-3 h-3" />;
      case 'parsing':
        return <Clock className="w-3 h-3" />;
      case 'waiting_queue':
        return <Pause className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'docx':
        return <FileText className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'pptx':
        return <Presentation className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <File className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-3 sm:p-4 border border-red-200 rounded-lg mx-4 sm:mx-0">
        <p className="text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Documents Library</span>
            <span className="sm:hidden">Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total documents)
            </div>
            <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadPreviousPage}
                disabled={pagination.page <= 1 || prevLoading || nextLoading}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                {prevLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                ) : (
                  'Previous'
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadNextPage}
                disabled={pagination.page >= pagination.totalPages || nextLoading || prevLoading}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                {nextLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </div>

          {/* Documents List */}
          {documents.length === 0 ? (
            <div className="text-center p-6 sm:p-8 border-2 border-dashed border-gray-300 rounded-lg">
              <File className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium mb-2">No documents found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Upload your first document to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow border overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="text-muted-foreground flex-shrink-0">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="font-medium text-sm sm:text-lg mb-1 truncate">{doc.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 min-w-0">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center gap-1 min-w-0">
                            <HardDrive className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{doc.fileSize}</span>
                          </span>
                          <span className="uppercase text-xs font-medium bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                            {doc.fileType}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        <span className="hidden sm:inline">{doc.status.replace('_', ' ')}</span>
                        <span className="sm:hidden">{doc.status === 'parsed' ? 'Ready' : doc.status === 'parsing' ? 'Processing' : 'Queued'}</span>
                      </div>
                      
                      {doc.status === 'parsed' && (
                        <Link href={`/documents/${doc.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={loading}
                            className="w-full sm:w-auto text-xs sm:text-sm flex-shrink-0"
                          >
                            <span className="hidden sm:inline">View Details</span>
                            <span className="sm:hidden">Details</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 