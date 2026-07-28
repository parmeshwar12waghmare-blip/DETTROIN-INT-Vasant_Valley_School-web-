// ─── INSTAGRAM API ROUTE ────────────────────────────────────────────────────
// Uses the Instagram Graph API (Meta) to fetch media from a Business/Creator
// Instagram account.
//
// SETUP REQUIRED (one-time):
//   1. Go to https://developers.facebook.com/ → Create App → Instagram
//   2. Link your school's Instagram Business/Creator account
//   3. Generate a Long-Lived Access Token (valid 60 days, auto-refreshed here)
//   4. Add to your backend .env file:
//        INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
//        INSTAGRAM_USER_ID=your_instagram_user_id_here   (e.g. 17841400000000000)
//
// API ENDPOINT EXPOSED:
//   GET /api/instagram/feed?limit=9
//
// RETURNS:
//   { success: true, posts: [...], username: "...", followers: "..." }

const express = require('express');
const router = express.Router();

// ── Configuration ────────────────────────────────────────────────────────────
// These values come from your .env file. See setup instructions above.
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const GRAPH_BASE = 'https://graph.instagram.com';

// ── In-memory cache (5 minutes) to avoid hitting API rate limits ─────────────
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ── GET /api/instagram/feed ──────────────────────────────────────────────────
router.get('/feed', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 9, 20);

  // If no token configured → return demo mock data so the UI still works
  if (!INSTAGRAM_ACCESS_TOKEN || INSTAGRAM_ACCESS_TOKEN === 'your_long_lived_access_token_here') {
    return res.json({
      success: true,
      isMock: true,
      posts: getMockPosts(limit),
      username: 'vasantvalleyschool',
      followers: '12.4K',
      profileUrl: 'https://www.instagram.com/vasantvalleyschool/',
    });
  }

  // Serve from cache if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
    return res.json(cache.data);
  }

  try {
    // ── Step 1: Fetch media list ───────────────────────────────────────────
    const mediaUrl =
      `${GRAPH_BASE}/${INSTAGRAM_USER_ID}/media` +
      `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count` +
      `&limit=${limit}` +
      `&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const mediaRes = await fetch(mediaUrl);
    if (!mediaRes.ok) throw new Error(`Graph API error: ${mediaRes.status}`);
    const mediaData = await mediaRes.json();

    if (mediaData.error) throw new Error(mediaData.error.message);

    // ── Step 2: Fetch profile info (username + followers) ──────────────────
    const profileUrl =
      `${GRAPH_BASE}/${INSTAGRAM_USER_ID}` +
      `?fields=username,followers_count` +
      `&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const profileRes = await fetch(profileUrl);
    const profileData = await profileRes.json();

    // ── Step 3: Transform & sanitize ──────────────────────────────────────
    const posts = (mediaData.data || []).map(post => ({
      id:          post.id,
      caption:     post.caption ? post.caption.substring(0, 200) : '',
      type:        post.media_type, // IMAGE | VIDEO | CAROUSEL_ALBUM
      imageUrl:    post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      videoUrl:    post.media_type === 'VIDEO' ? post.media_url : null,
      permalink:   post.permalink,
      timestamp:   post.timestamp,
      likes:       post.like_count    || 0,
      comments:    post.comments_count || 0,
    }));

    const followers = profileData.followers_count
      ? formatNumber(profileData.followers_count)
      : '—';

    const result = {
      success:    true,
      isMock:     false,
      posts,
      username:   profileData.username   || 'vasantvalleyschool',
      followers,
      profileUrl: `https://www.instagram.com/${profileData.username || 'vasantvalleyschool'}/`,
    };

    // ── Auto-refresh long-lived token (extend before it expires) ──────────
    try {
      await fetch(
        `${GRAPH_BASE}/refresh_access_token` +
        `?grant_type=ig_refresh_token&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );
    } catch (_) { /* non-critical, ignore */ }

    cache = { data: result, timestamp: Date.now() };
    return res.json(result);

  } catch (err) {
    console.error('[Instagram API] Error:', err.message);
    // Graceful fallback — never break the website
    return res.json({
      success:    true,
      isMock:     true,
      error:      err.message,
      posts:      getMockPosts(limit),
      username:   'vasantvalleyschool',
      followers:  '12.4K',
      profileUrl: 'https://www.instagram.com/vasantvalleyschool/',
    });
  }
});

// ─── MOCK DATA (shown before real token is configured) ──────────────────────
// Replace these demo Unsplash images with real school Instagram photos
// by configuring your INSTAGRAM_ACCESS_TOKEN in the .env file.
function getMockPosts(limit) {
  const mockData = [
    {
      id: 'm1', type: 'IMAGE', likes: 284, comments: 18, timestamp: '2026-07-20T10:00:00Z',
      caption: '🎓 Celebrating our Class XII toppers! 100% pass rate this year. Proud of every student! #VasantValley #Excellence',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm2', type: 'IMAGE', likes: 412, comments: 31, timestamp: '2026-07-18T08:30:00Z',
      caption: '🔬 Our STEM Lab robots are ready for the Annual Science Expo 2026! Innovation in action. #STEMEducation #Robotics',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm3', type: 'IMAGE', likes: 198, comments: 12, timestamp: '2026-07-15T14:00:00Z',
      caption: '🏊 Swimming training in full swing at our Olympic pool. Go team Vasant! #Sports #Athletics',
      imageUrl: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm4', type: 'IMAGE', likes: 356, comments: 24, timestamp: '2026-07-12T09:00:00Z',
      caption: '🎭 Symphony Night was magical! Our students performed with heart and soul. #PerformingArts #Drama',
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm5', type: 'IMAGE', likes: 521, comments: 42, timestamp: '2026-07-10T11:00:00Z',
      caption: '📚 Our Digital Library — a world of knowledge awaits every curious mind. #Library #Reading #Learning',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm6', type: 'IMAGE', likes: 267, comments: 19, timestamp: '2026-07-08T16:00:00Z',
      caption: '🎨 Fine Arts Studio — where creativity has no limits. Incredible talent! #Art #FineArts #Creative',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm7', type: 'IMAGE', likes: 389, comments: 28, timestamp: '2026-07-05T13:00:00Z',
      caption: '🏀 Inter-school Basketball Tournament champions! Hard work and teamwork wins every time. #Basketball #Champions',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm8', type: 'IMAGE', likes: 445, comments: 35, timestamp: '2026-07-02T10:30:00Z',
      caption: '🌱 Green campus. Happy students. Our eco-friendly school grounds are thriving! #GreenSchool #Environment',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
    {
      id: 'm9', type: 'IMAGE', likes: 312, comments: 22, timestamp: '2026-06-28T08:00:00Z',
      caption: '🎓 Farewell to our incredible Class of 2026! The future is bright. #Farewell #Graduation #ClassOf2026',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
      permalink: 'https://www.instagram.com/vasantvalleyschool/',
    },
  ];
  return mockData.slice(0, limit);
}

// ── Format large numbers: 12400 → "12.4K" ───────────────────────────────────
function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

module.exports = router;
