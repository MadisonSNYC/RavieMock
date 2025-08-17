/**
 * Singleton controller to enforce single active video preview
 * Ensures only one video plays at a time across all columns
 */

let current: HTMLVideoElement | null = null

/**
 * Claim control of video playback, pausing any other active video
 */
export function claim(video: HTMLVideoElement) {
  if (current && current !== video) {
    try { 
      current.pause()
    } catch {}
  }
  current = video
}

/**
 * Release control of video playback
 */
export function release(video: HTMLVideoElement) {
  if (current === video) {
    current = null
  }
}