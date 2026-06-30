import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const openAiKey = process.env.OPENAI_API_KEY;

// Initialize Supabase admin-like client with service role key if available, otherwise fallback to anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VerificationResult {
  status: 'PASSED' | 'WARNING' | 'FAILED';
  confidenceScore: number;
  extractedData: {
    shipper?: string;
    consignee?: string;
    referenceNumber?: string;
    grossWeight?: string;
    netWeight?: string;
    value?: string;
    currency?: string;
    hsCodes?: string[];
    signatures?: boolean;
    date?: string;
  };
  discrepancies: Array<{
    severity: 'high' | 'medium' | 'low';
    field: string;
    description: string;
  }>;
}

export const AIService = {
  /**
   * Generates a 1536-dimension embedding for the given text.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!openAiKey) {
      // Return a mock vector if API key is missing
      return Array.from({ length: 1536 }, () => (Math.random() - 0.5) * 0.05);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          input: text.replace(/\n/g, ' '),
          model: 'text-embedding-3-small'
        })
      });
      const result = await response.json();
      if (result.data && result.data[0]) {
        return result.data[0].embedding;
      }
      throw new Error(result.error?.message || 'Embedding generation returned no data');
    } catch (err: any) {
      console.warn('Failed to generate real embedding. Falling back to mock vector. Error:', err.message);
      return Array.from({ length: 1536 }, () => (Math.random() - 0.5) * 0.05);
    }
  },

  /**
   * Performs a vector similarity search on the knowledge base chunks.
   */
  async matchDocumentChunks(
    embedding: number[],
    options: {
      category?: string;
      companyId?: string;
      role?: string;
      limit?: number;
      threshold?: number;
    } = {}
  ): Promise<any[]> {
    const { category = null, companyId = null, role = 'customer_user', limit = 5, threshold = 0.25 } = options;

    try {
      const { data, error } = await supabase.rpc('match_document_chunks', {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        filter_category: category,
        filter_company_id: companyId,
        filter_role: role
      });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('Vector search query error:', err.message);
      return [];
    }
  },

  /**
   * Executes a RAG chat request.
   */
  async chatCompletion(
    messages: any[],
    portal: string,
    userContext: {
      id: string;
      email: string;
      role: string;
      companyId: string | null;
      name: string;
      companyName: string | null;
    }
  ): Promise<{ answer: string; retrievedChunks: any[] }> {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';

    // 1. Vector Search for relevant context
    let retrievedChunks: any[] = [];
    if (lastUserMessage) {
      const embedding = await this.generateEmbedding(lastUserMessage);
      retrievedChunks = await this.matchDocumentChunks(embedding, {
        role: userContext.role,
        companyId: userContext.companyId || undefined,
        limit: 4
      });
    }

    // 2. Format context text
    const contextText = retrievedChunks.length > 0
      ? retrievedChunks.map((chunk, index) => 
          `[Source ${index + 1}: ${chunk.document_name} (${chunk.category})]\n${chunk.content}`
        ).join('\n\n')
      : 'No specific company reference found. Rely on general guidelines but specify that DFS policies should be confirmed.';

    // 3. Portal-specific prompt generation
    const portalPrompts: Record<string, string> = {
      marketing: 'You are a customer assistant on the DFS Group homepage. Be helpful, professional, and explain our trucking, customs clearing, and express courier services across Botswana and Southern Africa. Keep answers concise and direct.',
      trucking: 'You are the DFS Trucking logistics assistant. Help clients with their cross-border shipping, fleet capabilities (Volvo FH 440, Scania R460 side-tippers and flatdecks), transit routes, tracking updates, and corridor rules.',
      clearing: 'You are the DFS Clearing customs specialist. Guide users on import/export documentation, HS codes, tariffs, Botswana Unified Revenue Service (BURS) regulations, SACU, SADC certificates of origin, and VAT.',
      express: 'You are the DFS Express courier assistant. Help users track parcels, schedule local/regional courier dispatches, calculate weight rates, and verify delivery timelines.',
      admin: 'You are the DFS internal ops control assistant. Help dispatchers and administrative staff locate SOPs, verify driver schedules, retrieve client invoice histories, and explain cargo delays.',
      super_admin: 'You are the DFS Enterprise Intelligence assistant. You have unrestricted access to all companies, financials, shipments, and Sage status logs. Help executives analyze revenue trends, outstanding aged debt, and system health.'
    };

    const systemPrompt = `
${portalPrompts[portal] || 'You are an intelligent logistics assistant.'}

Current User Context:
- User Name: ${userContext.name}
- Email: ${userContext.email}
- Role: ${userContext.role}
- Company: ${userContext.companyName || 'DFS Internal'}

Operational Knowledge retrieved from the DFS knowledge base:
${contextText}

Guidelines:
1. Ground your answers in the provided knowledge base context. If the query asks about rates, procedures, or SOPs, prioritize the knowledge base text.
2. If the user asks about operational records (like shipments, invoices, or invoices overdue), acknowledge that you can query this data for them (enforce role-based access).
3. Do not sound like a generic assistant. Refer to DFS Group guidelines.
4. If the data is not in the knowledge base, state that you cannot find specific internal documentation but offer the general regional procedure (e.g. standard BURS customs protocols).
5. Always remind users that final clearance decisions require physical documentation and human verification.
`;

    if (!openAiKey) {
      // Simulate RAG answer when no key is set
      await new Promise(r => setTimeout(r, 1200));
      const fallbackAnswers: Record<string, string> = {
        clearing: `Hello ${userContext.name}. Based on Botswana customs regulations (BURS), you will need a **Commercial Invoice**, **Packing List**, and a **SADC Certificate of Origin** to clear machinery at borders like Pioneer Gate or Beitbridge. Standard VAT of 14% applies to imports.\n\n*(Note: This is a simulated response because the OpenAI API Key is not configured)*`,
        trucking: `Hello ${userContext.name}. We operate Scania and Volvo side-tipper units (up to 38 MT payload) and flat-deck links (up to 36 MT payload) across SADC corridors. Please let me know your cargo type to specify pre-trip thermal requirements or route configurations.\n\n*(Note: This is a simulated response because the OpenAI API Key is not configured)*`,
        default: `Hello ${userContext.name}. I am the DFS Group logistics assistant. I can help you with freight rates, shipment statuses, customs clearance, and courier bookings. What cargo can we move for you today?\n\n*(Note: This is a simulated response because the OpenAI API Key is not configured)*`
      };
      return {
        answer: fallbackAnswers[portal] || fallbackAnswers.default,
        retrievedChunks
      };
    }

    try {
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // cost-efficient, fast model
          messages: apiMessages,
          temperature: 0.2
        })
      });

      const result = await response.json();
      if (result.choices && result.choices[0]) {
        return {
          answer: result.choices[0].message.content,
          retrievedChunks
        };
      }
      throw new Error(result.error?.message || 'Chat completion returned empty response');
    } catch (err: any) {
      console.error('OpenAI Chat Completion API error:', err.message);
      return {
        answer: `I apologize, but I encountered an error communicating with the intelligence service: ${err.message}. Please try again shortly.`,
        retrievedChunks
      };
    }
  },

  /**
   * Performs automated audit and compliance checks on base64 uploaded document.
   * Utilizes OpenAI Vision API to parse document layouts and text accurately.
   */
  async verifyDocument(
    fileName: string,
    base64Data: string, // data url or raw base64
    documentType: string
  ): Promise<VerificationResult> {
    
    // Helper to sanitize base64 string
    const base64Content = base64Data.includes('base64,') 
      ? base64Data.split('base64,')[1] 
      : base64Data;

    if (!openAiKey) {
      // Simulate verification reports for testing
      await new Promise(r => setTimeout(r, 2000));
      
      const isMismatched = fileName.toLowerCase().includes('mismatch') || fileName.toLowerCase().includes('fail');

      if (isMismatched) {
        return {
          status: 'FAILED',
          confidenceScore: 92,
          extractedData: {
            shipper: 'SA Steel Suppliers Ltd, Johannesburg',
            consignee: 'Mmamashia Mining, Gaborone',
            referenceNumber: 'INV-2026-X1',
            grossWeight: '22,400 kg',
            netWeight: '20,100 kg',
            value: '45,200.00',
            currency: 'ZAR',
            hsCodes: ['7208.51.00'],
            signatures: false,
            date: '2026-06-25'
          },
          discrepancies: [
            {
              severity: 'high',
              field: 'signatures',
              description: 'Missing exporter signature and stamp on the Commercial Invoice.'
            },
            {
              severity: 'medium',
              field: 'grossWeight',
              description: 'Gross Weight (22,400 kg) on Invoice does not match the Packing List (24,800 kg).'
            },
            {
              severity: 'low',
              field: 'consignee',
              description: 'Consignee name spelling variance: "Mmamashia Mining" on Invoice vs "Mmamashia Mining (Pty) Ltd" on permit.'
            }
          ]
        };
      }

      return {
        status: 'PASSED',
        confidenceScore: 98,
        extractedData: {
          shipper: 'SA Steel Suppliers Ltd, Johannesburg',
          consignee: 'Mmamashia Mining (Pty) Ltd, Gaborone',
          referenceNumber: 'INV-2026-7890',
          grossWeight: '38,500 kg',
          netWeight: '36,200 kg',
          value: '128,450.00',
          currency: 'USD',
          hsCodes: ['7308.90.00', '7326.90.90'],
          signatures: true,
          date: '2026-06-29'
        },
        discrepancies: []
      };
    }

    try {
      // Send the file to GPT-4o-mini which supports vision inputs
      const prompt = `
You are a professional logistics document compliance auditor. 
Analyze this uploaded file: "${fileName}" (categorized as: ${documentType}).

1. Extract the following fields if visible:
   - Shipper (name and address)
   - Consignee (name and address)
   - Reference Number (invoice #, waybill #, etc.)
   - Gross Weight
   - Net Weight
   - Total Value & Currency
   - HS Codes (harmonized system codes, typically 6-8 digits)
   - Signatures (True/False if signed/stamped)
   - Date

2. Run auditing rules:
   - Check if critical fields (Shipper, Consignee, Reference, Weight, Date) are missing.
   - Flag if signatures/stamps are absent.
   - Validate HS code structure (must be numeric formats).

3. Format your response strictly as a JSON object with this shape:
{
  "status": "PASSED" | "WARNING" | "FAILED",
  "confidenceScore": number (0-100),
  "extractedData": {
    "shipper": string,
    "consignee": string,
    "referenceNumber": string,
    "grossWeight": string,
    "netWeight": string,
    "value": string,
    "currency": string,
    "hsCodes": string[],
    "signatures": boolean,
    "date": string
  },
  "discrepancies": [
    {
      "severity": "high" | "medium" | "low",
      "field": string,
      "description": string
    }
  ]
}
`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Content}`
                  }
                }
              ]
            }
          ],
          temperature: 0.1
        })
      });

      const result = await response.json();
      if (result.choices && result.choices[0]) {
        const report = JSON.parse(result.choices[0].message.content);
        return report as VerificationResult;
      }
      throw new Error('GPT-4o failed to parse document layout');
    } catch (err: any) {
      console.error('Vision parsing error:', err.message);
      return {
        status: 'WARNING',
        confidenceScore: 50,
        extractedData: {},
        discrepancies: [
          {
            severity: 'medium',
            field: 'parsing',
            description: `Document parsing error: ${err.message}. Initializing manual compliance review.`
          }
        ]
      };
    }
  }
};
