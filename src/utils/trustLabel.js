function normalizeTrustLevel(level) {
  const value = String(level ?? '').trim().toLowerCase()

  if (value === 'high' || value === 'high trust') return 'high'
  if (value === 'medium' || value === 'uncertain') return 'medium'
  if (value === 'low' || value === 'suspected bot' || value === 'bot') return 'low'

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

  return classes[normalized] ?? classes.medium
}
