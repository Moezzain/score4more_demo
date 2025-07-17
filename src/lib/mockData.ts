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

// Helper function to generate page content
const generatePageContent = (pageNumber: number, documentType: string) => {
  const baseContent = {
    headers: [
      { type: 'h1', content: `${documentType} - Page ${pageNumber}` },
      { type: 'h2', content: `Section ${pageNumber} Overview` },
      { type: 'h3', content: `Key Points - Page ${pageNumber}` }
    ],
    body: [
      { type: 'body', content: `This is the main content for page ${pageNumber} of the ${documentType}. It contains detailed information about the topics covered in this section.` },
      { type: 'body', content: `Page ${pageNumber} focuses on specific aspects and provides comprehensive analysis of the subject matter.` },
      { type: 'body', content: `The content on this page is structured to provide clear understanding and actionable insights.` }
    ],
    content: [
      { type: 'text', content: `Page ${pageNumber} highlights:` },
      { type: 'text', content: `• Important findings from section ${pageNumber}` },
      { type: 'text', content: `• Key metrics and data points` },
      { type: 'text', content: `• Recommendations for page ${pageNumber}` },
      { type: 'text', content: `• Next steps and action items` }
    ]
  };

  // Add page-specific content
  if (pageNumber === 1) {
    baseContent.headers[0].content = `${documentType} - Executive Summary`;
    baseContent.body[0].content = `This is the executive summary page of the ${documentType}. It provides an overview of all key findings and recommendations.`;
  } else if (pageNumber === 2) {
    baseContent.headers[0].content = `${documentType} - Methodology`;
    baseContent.body[0].content = `This page describes the methodology used in the ${documentType}. It explains the research approach and data collection methods.`;
  } else if (pageNumber === 3) {
    baseContent.headers[0].content = `${documentType} - Results & Analysis`;
    baseContent.body[0].content = `This page presents the main results and analysis from the ${documentType}. It includes detailed findings and interpretations.`;
  }

  return baseContent;
};

// Mock document details data with pagination
export const mockDocumentDetails: Record<string, DocumentDetails> = {
  '1': {
    list: {
      doc_link: 'https://example.com/sustainability-report-2024.pdf',
      metadata: {
        headers: [
          ...generatePageContent(1, 'Sustainability Report 2024').headers,
          ...generatePageContent(2, 'Sustainability Report 2024').headers,
          ...generatePageContent(3, 'Sustainability Report 2024').headers,
          ...generatePageContent(4, 'Sustainability Report 2024').headers,
          ...generatePageContent(5, 'Sustainability Report 2024').headers
        ],
        body: [
          ...generatePageContent(1, 'Sustainability Report 2024').body,
          ...generatePageContent(2, 'Sustainability Report 2024').body,
          ...generatePageContent(3, 'Sustainability Report 2024').body,
          ...generatePageContent(4, 'Sustainability Report 2024').body,
          ...generatePageContent(5, 'Sustainability Report 2024').body
        ],
        content: [
          ...generatePageContent(1, 'Sustainability Report 2024').content,
          ...generatePageContent(2, 'Sustainability Report 2024').content,
          ...generatePageContent(3, 'Sustainability Report 2024').content,
          ...generatePageContent(4, 'Sustainability Report 2024').content,
          ...generatePageContent(5, 'Sustainability Report 2024').content
        ]
      },
      paging: {
        current_page: 1,
        page_size: 5,
        total_pages: 5
      }
    }
  },
  '2': {
    list: {
      doc_link: 'https://example.com/green-energy-plan.docx',
      metadata: {
        headers: [
          ...generatePageContent(1, 'Green Energy Implementation Plan').headers,
          ...generatePageContent(2, 'Green Energy Implementation Plan').headers,
          ...generatePageContent(3, 'Green Energy Implementation Plan').headers
        ],
        body: [
          ...generatePageContent(1, 'Green Energy Implementation Plan').body,
          ...generatePageContent(2, 'Green Energy Implementation Plan').body,
          ...generatePageContent(3, 'Green Energy Implementation Plan').body
        ],
        content: [
          ...generatePageContent(1, 'Green Energy Implementation Plan').content,
          ...generatePageContent(2, 'Green Energy Implementation Plan').content,
          ...generatePageContent(3, 'Green Energy Implementation Plan').content
        ]
      },
      paging: {
        current_page: 1,
        page_size: 5,
        total_pages: 3
      }
    }
  },
  '3': {
    list: {
      doc_link: 'https://example.com/waste-management-strategy.pdf',
      metadata: {
        headers: [
          ...generatePageContent(1, 'Waste Management Strategy').headers,
          ...generatePageContent(2, 'Waste Management Strategy').headers,
          ...generatePageContent(3, 'Waste Management Strategy').headers,
          ...generatePageContent(4, 'Waste Management Strategy').headers
        ],
        body: [
          ...generatePageContent(1, 'Waste Management Strategy').body,
          ...generatePageContent(2, 'Waste Management Strategy').body,
          ...generatePageContent(3, 'Waste Management Strategy').body,
          ...generatePageContent(4, 'Waste Management Strategy').body
        ],
        content: [
          ...generatePageContent(1, 'Waste Management Strategy').content,
          ...generatePageContent(2, 'Waste Management Strategy').content,
          ...generatePageContent(3, 'Waste Management Strategy').content,
          ...generatePageContent(4, 'Waste Management Strategy').content
        ]
      },
      paging: {
        current_page: 1,
        page_size: 5,
        total_pages: 4
      }
    }
  },
  '4': {
    list: {
      doc_link: 'https://example.com/carbon-neutrality-roadmap.pptx',
      metadata: {
        headers: [
          ...generatePageContent(1, 'Carbon Neutrality Roadmap').headers,
          ...generatePageContent(2, 'Carbon Neutrality Roadmap').headers,
          ...generatePageContent(3, 'Carbon Neutrality Roadmap').headers,
          ...generatePageContent(4, 'Carbon Neutrality Roadmap').headers,
          ...generatePageContent(5, 'Carbon Neutrality Roadmap').headers,
          ...generatePageContent(6, 'Carbon Neutrality Roadmap').headers
        ],
        body: [
          ...generatePageContent(1, 'Carbon Neutrality Roadmap').body,
          ...generatePageContent(2, 'Carbon Neutrality Roadmap').body,
          ...generatePageContent(3, 'Carbon Neutrality Roadmap').body,
          ...generatePageContent(4, 'Carbon Neutrality Roadmap').body,
          ...generatePageContent(5, 'Carbon Neutrality Roadmap').body,
          ...generatePageContent(6, 'Carbon Neutrality Roadmap').body
        ],
        content: [
          ...generatePageContent(1, 'Carbon Neutrality Roadmap').content,
          ...generatePageContent(2, 'Carbon Neutrality Roadmap').content,
          ...generatePageContent(3, 'Carbon Neutrality Roadmap').content,
          ...generatePageContent(4, 'Carbon Neutrality Roadmap').content,
          ...generatePageContent(5, 'Carbon Neutrality Roadmap').content,
          ...generatePageContent(6, 'Carbon Neutrality Roadmap').content
        ]
      },
      paging: {
        current_page: 1,
        page_size: 5,
        total_pages: 6
      }
    }
  },
  '5': {
    list: {
      doc_link: 'https://example.com/esg-performance-metrics.xlsx',
      metadata: {
        headers: [
          ...generatePageContent(1, 'ESG Performance Metrics').headers,
          ...generatePageContent(2, 'ESG Performance Metrics').headers
        ],
        body: [
          ...generatePageContent(1, 'ESG Performance Metrics').body,
          ...generatePageContent(2, 'ESG Performance Metrics').body
        ],
        content: [
          ...generatePageContent(1, 'ESG Performance Metrics').content,
          ...generatePageContent(2, 'ESG Performance Metrics').content
        ]
      },
      paging: {
        current_page: 1,
        page_size: 5,
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

// Helper function to get document details by ID with page support
export const getDocumentDetailsById = (id: string, page: number = 1): DocumentDetails | undefined => {
  const details = mockDocumentDetails[id];
  if (!details) return undefined;

  // Clone the details and update the current page
  const updatedDetails = {
    ...details,
    list: {
      ...details.list,
      paging: {
        ...details.list.paging,
        current_page: page
      }
    }
  };

  return updatedDetails;
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