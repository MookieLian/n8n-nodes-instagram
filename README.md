# @mookielianhd/n8n-nodes-instagram

This package adds an Instagram Publishing node to n8n so you can send media to your Instagram Business accounts without leaving your workflow.

Instagram Publishing is powered by the Facebook Graph API and allows programmatic upload of images, reels and stories to any Instagram Business or Creator account.

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

The node exposes three resources that follow the same two-step publish flow (media container creation + media publish):

| Resource | Description |
| --- | --- |
| `Image` | Publish a single image with an optional caption. |
| `Reels` | Publish a reel video. Handles container polling until the video is processed. |
| `Stories` | Publish a story video using the same logic as reels with `media_type=STORIES`. |

## Credentials

Create an **Instagram API** credential that stores a long-lived Facebook Graph API user access token with `instagram_basic`, `pages_show_list`, `instagram_content_publish`, and `pages_read_engagement` permissions.  
Steps:

1. Make sure the Instagram account is a Business/Creator account connected to a Facebook Page.  
2. Use Meta’s Graph Explorer or your own app to generate an access token that includes the scopes listed above.  
3. Convert it to a long-lived token and paste it into the credential’s **Access Token** field.  
4. The built-in credential test hits `https://graph.facebook.com/v22.0/me` to confirm the token works.

## Compatibility

- Built against **n8n 1.120.4** (community-node CLI v0.16).  
- Requires n8n `>=1.0` with community nodes enabled.  
- Uses only built-in n8n dependencies, so it is Cloud-compatible.

## Usage

1. Add the **Instagram** node to your workflow and select one of the resources (Image/Reels/Stories).  
2. Provide the Instagram Business Account ID (the “Node” parameter), media URL and caption.  
3. The node first creates the media container, polls Graph API until processing completes, then triggers `media_publish`.  
4. Handle any errors returned by the API (rate limits, permissions) via the node’s error output or `Continue On Fail`.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)  
* [Instagram Graph API - Publishing](https://developers.facebook.com/docs/instagram-api/reference/ig-user/media)  
* [Video/Reels publishing guide](https://developers.facebook.com/docs/instagram-api/guides/content-publishing/reels/)

## Version history

| Version | Notes |
| --- | --- |
| 0.1.0 | Initial release with Image, Reels and Stories publishing & built-in container polling. |
