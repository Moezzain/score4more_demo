'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDocumentsList } from '@/store/slices/documentsSlice';
import { DocumentsList } from '@/components/documents-list';

export default function DocumentsPage() {
  const dispatch = useAppDispatch();
  const { documents, loading, error, pagination } = useAppSelector(
    (state) => state.documents
  );

  useEffect(() => {
    dispatch(getDocumentsList({ page: 1, limit: 5 }));
  }, [dispatch]);

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
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <DocumentsList />
      </div>
    </div>
  );
} 