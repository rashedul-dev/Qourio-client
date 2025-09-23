// Environment variables configuration
const getEmailJSConfig = () => ({
  emailJsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID,
  emailJsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  emailJsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
});

// Extend the Window interface
declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, any>,
        publicKey?: string
      ) => Promise<{
        status: number;
        text: string;
      }>;
      sendForm: (
        serviceId: string,
        templateId: string,
        form: HTMLFormElement,
        publicKey?: string
      ) => Promise<{
        status: number;
        text: string;
      }>;
    };
  }
}

// Types for better type safety
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  message: string;
  source: string;
  to_name: string;
}

export interface EmailResponse {
  status: number;
  text: string;
}

export interface EmailConfig {
  emailJsServiceId?: string;
  emailJsTemplateId?: string;
  emailJsPublicKey?: string;
}

// Custom errors for better error handling
export class EmailJSError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'EmailJSError';
  }
}

export class EmailJSConfigError extends EmailJSError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR');
    this.name = 'EmailJSConfigError';
  }
}

export class EmailJSNotAvailableError extends EmailJSError {
  constructor() {
    super('EmailJS is not available. Make sure the library is loaded.', 'NOT_AVAILABLE');
    this.name = 'EmailJSNotAvailableError';
  }
}

// Validate EmailJS configuration
const validateEmailJSConfig = (config: EmailConfig): void => {
  const requiredFields = ['emailJsServiceId', 'emailJsTemplateId', 'emailJsPublicKey'] as const;
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    throw new EmailJSConfigError(
      `EmailJS configuration is incomplete. Missing: ${missingFields.join(', ')}`
    );
  }
};

// Check if we're in a browser environment
const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

// Initialize EmailJS
export const initializeEmailJS = (): boolean => {
  try {
    if (!isBrowser()) {
      return false;
    }

    if (window.emailjs) {
      // EmailJS is already loaded and available
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
};

// Load EmailJS script dynamically
export const loadEmailJS = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!isBrowser()) {
      reject(new EmailJSNotAvailableError());
      return;
    }

    if (window.emailjs) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.emailjs) {
        resolve(true);
      } else {
        reject(new EmailJSNotAvailableError());
      }
    };
    
    script.onerror = () => {
      reject(new EmailJSError('Failed to load EmailJS script'));
    };
    
    document.head.appendChild(script);
  });
};

// Initialize EmailJS with public key
export const initEmailJSWithKey = async (publicKey?: string): Promise<void> => {
  if (!initializeEmailJS()) {
    await loadEmailJS();
  }

  const config = getEmailJSConfig();
  const key = publicKey || config.emailJsPublicKey;
  if (!key) {
    throw new EmailJSConfigError('EmailJS public key is required');
  }

  if (window.emailjs) {
    window.emailjs.init(key);
  }
};

// Send email using EmailJS
export const sendEmail = async (
  templateParams: EmailTemplateParams,
  options?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
  }
): Promise<EmailResponse> => {
  try {
    // Get configuration
    const config = getEmailJSConfig();
    
    // Validate configuration
    validateEmailJSConfig(config);
    
    // Ensure EmailJS is initialized
    if (!initializeEmailJS()) {
      await loadEmailJS();
    }

    if (!window.emailjs) {
      throw new EmailJSNotAvailableError();
    }

    // Use provided options or fall back to config
    const serviceId = options?.serviceId || config.emailJsServiceId!;
    const templateId = options?.templateId || config.emailJsTemplateId!;
    const publicKey = options?.publicKey || config.emailJsPublicKey!;

    // Send the email
    const response = await window.emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    return response;
  } catch (error) {
    // Re-throw our custom errors
    if (error instanceof EmailJSError) {
      throw error;
    }
    
    // Wrap other errors
    throw new EmailJSError(
      `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

// Send email using form
export const sendEmailForm = async (
  form: HTMLFormElement,
  options?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
  }
): Promise<EmailResponse> => {
  try {
    const config = getEmailJSConfig();
    validateEmailJSConfig(config);
    
    if (!initializeEmailJS()) {
      await loadEmailJS();
    }

    if (!window.emailjs) {
      throw new EmailJSNotAvailableError();
    }

    const serviceId = options?.serviceId || config.emailJsServiceId!;
    const templateId = options?.templateId || config.emailJsTemplateId!;
    const publicKey = options?.publicKey || config.emailJsPublicKey!;

    const response = await window.emailjs.sendForm(
      serviceId,
      templateId,
      form,
      publicKey
    );

    return response;
  } catch (error) {
    if (error instanceof EmailJSError) {
      throw error;
    }
    
    throw new EmailJSError(
      `Failed to send form email: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

// Utility function to check EmailJS status
export const getEmailJSStatus = () => {
  const config = getEmailJSConfig();
  return {
    isAvailable: initializeEmailJS(),
    isBrowser: isBrowser(),
    configValid: (() => {
      try {
        validateEmailJSConfig(config);
        return true;
      } catch {
        return false;
      }
    })(),
  };
};

// Hook for React components (optional)
export const useEmailJS = () => {
  const status = getEmailJSStatus();
  
  return {
    ...status,
    sendEmail: (templateParams: EmailTemplateParams) => sendEmail(templateParams),
    sendEmailForm: (form: HTMLFormElement) => sendEmailForm(form),
    initWithKey: (publicKey?: string) => initEmailJSWithKey(publicKey),
  };
};