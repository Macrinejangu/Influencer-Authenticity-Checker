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

export function getTrustBadgeClass(level) {
  return CSS_CLASS_MAP[level] || '';
}
