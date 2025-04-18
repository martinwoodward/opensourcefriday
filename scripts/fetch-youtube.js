/**
 * YouTube Playlist Fetcher
 * 
 * This script fetches videos from the Open Source Fridays YouTube playlist
 * and creates or updates markdown files for each episode.
 */

import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Constants
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = 'PL0lo9MOBetEFmtstItnKlhJJVmMghxc0P';
const CONTENT_DIR = path.join(process.cwd(), 'src/content/episodes');

// Make sure the episodes directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

/**
 * Fetches videos from a YouTube playlist
 */
async function fetchPlaylistVideos(playlistId) {
  try {
    const response = await youtube.playlistItems.list({
      part: 'snippet,contentDetails',
      playlistId: playlistId,
      maxResults: 50
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching playlist videos:', error.message);
    return [];
  }
}

/**
 * Get detailed video information including description and publication date
 */
async function getVideoDetails(videoIds) {
  try {
    const response = await youtube.videos.list({
      part: 'snippet,contentDetails',
      id: videoIds.join(',')
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching video details:', error.message);
    return [];
  }
}

/**
 * Converts a YouTube video to a markdown file
 */
function createMarkdownFile(video) {
  const { id, snippet } = video;
  const videoId = id;
  const { title, description, publishedAt, thumbnails } = snippet;
  
  // Format the date for the slug
  const pubDate = new Date(publishedAt);
  const dateForSlug = `${pubDate.getFullYear()}-${(pubDate.getMonth() + 1).toString().padStart(2, '0')}-${pubDate.getDate().toString().padStart(2, '0')}`;
  
  // Create a slug from the title and date
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                   // Trim hyphens from start and end
    
  const fullSlug = `${dateForSlug}-${titleSlug}`;
  
  // Create a filename from the video ID (keeping this for consistent file naming)
  const fileName = `${videoId}.md`;
  const filePath = path.join(CONTENT_DIR, fileName);
  
  // Create frontmatter
  const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.split('\n')[0].replace(/"/g, '\\"')}"
pubDate: ${new Date(publishedAt).toISOString()}
thumbnailUrl: "${thumbnails.high.url}"
videoId: "${videoId}"
slug: "${fullSlug}"
---

${description}

[Watch on YouTube](https://www.youtube.com/watch?v=${videoId})
`;

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Updating existing episode: ${title}`);
  } else {
    console.log(`Creating new episode: ${title}`);
  }

  // Write the file
  fs.writeFileSync(filePath, frontMatter);
}

/**
 * Main function to run the script
 */
async function main() {
  if (!YOUTUBE_API_KEY) {
    console.error('Error: YOUTUBE_API_KEY is not set in the environment variables');
    process.exit(1);
  }

  console.log('Fetching videos from Open Source Fridays playlist...');
  
  // Fetch playlist videos
  const playlistItems = await fetchPlaylistVideos(PLAYLIST_ID);
  
  if (playlistItems.length === 0) {
    console.log('No videos found in the playlist');
    return;
  }
  
  // Extract video IDs
  const videoIds = playlistItems.map(item => item.contentDetails.videoId);
  
  // Get detailed information for each video
  const videos = await getVideoDetails(videoIds);
  
  // Generate markdown files for each video
  videos.forEach(video => {
    createMarkdownFile(video);
  });
  
  console.log(`Successfully processed ${videos.length} videos`);
}

// Run the script
main().catch(error => {
  console.error('Error running script:', error);
  process.exit(1);
});
