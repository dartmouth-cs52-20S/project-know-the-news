import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

// eslint-disable-next-line import/prefer-default-export
export const PrettoSlider = withStyles({
  root: {
    color: (116, 6, 153),
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
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const marks = [
  {
    value: 0,
    label: 'Always Dem',
  },
  {
    value: 25,
    label: 'Mod Dem',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    label: 'Mod Rep',
  },
  {
    value: 100,
    label: 'Always Rep',
  },
];
