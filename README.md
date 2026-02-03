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

The node exposes four resources:

| Resource | Description |
| --- | --- |
| `Image` | Publish a single image with an optional caption. Uses the two-step container → publish flow. |
| `Reels` | Publish a reel video. Handles container polling until the video is processed before publishing. |
| `Stories` | Publish a story video using the same logic as reels with `media_type=STORIES`. |
| `Comments` | List comments on media, hide/unhide or delete individual comments, disable/enable comments on media, and send **private replies** to commenters. |

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

- Built and tested against **n8n 2.6.3** (community-node CLI v0.16).  
- Requires n8n `>=1.0` with community nodes enabled (recommended `>=2.x`).  
- Uses only built-in n8n dependencies, so it is Cloud-compatible.

## Usage

### Publishing media (Image / Reels / Stories)

1. Add the **Instagram** node to your workflow and select one of the resources (`Image` / `Reels` / `Stories`).  
2. Provide the Instagram Business Account ID (the `Node` parameter), media URL and caption.  
3. The node first creates the media container, polls Graph API until processing completes, then triggers `media_publish`.  
4. Handle any errors returned by the API (rate limits, permissions, validation) via the node’s error output or `Continue On Fail`.

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

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)  
* [Instagram Graph API - Publishing](https://developers.facebook.com/docs/instagram-api/reference/ig-user/media)  
* [Video/Reels publishing guide](https://developers.facebook.com/docs/instagram-api/guides/content-publishing/reels/)  
* [Comment Moderation](https://developers.facebook.com/docs/instagram-platform/comment-moderation)  
* [Private Replies](https://developers.facebook.com/docs/instagram-platform/private-replies)

## Version history

| Version | Notes |
| --- | --- |
| 2.3.0 | Upcoming: Adds `Comments` resource with comment moderation (list/hide/unhide/delete, enable/disable comments) and **Private Replies** support. |
| 2.2.0 | Improved publishing UX, adds alt text, location ID, user tags, and product tags support for media publishing. |
| 2.1.0 | Stable release of Instagram publishing (Image/Reels/Stories) using the container → publish flow with robust polling and error handling. |
| 0.1.0 | Initial release with Image, Reels and Stories publishing & built-in container polling. |
