'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentsList, getDocumentDetails, uploadDocument } from '@/store/slices/documentsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DocumentsExample() {
  const dispatch = useAppDispatch();
  const { documents, currentDocument, loading, error, pagination } = useAppSelector(
    (state) => state.documents
  );

  useEffect(() => {
    // Load documents list on component mount
    dispatch(getDocumentsList({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleGetDocumentDetails = (documentId: string) => {
    dispatch(getDocumentDetails(documentId));
  };

  const handleCreateDocument = () => {
    // Create a mock file for upload
    const mockFile = new File(['Mock document content'], `New Document ${Date.now()}.pdf`, {
      type: 'application/pdf',
    });
    dispatch(uploadDocument(mockFile));
  };

  const handleLoadNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      dispatch(getDocumentsList({ page: pagination.page + 1, limit: pagination.limit }));
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documents Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handleCreateDocument} disabled={loading}>
              Create New Document
            </Button>
            <Button onClick={handleLoadNextPage} disabled={pagination.page >= pagination.totalPages}>
              Load Next Page
            </Button>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">
              Documents List ({pagination.total} total)
            </h3>
            {documents.length === 0 ? (
              <p className="text-muted-foreground">No documents found.</p>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <Card key={doc.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Status: {doc.status} | Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGetDocumentDetails(doc.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {currentDocument && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Current Document Details</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium">{currentDocument.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  ID: {currentDocument.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {currentDocument.status}
                </p>
                <p className="text-sm text-muted-foreground">
                  Uploaded: {new Date(currentDocument.uploadedAt).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  File Size: {currentDocument.fileSize} | Type: {currentDocument.fileType}
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 