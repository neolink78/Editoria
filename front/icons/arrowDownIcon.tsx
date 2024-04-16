const ArrowDownIcon = ({
    width = '14',
    color = '#17181A',
  }) => (
    <svg
      width={width}
      height={width}
      fill="none"
      viewBox="0 0 17 17"
    >
      <g id="arrow-narrow-down-right">
        <g id="Icon">
          <path d="M10.5 5.83333V10.5H5.83333" fill="#17181A" />
          <path
            d="M3.5 3.5L10.5 10.5M10.5 10.5V5.83333M10.5 10.5H5.83333"
            stroke={color}
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
  
  export default ArrowDownIcon
  