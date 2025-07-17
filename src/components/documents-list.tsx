'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentsList, getDocumentDetailsByPage } from '@/store/slices/documentsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DocumentsList() {
  const dispatch = useAppDispatch();
  const { documents, loading, error, pagination } = useAppSelector(
    (state) => state.documents
  );

  useEffect(() => {
    dispatch(getDocumentsList({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleGetDocumentDetails = (documentId: string) => {
    dispatch(getDocumentDetailsByPage({ documentId, page: 1 }));
  };

  const handleLoadNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      dispatch(getDocumentsList({ page: pagination.page + 1, limit: pagination.limit }));
    }
  };

  const handleLoadPreviousPage = () => {
    if (pagination.page > 1) {
      dispatch(getDocumentsList({ page: pagination.page - 1, limit: pagination.limit }));
    }
  };

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
        return '✅';
      case 'parsing':
        return '⏳';
      case 'waiting_queue':
        return '⏸️';
      default:
        return '❓';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'pptx':
        return '📊';
      case 'xlsx':
        return '📈';
      default:
        return '📄';
    }
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 border border-red-200 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📚 Documents Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pagination Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total documents)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleLoadPreviousPage}
                disabled={pagination.page <= 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleLoadNextPage}
                disabled={pagination.page >= pagination.totalPages || loading}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Documents List */}
          {documents.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground">
                Upload your first document to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">
                        {getFileIcon(doc.fileType)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-lg mb-1">{doc.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>📅 {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                          <span>📏 {doc.fileSize}</span>
                          <span className="uppercase text-xs">{doc.fileType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        <span className="mr-1">{getStatusIcon(doc.status)}</span>
                        {doc.status.replace('_', ' ')}
                      </div>
                      
                      {doc.status === 'parsed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGetDocumentDetails(doc.id)}
                          disabled={loading}
                        >
                          View Details
                        </Button>
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