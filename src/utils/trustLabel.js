function normalizeTrustLevel(level) {
  const value = String(level ?? '').trim().toLowerCase()
  
  if (value === 'high' || value === 'high trust') return 'high'
  if (value === 'medium' || value === 'uncertain') return 'medium'
  if (value === 'low' || value === 'suspected bot' || value === 'bot') return 'low'

  // support capitalized keys from other modules
  if (v === 'high' || v === 'high') return 'high'
  return 'medium'
}

export function getTrustDisplayLabel(level) {
  const normalized = normalizeTrustLevel(level)
  
  const labels = {
    high: 'High Trust',
    medium: 'Uncertain',
    low: 'Suspected Bot',
  }
  return labels[normalized] ?? labels.medium
}

export function getTrustBadgeClass(level) {
  const normalized = normalizeTrustLevel(level)
  const classes = {
    high: 'trust-badge--high',
    medium: 'trust-badge--uncertain',
    low: 'trust-badge--suspected',
  }
  return classes[normalized] || classes.medium
  

  // Maps scoring.js's level ("High"/"Medium"/"Low") to the display wording
// used across the UI. Change it here, not in individual pages, so Search,
// Results, and History never drift out of sync with each other again.

const LABEL_MAP = {
  High: 'High Trust',
  Medium: 'Uncertain',
  Low: 'Suspected Bot',
};

const CSS_CLASS_MAP = {
  High: 'badge-high-trust',
  Medium: 'badge-uncertain',
  Low: 'badge-suspected-bot',
};

export function getTrustDisplayLabel(level) {
  return LABEL_MAP[level] || 'Unknown';
}

export function getTrustBadgeClass(level) {}
  return CSS_CLASS_MAP[level] || '';

}