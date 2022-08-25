const GuideIcon: React.FC<{}> = (props) => {
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

export default GuideIcon
