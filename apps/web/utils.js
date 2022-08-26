import { useTour } from '@reactour/tour'

export function Placeholder({ demoId = 'basic', ...props }) {
  const { setIsOpen } = useTour()
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="open-button">
        Start Tour
      </button>
      {props.children}
      <div className={`${props.className} wrapper`} style={props.style}>
        <BeachIcon className="icon" data-tour={`step-1-${demoId}`} />
        <BoatIcon className="icon" data-tour={`step-4-${demoId}`} />
        <BallIcon className="icon" data-tour={`step-2-${demoId}`} />
        <GuideIcon className="icon" data-tour={`step-5-${demoId}`} />
        <IcecreamIcon className="icon" data-tour={`step-3-${demoId}`} />
      </div>
    </>
  )
}

export function TextPlaceholder({ demoId = 'basic', ...props }) {
  const { setIsOpen } = useTour()
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="open-button">
        Start Tour
      </button>
      {props.children}
      <p>
        <span data-tour={`step-1-${demoId}`}>Lorem ipsum</span> dolor sit amet,
        consectetur adipiscing elit. Vivamus volutpat quam eu mauris euismod
        imperdiet. Nullam elementum fermentum neque a placerat. Vivamus sed dui
        nisi. Phasellus vel dolor interdum, accumsan eros ut, rutrum dolor.{' '}
        <span data-tour={`step-2-${demoId}`}>
          Pellentesque a magna enim. Pellentesque malesuada egestas urna, et
          pulvinar lorem viverra suscipit.
        </span>
        Duis sit amet mauris ante. Fusce at ante nunc. Maecenas ut leo eu erat
        porta fermentum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet.{' '}
        <span data-tour={`step-3-${demoId}`}>
          Vivamus sed dui nisi. Phasellus vel dolor interdum,
        </span>
        Ut augue massa, aliquam in bibendum sed, euismod vitae magna. Nulla sit
        amet sodales augue. Curabitur in nulla in magna luctus porta et sit amet
        dolor. Pellentesque a magna enim.
      </p>
    </>
  )
}

export function doSteps(demoId) {
  return [
    {
      selector: `[data-tour="step-1-${demoId}"]`,
      content: <p>Vamos a la playa!</p>,
    },
    {
      selector: `[data-tour="step-2-${demoId}"]`,
      content: <p>Play beach ball all day long!</p>,
    },
    {
      selector: `[data-tour="step-3-${demoId}"]`,
      content: <p>Then, a deliciuos ice cream!</p>,
    },
  ]
}

export function IcecreamIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      {...props}
    >
      <path data-name="layer5" d="M54 30a22 22 0 11-44 0z" fill="#d5effb" />
      <path
        data-name="opacity"
        d="M17 30h-7a22 22 0 0022 22h.5A22.9 22.9 0 0117 30z"
        fill="#101129"
        opacity=".18"
      />
      <circle data-name="layer4" cx={32} cy={8} r={4} fill="#f0494c" />
      <path
        data-name="layer3"
        d="M31.9 30a8.8 8.8 0 00.1-1 9 9 0 10-18 .9"
        fill="#f9f6be"
      />
      <path
        data-name="opacity"
        d="M17.1 29.9a9 9 0 017.5-9.8H23a9 9 0 00-9 9.9h3z"
        fill="#101129"
        opacity=".18"
      />
      <path data-name="layer2" d="M34.2 30a8 8 0 1115.5 0" fill="#ef9bc2" />
      <path
        data-name="opacity"
        d="M43.5 20.1H42a8 8 0 00-7.7 10h3a8 8 0 016.2-9.9z"
        fill="#101129"
        opacity=".18"
      />
      <path
        data-name="layer1"
        d="M32 29a8.8 8.8 0 01-.1 1h2.3A8 8 0 0142 20h1.4a12 12 0 00-22.8.2A9 9 0 0132 29z"
        fill="#854a4a"
      />
      <path
        data-name="opacity"
        d="M32 30h2.3a8 8 0 015.6-9.7 8 8 0 00-9.2 3.9 8.9 8.9 0 011.4 4.8 8.8 8.8 0 01-.1 1z"
        fill="#101129"
        opacity=".18"
      />
      <path
        data-name="stroke"
        d="M54 30a22 22 0 11-44 0zM32 52v10m-6 0h12m-6.1-32a8.8 8.8 0 00.1-1 9 9 0 10-18 .9m20.2.1a8 8 0 1115.5 0m-29.1-9.7a12 12 0 0122.8-.2m-23.5.4L12 2"
        fill="none"
        stroke="#2f446a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle
        data-name="stroke"
        cx={32}
        cy={8}
        r={4}
        fill="none"
        stroke="#2f446a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export function BallIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      {...props}
    >
      <path
        data-name="layer4"
        d="M2 32a29.9 29.9 0 002.6 12.3C10.7 24 30.2 15 44.9 16.1 41.2 8.4 34.3 2.9 23.6 3.2A30 30 0 002 32z"
        fill="#ed4c49"
      />
      <path
        data-name="layer3"
        d="M44.9 16.1C52.4 32 46 57.4 29 61.8h3a30 30 0 0029.4-35.9c-2.5-5.9-8.9-9.2-16.5-9.8z"
        fill="#49bcff"
      />
      <path
        data-name="layer2"
        d="M44.9 16.1C30.2 15 10.7 24 4.6 44.3A30 30 0 0029 61.8C46 57.4 52.4 32 44.9 16.1zm7-6.6a30 30 0 00-28.3-6.3c10.4-.3 17.3 5 21 12.5 1.1-3.6 4.7-6.5 7.3-6.2z"
        fill="#f2f6ff"
      />
      <path
        data-name="layer1"
        d="M61.4 25.9a30 30 0 00-9.5-16.4c-2.5-.3-6.2 2.6-7.2 6.1l.2.5c7.6.6 14 3.9 16.5 9.8z"
        fill="#fc0"
      />
      <path
        data-name="opacity"
        d="M42 52A30 30 0 0116.4 6.4a30 30 0 1041.2 41.2A29.9 29.9 0 0142 52z"
        fill="#000064"
        opacity=".15"
      />
      <path
        data-name="stroke"
        d="M23.6 3.2c32.4-1 30.7 52 5.4 58.7M4.6 44.3C13.9 13.4 54 8.7 61.4 25.9M51.9 9.5c-2.7-.3-6.5 2.8-7.3 6.6"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle
        data-name="stroke"
        cx={32}
        cy={32}
        r={30}
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export function BeachIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      {...props}
    >
      <path
        data-name="layer3"
        d="M8 62a26.8 26.8 0 0119.1-8C39.2 54 48 62 48 62z"
        fill="#e8c29d"
      />
      <path
        data-name="layer2"
        d="M34 32c.7-1.1 8-14 8-14l12 14a26.6 26.6 0 00-4-14 55.4 55.4 0 0010 6s.4-5.8-6-10c4.6-.4 6-2 6-2s-5.6-4.8-12-2c.7-3.3 2-8 2-8s-5.9 2.4-8 6c-5.7-3.3-10-2-10-2l6 6a11.9 11.9 0 00-12 6c7.3-.7 10 0 10 0s-4.5 3.8-2 14z"
        fill="#98c472"
      />
      <circle data-name="layer1" cx={12} cy={26} r={8} fill="#fc0" />
      <path
        data-name="opacity"
        d="M28 54c3.2.3 5.9 4.1 3 8h17s-8.4-7.6-20-8zm15.5-40c2.9.5 7 4.8 7.1 4.9L50 18a55.4 55.4 0 0010 6s.4-5.8-6-10c4.6-.4 6-2 6-2s-5.6-4.8-12-2c.2-1 .5-2.1.7-3.2C43.5 9.5 42 12 41 14c-6.9 0-14.7 3.8-15 4 7.3-.7 10 0 10 0s-4.5 3.8-2 14c.7-1.1 8-14 8-14l12 14c-1-2.9-8-16-10.5-18z"
        fill="#000064"
        opacity=".15"
      />
      <path
        data-name="stroke"
        d="M8 62a26.8 26.8 0 0119.1-8C39.2 54 48 62 48 62zm34-44c1.5 9.4 2.1 25.5-7.8 36.9"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        data-name="stroke"
        d="M34 32c.7-1.1 8-14 8-14l12 14a26.6 26.6 0 00-4-14 55.4 55.4 0 0010 6s.4-5.8-6-10c4.6-.4 6-2 6-2s-5.6-4.8-12-2c.7-3.3 2-8 2-8s-5.9 2.4-8 6c-5.7-3.3-10-2-10-2l6 6a11.9 11.9 0 00-12 6c7.3-.7 10 0 10 0s-4.5 3.8-2 14z"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <circle
        data-name="stroke"
        cx={12}
        cy={26}
        r={8}
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export function BoatIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      {...props}
    >
      <path
        data-name="layer2"
        d="M30 8c9.7 3.2 24 14.9 24 34H11S25.2 30.1 30 8z"
        fill="#f27e7c"
      />
      <path data-name="layer1" fill="#dde5f4" d="M58 50H6l10 12h38l4-12z" />
      <path
        data-name="opacity"
        d="M11 42h19V8c-4.8 22.1-19 34-19 34zm11 17l-7.5-9H6l10 12h38l1-3H22z"
        fill="#000064"
        opacity=".15"
      />
      <path
        data-name="stroke"
        d="M30 8c9.7 3.2 24 14.9 24 34H11S25.2 30.1 30 8zm28 42H6l10 12h38l4-12zm-28 0V2"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}

export function GuideIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      {...props}
    >
      <path data-name="layer3" fill="#a3b8df" d="M42 12V2L14 12v50h36V12h-8z" />
      <path
        data-name="layer2"
        d="M32 32c-.9-3.4.3-5.8 4-9.2A10 10 0 1040 38c.4-3.8-7.1-2.6-8-6z"
        fill="#7ed1ff"
      />
      <path
        data-name="layer1"
        d="M36 22.8c-3.7 3.4-4.9 5.8-4 9.2s8.4 2.2 8 6a10 10 0 00-4-15.1z"
        fill="#98c459"
      />
      <path
        data-name="opacity"
        fill="#000064"
        opacity=".15"
        d="M14 12v50h5V12h-5z"
      />
      <path
        data-name="opacity"
        fill="#000064"
        opacity=".2"
        d="M42 12V2L14 12h28z"
      />
      <path
        data-name="stroke"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 12L42 2v10m-28 0h36v50H14z"
      />
      <circle
        data-name="stroke"
        cx={32}
        cy={32}
        r={10}
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        data-name="stroke"
        d="M36 22.8c-3.7 3.4-4.9 5.8-4 9.2s8.4 2.2 8 6"
        fill="none"
        stroke="#2e4369"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  )
}
