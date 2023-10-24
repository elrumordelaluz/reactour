const BoatIcon: React.FC<{}> = (props) => {
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

export default BoatIcon
