# Intro Sequence Module

Premium 4-second intro animation inspired by Domaine.com, adapted for Ravie's brand.

## Features

- **4-second choreographed animation** with precise timing
- **One-time play** with 24-hour cooldown (localStorage)
- **Accessibility**: Respects `prefers-reduced-motion`
- **Performance**: Transform/opacity only animations, no layout thrashing
- **Modular**: Easy to remove or modify

## Timeline

```
0-800ms     : Black screen + "Cult Followings" headline fade in
800-2200ms  : 3x3 mosaic tiles reveal left-to-right with stagger
2200-3100ms : Top/bottom rows slide out, secondary copy appears
3100-4000ms : Entire intro slides up and fades, revealing homepage
```

## Usage

The intro is automatically mounted in `App.jsx`:

```jsx
import { IntroSequence } from './components/intro'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  
  return (
    <>
      <IntroSequence onComplete={() => setIntroComplete(true)} />
      {/* Your app content */}
    </>
  )
}
```

## Configuration

### Props

- `onComplete`: Callback fired when intro finishes or is skipped
- The component self-manages visibility and removal from DOM

### Customization

Edit these files to customize:
- `IntroSequence.jsx` - Timing, content, tile configuration
- `intro.css` - Visual styles, animations
- `useIntroState.js` - Cooldown period, storage key

### Tiles

The mosaic uses 9 tiles in a 3x3 grid. Current configuration:
- 8 project thumbnails from Ravie's portfolio
- 1 center tile with Ravie logo

To change tiles, edit the `tiles` array in `IntroSequence.jsx`.

## Accessibility

- **Reduced Motion**: Shows static view for 200ms then completes
- **Screen Readers**: Announces "Loading Ravie"
- **Keyboard**: No focus trap (no skip button per requirements)

## Performance

- Preloads critical assets (first tiles)
- Uses GPU-accelerated transforms only
- Removes from DOM after completion
- No CLS impact on core web vitals

## How to Disable

To completely disable the intro:

1. **Temporary**: Clear localStorage key `ravie_intro_seen`
2. **Permanent**: Remove `<IntroSequence />` from `App.jsx`
3. **Development**: Set `shouldPlay` to `false` in `useIntroState.js`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Graceful fallback for older browsers

## Telemetry (Optional)

To add analytics, emit events in `IntroSequence.jsx`:
- `intro_start` - When animation begins
- `intro_complete` - When animation completes
- `intro_reduced_motion` - When reduced motion is active