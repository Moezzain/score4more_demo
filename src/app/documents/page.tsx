'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentsList } from '@/store/slices/documentsSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Calendar, 
  HardDrive, 
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Pause
} from 'lucide-react';

export default function DocumentsPage() {
  const dispatch = useAppDispatch();
  const { documents, loading, error, pagination } = useAppSelector(
    (state) => state.documents
  );

  useEffect(() => {
    dispatch(getDocumentsList({ page: 1, limit: 10 }));
  }, [dispatch]);

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
        return <FileText className="w-6 h-6" />;
      case 'docx':
        return <FileText className="w-6 h-6" />;
      case 'pptx':
        return <Presentation className="w-6 h-6" />;
      case 'xlsx':
        return <FileSpreadsheet className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documents Library
            </CardTitle>
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
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLoadNextPage}
                  disabled={pagination.page >= pagination.totalPages || loading}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Documents List */}
            {documents.length === 0 ? (
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
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
                        <div className="text-muted-foreground">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{doc.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3" />
                              {doc.fileSize}
                            </span>
                            <span className="uppercase text-xs">{doc.fileType}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                          {getStatusIcon(doc.status)}
                          {doc.status.replace('_', ' ')}
                        </div>
                        
                        {doc.status === 'parsed' && (
                          <Link href={`/documents/${doc.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
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
    </div>
  );
} 