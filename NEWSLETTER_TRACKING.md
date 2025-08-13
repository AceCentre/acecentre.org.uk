# Newsletter Signup Tracking

This document outlines the newsletter signup tracking implementation using PostHog analytics.

## Overview

Newsletter signups are now tracked across all locations where users can subscribe to the Ace Centre newsletter. This provides comprehensive analytics on marketing effectiveness and user engagement.

## Tracked Events

### 1. `newsletterSignup`

Triggered when a user successfully signs up for the newsletter.

**Properties:**

- `location`: Where the signup occurred (e.g., "footer", "service-finder", "register", "checkout", "resource-download", "launchpad", "guide")
- `tags`: Array of tags associated with the signup (e.g., ["service-finder"], ["resource-slug"])
- `hasNames`: Boolean indicating if the form collected first/last names

**Locations:**

- `footer`: Newsletter signup in the site footer
- `service-finder`: Service finder mailing list component
- `register`: User registration with newsletter opt-in
- `checkout`: Checkout process with newsletter opt-in
- `resource-download`: Resource download modals
- `launchpad`: Launchpad generate tool
- `guide`: Guide generate tool
- `speechbubble`: Speech bubble component
- `aacinfo`: AAC info component

### 2. `newsletterFormInteraction`

Triggered when a user starts interacting with a newsletter signup form (focuses on input fields).

**Properties:**

- `location`: Where the form interaction occurred
- `tags`: Array of tags associated with the form
- `hasNames`: Boolean indicating if the form collects names

### 3. `newsletterSignupError`

Triggered when a newsletter signup fails.

**Properties:**

- `location`: Where the signup attempt occurred
- `tags`: Array of tags associated with the signup
- `hasNames`: Boolean indicating if the form collects names
- `error`: Error message

## Implementation Details

### Components Updated

1. **`NewsletterSignup` component** (`components/resources-download/resources-download.js`)

   - Added PostHog tracking for successful signups
   - Added tracking for form interactions
   - Added tracking for signup errors

2. **Registration flow** (`lib/auth/hooks.js`)

   - Added tracking for newsletter signups during user registration

3. **Checkout flow** (`pages/checkout.js`)
   - Added tracking for newsletter signups during checkout

### Analytics Data Available

With this implementation, you can now track:

- **Total newsletter signups** across all locations
- **Signup conversion rates** by location
- **Form interaction rates** (how many people start filling out forms vs. complete them)
- **Error rates** and types
- **Most effective signup locations** for marketing campaigns
- **User journey analysis** (e.g., how many people sign up during resource downloads vs. general browsing)

## PostHog Dashboard Queries

To analyze the data in PostHog:

1. **Total signups**: Filter by event `newsletterSignup`
2. **Signups by location**: Group by property `location`
3. **Conversion funnel**: Compare `newsletterFormInteraction` vs `newsletterSignup`
4. **Error analysis**: Filter by event `newsletterSignupError`

## Privacy Considerations

- Tracking only occurs on the production domain (`acecentre.org.uk`)
- No personally identifiable information is sent to PostHog
- Email addresses and names are not tracked in analytics events
- Only aggregate data and user behavior patterns are captured
