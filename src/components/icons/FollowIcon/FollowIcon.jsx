import SvgIcon from '../SvgIcon/SvgIcon.jsx';

const FollowIcon = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5" />
    <path
      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
      stroke="#1C274C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </SvgIcon>
);

export default FollowIcon;
