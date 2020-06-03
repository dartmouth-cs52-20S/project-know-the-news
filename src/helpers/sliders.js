import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// eslint-disable-next-line import/prefer-default-export
export const PrettoSlider = withStyles({
  root: {
    color: 'grey',
    width: 425,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    display: 'none',
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  markActive: {
    backgroundColor: 'currentColor',
  },
})(Slider);

export const VoterMarks = [
  {
    value: 0,
    label: 'Democrat',
  },
  {
    value: 25,
    label: '',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    label: '',
  },
  {
    value: 100,
    label: 'Republican',
  },
];

export const MediaMarks = [
  {
    value: 0,
    label: 'All a Lie',
  },
  {
    value: 25,
    label: '',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    label: '',
  },
  {
    value: 100,
    label: 'All Honest',
  },
];

export const DividedMarks = [
  {
    value: 0,
    label: 'Civil War',
  },
  {
    value: 25,
    label: '',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    label: '',
  },
  {
    value: 100,
    label: 'No Division',
  },
];
