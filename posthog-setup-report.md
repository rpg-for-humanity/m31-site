# PostHog post-wizard report

The wizard has completed a deep integration of your RPG for Humanity language learning project. PostHog analytics has been integrated to track key user engagement events across the landing page, hub, and game pages. The integration uses the modern `instrumentation-client.ts` approach for Next.js 16+ with App Router, includes a reverse proxy for reliable event delivery, and captures both user actions and error tracking.

## Integration Summary

### Files Created
- **`instrumentation-client.ts`** - PostHog client initialization with exception capture and debug mode
- **`.env.local`** - Environment variables for PostHog API key and host

### Files Modified
- **`next.config.ts`** - Added reverse proxy rewrites for PostHog ingestion
- **`app/page.tsx`** - Added email signup tracking
- **`app/hub/page.tsx`** - Added language selection, track switching, and outpost start tracking
- **`app/test/convoset/page.tsx`** - Added comprehensive game event tracking

## Events Implemented

| Event Name | Description | File |
|------------|-------------|------|
| `email_signup_submitted` | User submits email on landing page for launch notification | `app/page.tsx` |
| `language_selected` | User selects a language to practice (English, Korean, or French) | `app/hub/page.tsx` |
| `track_switched` | User switches between Player and Creator tracks in the hub | `app/hub/page.tsx` |
| `outpost_started` | User starts playing an outpost (Coffee Outpost game) | `app/hub/page.tsx` |
| `game_mission_started` | User begins a mission/game round in the Coffee Outpost | `app/test/convoset/page.tsx` |
| `round_completed` | User successfully completes a game round and earns coins | `app/test/convoset/page.tsx` |
| `round_failed` | User submits an incorrect order and must retry | `app/test/convoset/page.tsx` |
| `transcript_purchased` | User spends coins to reveal the text transcript | `app/test/convoset/page.tsx` |
| `cafe_purchased` | User purchases a cafe building with earned coins | `app/test/convoset/page.tsx` |
| `coin_bundle_purchased` | User purchases a coin bundle (in-app purchase) | `app/test/convoset/page.tsx` |
| `speech_recognition_used` | User uses speech recognition in Round 5 | `app/test/convoset/page.tsx` |
| `music_toggled` | User toggles background music on or off | `app/test/convoset/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- **Analytics basics**: [https://us.posthog.com/project/296112/dashboard/1110278](https://us.posthog.com/project/296112/dashboard/1110278)

### Insights
- **Email Signups** - Tracks landing page conversion: [https://us.posthog.com/project/296112/insights/NA21whEy](https://us.posthog.com/project/296112/insights/NA21whEy)
- **User Engagement Funnel** - Conversion from signup to gameplay: [https://us.posthog.com/project/296112/insights/75AvFIy8](https://us.posthog.com/project/296112/insights/75AvFIy8)
- **Game Round Success Rate** - Completed vs failed rounds: [https://us.posthog.com/project/296112/insights/5iodebvl](https://us.posthog.com/project/296112/insights/5iodebvl)
- **In-App Purchases** - Cafe and coin bundle purchases: [https://us.posthog.com/project/296112/insights/ILYXyaHA](https://us.posthog.com/project/296112/insights/ILYXyaHA)
- **Language Preferences** - Languages selected by users: [https://us.posthog.com/project/296112/insights/C14E8HH4](https://us.posthog.com/project/296112/insights/C14E8HH4)

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

## Technical Details

- **PostHog Host**: https://us.i.posthog.com
- **Reverse Proxy**: Configured at `/ingest/*` for reliable event delivery
- **Error Tracking**: Enabled via `capture_exceptions: true`
- **Debug Mode**: Automatically enabled in development environment
