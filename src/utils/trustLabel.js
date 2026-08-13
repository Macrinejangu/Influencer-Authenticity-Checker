function normalizeTrustLevel(level) {
  if (!level && level !== 0) return 'medium'
  const v = String(level).trim().toLowerCase()

  if (v === 'high' || v === 'high trust') return 'high'
  if (v === 'medium' || v === 'uncertain') return 'medium'
  if (v === 'low' || v === 'suspected bot' || v === 'bot') return 'low'

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
  return labels[normalized] || labels.medium
}

export function getTrustBadgeClass(level) {
  const normalized = normalizeTrustLevel(level)
  const classes = {
    high: 'trust-badge--high',
    medium: 'trust-badge--uncertain',
    low: 'trust-badge--suspected',
  }
  return classes[normalized] || classes.medium
}
