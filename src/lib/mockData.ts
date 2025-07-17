import { Document, DocumentsListResponse, DocumentDetails } from '@/store/slices/documentsSlice';

// Mock documents data with file upload structure
export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Sustainability Report 2024.pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
    status: 'parsed',
    fileSize: '2.5 MB',
    fileType: 'pdf'
  },
  {
    id: '2',
    title: 'Green Energy Implementation Plan.docx',
    uploadedAt: '2024-01-10T09:15:00Z',
    status: 'parsing',
    fileSize: '1.8 MB',
    fileType: 'docx'
  },
  {
    id: '3',
    title: 'Waste Management Strategy.pdf',
    uploadedAt: '2024-01-05T11:00:00Z',
    status: 'waiting_queue',
    fileSize: '3.2 MB',
    fileType: 'pdf'
  },
  {
    id: '4',
    title: 'Carbon Neutrality Roadmap.pptx',
    uploadedAt: '2024-01-01T08:00:00Z',
    status: 'parsed',
    fileSize: '4.1 MB',
    fileType: 'pptx'
  },
  {
    id: '5',
    title: 'ESG Performance Metrics.xlsx',
    uploadedAt: '2023-12-28T14:20:00Z',
    status: 'parsed',
    fileSize: '1.2 MB',
    fileType: 'xlsx'
  },
  {
    id: '6',
    title: 'Sustainable Supply Chain Guidelines.pdf',
    uploadedAt: '2023-12-25T12:30:00Z',
    status: 'parsed',
    fileSize: '2.8 MB',
    fileType: 'pdf'
  },
  {
    id: '7',
    title: 'Water Conservation Initiative.docx',
    uploadedAt: '2023-12-20T16:45:00Z',
    status: 'waiting_queue',
    fileSize: '1.5 MB',
    fileType: 'docx'
  },
  {
    id: '8',
    title: 'Biodiversity Protection Plan.pdf',
    uploadedAt: '2023-12-15T10:00:00Z',
    status: 'parsing',
    fileSize: '3.7 MB',
    fileType: 'pdf'
  },
  {
    id: '9',
    title: 'Circular Economy Framework.pptx',
    uploadedAt: '2023-12-10T13:15:00Z',
    status: 'parsed',
    fileSize: '2.9 MB',
    fileType: 'pptx'
  },
  {
    id: '10',
    title: 'Climate Risk Assessment.pdf',
    uploadedAt: '2023-12-05T09:30:00Z',
    status: 'parsed',
    fileSize: '5.2 MB',
    fileType: 'pdf'
  }
];

// Mock document details data
export const mockDocumentDetails: Record<string, DocumentDetails> = {
  '1': {
    list: {
      doc_link: 'https://example.com/sustainability-report-2024.pdf',
      metadata: {
        headers: [
          { type: 'h1', content: 'Sustainability Report 2024' },
          { type: 'h2', content: 'Executive Summary' },
          { type: 'h2', content: 'Environmental Impact' },
          { type: 'h3', content: 'Carbon Footprint Reduction' },
          { type: 'h3', content: 'Renewable Energy Initiatives' }
        ],
        body: [
          { type: 'body', content: 'This comprehensive report covers our environmental initiatives, carbon footprint reduction strategies, and future sustainability goals.' },
          { type: 'body', content: 'We have successfully reduced our carbon emissions by 25% compared to last year through various initiatives including renewable energy adoption and process optimization.' },
          { type: 'body', content: 'Our commitment to sustainability extends beyond environmental impact to include social responsibility and governance practices.' }
        ],
        content: [
          { type: 'text', content: 'Key achievements in 2024 include:' },
          { type: 'text', content: '• 25% reduction in carbon emissions' },
          { type: 'text', content: '• 40% increase in renewable energy usage' },
          { type: 'text', content: '• Zero waste to landfill achievement' },
          { type: 'text', content: '• 100% sustainable packaging materials' }
        ]
      },
      paging: {
        current_page: 1,
        page_size: 10,
        total_pages: 3
      }
    }
  },
  '2': {
    list: {
      doc_link: 'https://example.com/green-energy-plan.docx',
      metadata: {
        headers: [
          { type: 'h1', content: 'Green Energy Implementation Plan' },
          { type: 'h2', content: 'Solar Panel Installation' },
          { type: 'h2', content: 'Wind Energy Partnerships' }
        ],
        body: [
          { type: 'body', content: 'Detailed plan for transitioning to renewable energy sources across all our facilities.' },
          { type: 'body', content: 'The plan includes solar panel installation, wind energy partnerships, and energy storage solutions.' }
        ],
        content: [
          { type: 'text', content: 'Implementation phases:' },
          { type: 'text', content: '• Phase 1: Solar panel installation (6 months)' },
          { type: 'text', content: '• Phase 2: Wind energy partnerships (12 months)' },
          { type: 'text', content: '• Phase 3: Energy storage systems (18 months)' }
        ]
      },
      paging: {
        current_page: 1,
        page_size: 10,
        total_pages: 2
      }
    }
  }
};

// Helper function to get paginated documents
export const getPaginatedDocuments = (page: number, limit: number): DocumentsListResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedDocuments = mockDocuments.slice(startIndex, endIndex);
  
  return {
    documents: paginatedDocuments,
    total: mockDocuments.length,
    page,
    limit,
    totalPages: Math.ceil(mockDocuments.length / limit)
  };
};

// Helper function to get document by ID
export const getDocumentById = (id: string): Document | undefined => {
  return mockDocuments.find(doc => doc.id === id);
};

// Helper function to get document details by ID
export const getDocumentDetailsById = (id: string): DocumentDetails | undefined => {
  return mockDocumentDetails[id];
};

// Helper function to create a new document
export const createMockDocument = (file: File): Document => {
  const now = new Date().toISOString();
  const newId = (mockDocuments.length + 1).toString();
  
  const newDocument: Document = {
    id: newId,
    title: file.name,
    uploadedAt: now,
    status: 'waiting_queue',
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    fileType: file.name.split('.').pop() || 'unknown'
  };
  
  // Add to mock data
  mockDocuments.unshift(newDocument);
  
  return newDocument;
};

// Helper function to simulate file upload
export const uploadFile = async (file: File): Promise<Document> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure
  if (Math.random() > 0.1) { // 90% success rate
    return createMockDocument(file);
  } else {
    throw new Error('Upload failed. Please try again.');
  }
}; 