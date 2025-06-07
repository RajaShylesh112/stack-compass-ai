import type { User } from '@shared/schema';

export interface UserLimits {
  canSaveStacks: boolean;
  maxSavedStacks: number;
  currentSavedStacks: number;
  hasAIFeatures: boolean;
  hasAdvancedAnalytics: boolean;
  hasExportFeatures: boolean;
  hasPDFReports: boolean;
}

export const getUserLimits = (user: User): UserLimits => {
  const isPro = user.isPro || false;
  const savedStacksCount = user.savedStacksCount || 0;
  
  return {
    canSaveStacks: isPro || savedStacksCount < 3,
    maxSavedStacks: isPro ? -1 : 3, // -1 means unlimited
    currentSavedStacks: savedStacksCount,
    hasAIFeatures: isPro,
    hasAdvancedAnalytics: isPro,
    hasExportFeatures: isPro,
    hasPDFReports: isPro,
  };
};

export const checkFeatureAccess = (user: User, feature: string): boolean => {
  const limits = getUserLimits(user);
  
  switch (feature) {
    case 'save_stack':
      return limits.canSaveStacks;
    case 'ai_suggestions':
      return limits.hasAIFeatures;
    case 'advanced_analytics':
      return limits.hasAdvancedAnalytics;
    case 'export_features':
      return limits.hasExportFeatures;
    case 'pdf_reports':
      return limits.hasPDFReports;
    default:
      return true;
  }
};

export const shouldRedirectToPricing = (user: User, attemptedFeature: string): boolean => {
  return !checkFeatureAccess(user, attemptedFeature) && !user.isPro;
};