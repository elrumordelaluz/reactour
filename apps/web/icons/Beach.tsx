const BeachIcon: React.FC<{}> = (props) => {
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

export default BeachIcon
