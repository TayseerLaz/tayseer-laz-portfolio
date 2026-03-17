import { forwardRef, useRef, useImperativeHandle } from 'react'

export const Iphone16Pro = forwardRef(
  (
    {
      width = 433,
      height = 882,
      src,
      videoSrc,
      videoRotate = 0,
      showIsland = true,
      islandWidth = 125,
      islandHeight = 40,
      screenRadius = 55,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef(null)

    useImperativeHandle(ref, () => ({
      getVideo: () => videoRef.current,
    }))

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))' }}
        {...props}
      >
        {/* Outer frame */}
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={height - 4}
          rx={75}
          fill="#1a1a1a"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />

        {/* Inner bezel */}
        <rect
          x="12"
          y="12"
          width={width - 24}
          height={height - 24}
          rx={66}
          fill="#0a0a0a"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />

        {/* Screen area */}
        <clipPath id="iphone-screen">
          <rect
            x="21"
            y="21"
            width={width - 42}
            height={height - 42}
            rx={screenRadius}
            ry={screenRadius}
          />
        </clipPath>

        {/* Screen background */}
        <rect
          x="21"
          y="21"
          width={width - 42}
          height={height - 42}
          rx={screenRadius}
          ry={screenRadius}
          fill="#000"
          clipPath="url(#iphone-screen)"
        />

        {src && (
          <image
            href={src}
            x="21"
            y="21"
            width={width - 42}
            height={height - 42}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#iphone-screen)"
          />
        )}

        {videoSrc && (
          <foreignObject
            x="21"
            y="21"
            width={width - 42}
            height={height - 42}
            clipPath="url(#iphone-screen)"
          >
            <div style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: `${screenRadius}px`,
            }}>
              <video
                ref={videoRef}
                style={{
                  ...(videoRotate ? {
                    width: `${height - 42}px`,
                    height: `${width - 42}px`,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${videoRotate}deg)`,
                    objectFit: 'cover',
                  } : {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }),
                }}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </foreignObject>
        )}

        {/* Dynamic island */}
        {showIsland && (
          <rect
            x={width / 2 - islandWidth / 2}
            y="28"
            width={islandWidth}
            height={islandHeight}
            rx={20}
            fill="#1a1a1a"
          />
        )}

        {/* Side buttons */}
        <rect x={width - 2} y="180" width="3" height="80" rx="1.5" fill="#2a2a2a" />
        <rect x="-1" y="180" width="3" height="50" rx="1.5" fill="#2a2a2a" />
        <rect x="-1" y="245" width="3" height="50" rx="1.5" fill="#2a2a2a" />

        {/* Subtle screen reflection */}
        <rect
          x="21"
          y="21"
          width={width - 42}
          height={height - 42}
          rx={screenRadius}
          fill="url(#screen-reflection)"
          clipPath="url(#iphone-screen)"
          style={{ pointerEvents: 'none' }}
        />

        <defs>
          <linearGradient id="screen-reflection" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.03" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.02" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
)

Iphone16Pro.displayName = 'Iphone16Pro'
