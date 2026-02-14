# @mookielianhd/n8n-nodes-instagram

This package adds an Instagram node to n8n so you can publish media to your Instagram Business accounts, moderate comments, and send private replies — all from within your workflows.

Instagram features are powered by the Facebook/Instagram Graph API and allow programmatic upload of images, reels and stories, plus comment moderation and private replies, for any Instagram Business or Creator account.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The node exposes several resources:

| Resource | Description |
| --- | --- |
| `Image` | Publish a single image with an optional caption. Uses the two-step container → publish flow. Supports alt text, location, user tags, and product tags. |
| `Reels` | Publish a reel video. Handles container polling until the video is processed before publishing. Supports product tags and **Trial Reels** via `trial_params`. |
| `Stories` | Publish a story video using the same logic as reels with `media_type=STORIES`. |
| `Carousel` | Publish a carousel (album) post with up to 10 images and/or videos. The node creates child containers, builds a carousel container, waits for it to be ready, then publishes it. Includes detailed per-item error reporting and progress messages. |
| `Comments` | List comments on media, hide/unhide or delete individual comments, disable/enable comments on media, and send **private replies** to commenters. |
| `IG User` | Read basic profile data for an Instagram Business/Creator account and list its media using the IG User Graph API. |
| `IG Hashtag` | Search for hashtags by name and fetch top or recent media for a hashtag with paging and limit/return-all support. |
| `Messaging` | Send direct messages (DMs) to Instagram users via the Instagram Messaging API. |
| `Page` | Given a Facebook Page ID, fetch the connected Instagram Business/Creator account (`instagram_business_account`). |
| `Auth` | Exchange short-lived Instagram User tokens for long-lived tokens, refresh long-lived tokens, and call the Graph API `/me` endpoint. |

## Credentials

Create an **Instagram API** credential that stores a long-lived Facebook Graph API user access token with at least:

* `instagram_basic`
* `pages_show_list`
* `instagram_content_publish`
* `pages_read_engagement`
* `instagram_manage_comments` (or `instagram_business_manage_comments` if using Instagram Login)
Steps:

1. Make sure the Instagram account is a Business/Creator account connected to a Facebook Page.  
2. Use Meta’s Graph Explorer or your own app to generate an access token that includes the scopes listed above.  
3. Convert it to a long-lived token and paste it into the credential’s **Access Token** field.  
4. The built-in credential test hits `https://graph.facebook.com/v22.0/me` to confirm the token works.

## Compatibility

- Built and tested against **n8n 2.6.x–2.8.x**.  
- Declares a peer dependency on **`n8n-workflow >=2.6.1`** (the first secure stream-enabled version suggested by Snyk).  
- Requires n8n with community nodes enabled (recommended `>=2.x`).  
- Uses only built-in n8n dependencies, so it is Cloud-compatible.

## Usage

### Publishing media (Image / Reels / Stories)

1. Add the **Instagram** node to your workflow and select one of the resources (`Image` / `Reels` / `Stories`).  
2. Provide the Instagram Business Account ID (the `Node` parameter), media URL and caption.  
3. The node first creates the media container, polls Graph API until processing completes, then triggers `media_publish`.  
4. For long-running uploads (large videos), the node uses robust polling and retry logic and surfaces progress via the n8n execution logs (for example, when publishing Reels or Trial Reels).  
5. Handle any errors returned by the API (rate limits, permissions, validation) via the node’s error output or `Continue On Fail`.

### Publishing carousel posts (Carousel)

1. Add the **Instagram** node and set **Resource** to `Carousel`, **Operation** to `Publish`.  
2. Provide:
   - `Node` – the IG User ID to publish from.  
   - `Graph API Version` – for example `v24.0`.  
   - `Caption` – the carousel caption.  
   - `Carousel Media` – 2–10 items, each with:
     - `Media Type` – `Image` or `Video`.  
     - `Image URL` or `Video URL` – public URLs Meta can fetch.  
3. The node:
   - Creates one child container per image/video (`is_carousel_item=true` for each).  
   - Waits for each child container to become ready.  
   - Creates a carousel container (`media_type=CAROUSEL`, `children=<child_ids>`) with the caption.  
   - Waits for the carousel container to be ready, then calls `/{ig-user-id}/media_publish`.  
4. Errors during any step are annotated with **which child item failed** (for example, “Carousel item 3 (video)…”), making it easier to debug problematic URLs.

### Comment moderation and private replies (Comments)

1. Add the **Instagram** node and set **Resource** to `Comments`.  
2. Choose an **Operation**:
   - `List` – fetch comments for a given media ID.  
   - `Hide` / `Unhide` / `Delete` – moderate a specific comment by its comment ID.  
   - `Disable Comments` / `Enable Comments` – toggle comments on a media object by its media ID.  
   - `Send Private Reply` – send a private reply message to a commenter using their comment ID.  
3. Provide the required IDs:
   - `Media ID` for listing comments or enabling/disabling comments.  
   - `Comment ID` for hide/unhide/delete/private reply operations.  
4. For **Send Private Reply**, also fill in:
   - `Node` – the Instagram professional account ID that owns the commented media.  
   - `Message` – the private reply text that will be sent to the commenter’s inbox/request folder (subject to the 7‑day and messaging window rules defined by Meta).  

### Reading IG User profile and media (IG User)

1. Add the **Instagram** node and set **Resource** to `IG User`.  
2. Choose an **Operation**:
   - `Get` – fetch basic profile information for an Instagram Business/Creator account (username, name, bio, website, media_count, followers/follows, profile picture URL).  
   - `Get Media` – list media owned by that account, including media type, URLs, caption, permalink, timestamp and username.  
3. Provide:
   - `Node` – the IG User ID of the professional account you want to read (or `me` if your credential token belongs to that account).  
   - `Graph API Version` – the Graph version to use (for example `v24.0`).  

### Searching hashtags and fetching hashtag media (IG Hashtag)

1. Add the **Instagram** node and set **Resource** to `IG Hashtag`.  
2. Choose an **Operation**:
   - `Search` – look up a hashtag by name and get its global hashtag ID.  
   - `Get Recent Media` – get the most recently published media tagged with a hashtag.  
   - `Get Top Media` – get the most popular media tagged with a hashtag.  
3. For **Search**, provide:
   - `Node` – the IG User ID performing the query.  
   - `Hashtag Name` – the hashtag name, without `#`.  
4. For **Get Recent Media** / **Get Top Media**, provide:
   - `Node` – the IG User ID performing the query.  
   - `Hashtag ID` – the ID returned from the search operation.  
   - `Return All` / `Limit` – choose whether to fetch all available media (within a safety cap) or only up to a limit.  

### Sending direct messages (Messaging)

1. Add the **Instagram** node and set **Resource** to `Messaging`.  
2. Choose **Operation** `Send Message`.  
3. Provide:
   - `Node` – the IG professional account ID that will send the message.  
   - `Graph API Version` – the Graph version to use (for example `v24.0`).  
   - `Recipient IG User ID` – the Instagram-scoped user ID (IGSID) of the recipient, typically obtained from Messaging webhook events.  
   - `Message Text` – the text body of the direct message.  

### Token exchange, refresh and `/me` (Auth)

1. Add the **Instagram** node and set **Resource** to `Auth`.  
2. Choose an **Operation**:
   - `Exchange Access Token` – exchange a **short-lived** Instagram User access token for a **long-lived** token.  
   - `Refresh Access Token` – refresh an existing long-lived token using the Instagram Platform refresh endpoint.  
   - `Get Me` – call the Graph API `/me` endpoint using the `instagramApi` credential’s access token.  
3. For **Exchange Access Token**, provide:
   - `Short-Lived Access Token` – the short-lived token from your login flow.  
   - `App Secret` – the Instagram App Secret from your Meta App Dashboard.  
4. For **Refresh Access Token**, optionally provide:
   - `Access Token` – the long-lived token to refresh. Leave empty to use the token from the credential.  
5. For **Get Me**, the node uses a fixed, versioned `/me` URL under the hood and does **not** depend on any UI parameters, so older workflows remain compatible.

### Getting the Instagram account for a Facebook Page (Page)

1. Add the **Instagram** node and set **Resource** to `Page`, **Operation** to `Get Instagram Account`.  
2. Provide:
   - `Graph API Version` – for example `v24.0`.  
   - `Page ID` – the Facebook Page ID that is linked to your Instagram professional account.  
3. The node calls:
   - `GET /{page-id}?fields=instagram_business_account`
   and returns the `instagram_business_account` object (including the Instagram User ID) so you can feed it into other resources (Image/Reels/Stories/Carousel/IG User).

### Trial Reels (Reels with `trial_params`)

1. Add the **Instagram** node and set **Resource** to `Reels`, **Operation** to `Publish`.  
2. Under **Additional Fields**, set **Trial Reel – Graduation Strategy**:
   - `MANUAL` – you will decide in the Instagram app when (or if) to graduate the trial reel.  
   - `SS_PERFORMANCE` – Instagram will automatically graduate the trial reel if it performs well.  
3. The node sends a `trial_params` JSON object in the create-container request, as documented in the IG User Media reference.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)  
* [Instagram Graph API - Publishing](https://developers.facebook.com/docs/instagram-api/reference/ig-user/media)  
* [Video/Reels publishing guide](https://developers.facebook.com/docs/instagram-api/guides/content-publishing/reels/)  
* [Comment Moderation](https://developers.facebook.com/docs/instagram-platform/comment-moderation)  
* [Private Replies](https://developers.facebook.com/docs/instagram-platform/private-replies)  
* [IG User](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user)  
* [IG Hashtag Search](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag-search/)  
* [IG Hashtag Recent Media](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag/recent-media/)  
* [IG Hashtag Top Media](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag/top-media/)  
* [Instagram Messaging API](https://developers.facebook.com/docs/messenger-platform/instagram/features/)  
* [Instagram Platform Access Token](https://developers.facebook.com/docs/instagram-platform/reference/access_token/)  
* [Instagram Platform Refresh Access Token](https://developers.facebook.com/docs/instagram-platform/reference/refresh_access_token/)  
* [Instagram Platform /me](https://developers.facebook.com/docs/instagram-platform/reference/me/)

## Version history

| Version | Notes |
| --- | --- |
| 2.5.1 | Adds Carousel publishing (up to 10 images/videos with per-item error reporting and progress logs), Trial Reels support (`trial_params`), the `Page` resource with **Get Instagram Account** (Page → `instagram_business_account`), streaming-style progress messages for long-running carousel publishes, and multiple small robustness fixes around `/me` and authentication. |
| 2.4.0 | Adds `IG Hashtag` (search, recent media, top media), `Messaging` (send DMs), and `Auth` helpers for token exchange/refresh and `/me`. |
| 2.3.0 | Adds `Comments` resource with comment moderation (list/hide/unhide/delete, enable/disable comments) and **Private Replies** support, and an `IG User` resource for reading profile data and listing media. |
| 2.2.0 | Improved publishing UX, adds alt text, location ID, user tags, and product tags support for media publishing. |
| 2.1.0 | Stable release of Instagram publishing (Image/Reels/Stories) using the container → publish flow with robust polling and error handling. |
| 0.1.0 | Initial release with Image, Reels and Stories publishing & built-in container polling. |
