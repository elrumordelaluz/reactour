const BallIcon: React.FC<{}> = (props) => {
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

export default BallIcon
