export function calculateEngagementRate(profile) {
  if (!profile.followers || profile.followers <= 0) {
    return 0;
  }

  const totalEngagement =
    (profile.averageLikes || 0) + (profile.averageComments || 0);

  return (totalEngagement / profile.followers) * 100;
}

export function calculate30DayGrowth(profile) {
  if (!profile.followers30DaysAgo || profile.followers30DaysAgo <= 0) {
    return 0;
  }

  return (
    ((profile.followers - profile.followers30DaysAgo) /
      profile.followers30DaysAgo) *
    100
  );
}

export function calculate90DayGrowth(profile) {
  if (!profile.followers90DaysAgo || profile.followers90DaysAgo <= 0) {
    return 0;
  }

  return (
    ((profile.followers - profile.followers90DaysAgo) /
      profile.followers90DaysAgo) *
    100
  );
}

export function calculatePostingActivity(profile) {
  return Math.max(0, profile.postsLast30Days || 0);
}

export function calculateCommentLikeRatio(profile) {
  if (!profile.averageLikes || profile.averageLikes <= 0) {
    return 0;
  }

  return (profile.averageComments / profile.averageLikes) * 100;
}

export function calculateEngagementScore(profile) {
  const rate = calculateEngagementRate(profile);

  if (rate >= 6) return 100;
  if (rate >= 5) return 90;
  if (rate >= 4) return 80;
  if (rate >= 3) return 70;
  if (rate >= 2) return 60;
  if (rate >= 1) return 45;

  return 25;
}

export function calculateGrowthScore(profile) {
  const growth = calculate30DayGrowth(profile);

  if (growth >= 0 && growth <= 10) {
    return 100;
  }

  if (growth > 10 && growth <= 20) {
    return 90;
  }

  if (growth > 20 && growth <= 30) {
    return 75;
  }

  if (growth > 30 && growth <= 50) {
    return 60;
  }

  if (growth > 50) {
    return 45;
  }

  if (growth < 0 && growth >= -10) {
    return 85;
  }

  return 70;
}

export function calculateLongTermGrowthScore(profile) {
  const growth = calculate90DayGrowth(profile);

  if (growth >= 0 && growth <= 30) {
    return 100;
  }

  if (growth > 30 && growth <= 50) {
    return 90;
  }

  if (growth > 50 && growth <= 80) {
    return 75;
  }

  if (growth > 80) {
    return 60;
  }

  if (growth < 0 && growth >= -20) {
    return 80;
  }

  return 70;
}

export function calculatePostingScore(profile) {
  const posts = calculatePostingActivity(profile);

  if (posts >= 1 && posts <= 30) {
    return 100;
  }

  if (posts > 30 && posts <= 40) {
    return 90;
  }

  if (posts > 40 && posts <= 50) {
    return 75;
  }

  if (posts > 50) {
    return 60;
  }

  return 70;
}

export function calculateAccountAgeScore(profile) {
  const age = profile.accountAgeMonths || 0;

  if (age >= 48) return 100;
  if (age >= 36) return 90;
  if (age >= 24) return 80;
  if (age >= 12) return 70;

  return 60;
}

export function calculateHeuristicFlags(profile) {
  const engagementRate = calculateEngagementRate(profile);
  const growth30Day = calculate30DayGrowth(profile);
  const commentLikeRatio = calculateCommentLikeRatio(profile);
  const postingActivity = calculatePostingActivity(profile);

  const flags = [];

  if (engagementRate < 1) {
    flags.push('Low engagement rate');
  }

  if (growth30Day > 50) {
    flags.push('Rapid follower growth');
  }

  if (commentLikeRatio > 0 && commentLikeRatio < 0.5) {
    flags.push('Unusual comment-to-like ratio');
  }

  if (postingActivity > 50) {
    flags.push('Very high posting activity');
  }

  return flags;
}

export function calculateAuthenticityScore(profile) {
  const engagementScore = calculateEngagementScore(profile);

  const growthScore = calculateGrowthScore(profile);

  const longTermGrowthScore = calculateLongTermGrowthScore(profile);

  const postingScore = calculatePostingScore(profile);

  const accountAgeScore = calculateAccountAgeScore(profile);

  const score =
    engagementScore * 0.5 +
    growthScore * 0.15 +
    longTermGrowthScore * 0.15 +
    postingScore * 0.1 +
    accountAgeScore * 0.1;

  return Math.round(Math.max(0, Math.min(100, score)));
}

export function getAuthenticityLevel(score) {
  if (score >= 75) {
    return 'High';
  }

  if (score >= 50) {
    return 'Medium';
  }

  return 'Low';
}

export function calculateProfileMetrics(profile) {
  return {
    engagementRate: calculateEngagementRate(profile),

    growth30Day: calculate30DayGrowth(profile),

    growth90Day: calculate90DayGrowth(profile),

    postsLast30Days: calculatePostingActivity(profile),

    commentLikeRatio: calculateCommentLikeRatio(profile),

    accountAgeMonths: profile.accountAgeMonths || 0,

    averageLikes: profile.averageLikes || 0,

    averageComments: profile.averageComments || 0,

    averageShares: profile.averageShares || 0,

    averageViews: profile.averageViews || 0,

    followers: profile.followers || 0,

    following: profile.following || 0,
  };
}

export function analyzeProfile(profile) {
  const metrics = calculateProfileMetrics(profile);

  const score = calculateAuthenticityScore(profile);

  const level = getAuthenticityLevel(score);

  const flags = calculateHeuristicFlags(profile);

  return {
    score,
    level,
    metrics,
    flags,
  };
}
