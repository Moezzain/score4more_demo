import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPaginatedDocuments, getDocumentById, getDocumentDetailsById, uploadFile } from '@/lib/mockData';

// Types
export interface Document {
  id: string;
  title: string;
  uploadedAt: string;
  status: 'waiting_queue' | 'parsing' | 'parsed';
  fileSize: string;
  fileType: string;
}

export interface DocumentsListResponse {
  documents: Document[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DocumentDetails {
  list: {
    doc_link: string;
    metadata: {
      headers: Array<{ type: string; content: string }>;
      body: Array<{ type: string; content: string }>;
      content: Array<{ type: string; content: string }>;
    };
    paging: {
      current_page: number;
      page_size: number;
      total_pages: number;
    };
  };
}

// Async thunks using mock data
export const getDocumentsList = createAsyncThunk(
  'documents/getDocumentsList',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return getPaginatedDocuments(page, limit);
  }
);

export const getDocumentDetails = createAsyncThunk(
  'documents/getDocumentDetails',
  async (documentId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const document = getDocumentById(documentId);
    const details = getDocumentDetailsById(documentId);
    
    if (!document) {
      throw new Error('Document not found');
    }
    
    return { document, details: details || null };
  }
);

export const getDocumentDetailsByPage = createAsyncThunk(
  'documents/getDocumentDetailsByPage',
  async ({ documentId, page }: { documentId: string; page: number }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const document = getDocumentById(documentId);
    const details = getDocumentDetailsById(documentId, page);
    
    if (!document) {
      throw new Error('Document not found');
    }
    
    return { document, details: details || null };
  }
);

export const uploadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async (file: File) => {
    return await uploadFile(file);
  }
);

// State interface
interface DocumentsState {
  documents: Document[];
  currentDocument: Document | null;
  currentDocumentDetails: DocumentDetails | null;
  loading: boolean;
  uploadLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Initial state
const initialState: DocumentsState = {
  documents: [],
  currentDocument: null,
  currentDocumentDetails: null,
  loading: false,
  uploadLoading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
};

// Slice
const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
      state.currentDocumentDetails = null;
    },
  },
  extraReducers: (builder) => {
    // getDocumentsList
    builder
      .addCase(getDocumentsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentsList.fulfilled, (state, action: PayloadAction<DocumentsListResponse>) => {
        state.loading = false;
        state.documents = action.payload.documents;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getDocumentsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch documents';
      });

    // getDocumentDetails
    builder
      .addCase(getDocumentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentDetails.fulfilled, (state, action: PayloadAction<{ document: Document; details: DocumentDetails | null }>) => {
        state.loading = false;
        state.currentDocument = action.payload.document;
        state.currentDocumentDetails = action.payload.details;
      })
      .addCase(getDocumentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch document details';
      });

    // getDocumentDetailsByPage
    builder
      .addCase(getDocumentDetailsByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentDetailsByPage.fulfilled, (state, action: PayloadAction<{ document: Document; details: DocumentDetails | null }>) => {
        state.loading = false;
        state.currentDocument = action.payload.document;
        state.currentDocumentDetails = action.payload.details;
      })
      .addCase(getDocumentDetailsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch document details';
      });

    // uploadDocument
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.uploadLoading = false;
        // Add the new document to the list
        state.documents.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.error.message || 'Failed to upload document';
      });
  },
});

export const { clearError, clearCurrentDocument } = documentsSlice.actions;
export default documentsSlice.reducer; 